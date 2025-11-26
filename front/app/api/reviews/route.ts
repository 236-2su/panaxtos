import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';
import { getDB, Review } from '@/lib/d1';

export const dynamic = 'force-dynamic';

// GET /api/reviews
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const branchId = searchParams.get('branchId');

        const db = getDB();
        let query = 'SELECT id, branchId, author, title, rating, comment, createdAt FROM Review';
        let stmt;

        if (branchId) {
            query += ' WHERE branchId = ? ORDER BY createdAt DESC';
            stmt = db.prepare(query).bind(branchId);
        } else {
            query += ' ORDER BY createdAt DESC';
            stmt = db.prepare(query);
        }

        const { results } = await stmt.all<Omit<Review, 'password'>>();
        return NextResponse.json(results || []);
    } catch (error) {
        console.error('[Reviews GET]', error);
        return NextResponse.json(
            { error: 'Failed to fetch reviews' },
            { status: 500 }
        );
    }
}

// POST /api/reviews - 누구나 작성 가능
export async function POST(request: NextRequest) {
    try {
        const body = await request.json() as any;

        // 유효성 검사
        if (!body.password || body.password.length < 4) {
            return NextResponse.json({ error: '비밀번호는 4자리 이상이어야 합니다.' }, { status: 400 });
        }

        const db = getDB();
        const result = await db.prepare(`
            INSERT INTO Review (branchId, author, password, title, rating, comment)
            VALUES (?, ?, ?, ?, ?, ?)
        `).bind(
            body.branchId,
            body.author,
            body.password,
            body.title || null,
            body.rating,
            body.comment
        ).run();

        if (!result.success) {
            throw new Error('Failed to insert review');
        }

        // 생성된 리뷰 조회 (password 제외)
        const review = await db.prepare(`
            SELECT id, branchId, author, title, rating, comment, createdAt 
            FROM Review 
            WHERE id = ?
        `).bind(result.meta.last_row_id).first<Omit<Review, 'password'>>();

        return NextResponse.json(review);
    } catch (error) {
        console.error('[Reviews POST]', error);
        return NextResponse.json(
            { error: 'Failed to create review' },
            { status: 500 }
        );
    }
}
