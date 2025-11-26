import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';
import { getDB, Review } from '@/lib/d1';

// GET /api/reviews/[id]
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const db = getDB();
        const review = await db.prepare(`
            SELECT id, branchId, author, title, rating, comment, createdAt 
            FROM Review 
            WHERE id = ?
        `).bind(parseInt(id)).first<Omit<Review, 'password'>>();

        if (!review) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }
        return NextResponse.json(review);
    } catch (error) {
        console.error('[Review GET]', error);
        return NextResponse.json({ error: 'Failed to fetch review' }, { status: 500 });
    }
}

// PUT /api/reviews/[id] - 비밀번호 확인 후 수정
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const body = await request.json() as any;

        if (!body.password) {
            return NextResponse.json({ error: 'Password required' }, { status: 400 });
        }

        const db = getDB();

        // 기존 리뷰 조회 (비밀번호 확인용)
        const existingReview = await db.prepare('SELECT password FROM Review WHERE id = ?')
            .bind(parseInt(id))
            .first<{ password: string }>();

        if (!existingReview) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }

        if (existingReview.password !== body.password) {
            return NextResponse.json({ error: 'Incorrect password' }, { status: 403 });
        }

        // 업데이트
        const result = await db.prepare(`
            UPDATE Review 
            SET author = ?, title = ?, rating = ?, comment = ?
            WHERE id = ?
        `).bind(
            body.author,
            body.title || null,
            body.rating,
            body.comment,
            parseInt(id)
        ).run();

        if (!result.success) {
            throw new Error('Failed to update review');
        }

        // 업데이트된 리뷰 조회
        const review = await db.prepare(`
            SELECT id, branchId, author, title, rating, comment, createdAt 
            FROM Review 
            WHERE id = ?
        `).bind(parseInt(id)).first<Omit<Review, 'password'>>();

        return NextResponse.json(review);
    } catch (error) {
        console.error('[Review PUT]', error);
        return NextResponse.json({ error: 'Failed to update review' }, { status: 500 });
    }
}

// DELETE /api/reviews/[id] - 비밀번호 확인 후 삭제
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const body = await request.json() as any;

        if (!body.password) {
            return NextResponse.json({ error: 'Password required' }, { status: 400 });
        }

        const db = getDB();

        // 기존 리뷰 조회 (비밀번호 확인용)
        const existingReview = await db.prepare('SELECT password FROM Review WHERE id = ?')
            .bind(parseInt(id))
            .first<{ password: string }>();

        if (!existingReview) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }

        if (existingReview.password !== body.password) {
            return NextResponse.json({ error: 'Incorrect password' }, { status: 403 });
        }

        // 삭제
        const result = await db.prepare('DELETE FROM Review WHERE id = ?').bind(parseInt(id)).run();

        if (!result.success) {
            throw new Error('Failed to delete review');
        }

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error('[Review DELETE]', error);
        return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 });
    }
}
