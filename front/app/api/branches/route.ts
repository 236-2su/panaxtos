import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';
import { getDB, Branch } from '@/lib/d1';
import { getTokenFromRequest, verifyToken } from '@/lib/jwt';

// GET /api/branches - 모두 조회 (공개)
export async function GET() {
    try {
        const db = getDB();
        const { results } = await db.prepare('SELECT * FROM Branch ORDER BY createdAt DESC').all<Branch>();
        return NextResponse.json(results || []);
    } catch (error) {
        console.error('[Branches GET]', error);
        return NextResponse.json(
            { error: 'Failed to fetch branches' },
            { status: 500 }
        );
    }
}

// POST /api/branches - 생성 (관리자만)
export async function POST(request: NextRequest) {
    try {
        const token = getTokenFromRequest(request.headers.get('authorization'));
        if (!token || !(await verifyToken(token))) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const body = await request.json() as any;
        const db = getDB();

        const result = await db.prepare(`
            INSERT INTO Branch (id, name, directorName, directorDesc, directorImg, address, mapSrc)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `).bind(
            body.id,
            body.name,
            body.directorName,
            body.directorDesc || null,
            body.directorImg || null,
            body.address,
            body.mapSrc || null
        ).run();

        if (!result.success) {
            throw new Error('Failed to insert branch');
        }

        // 생성된 데이터 조회
        const { results } = await db.prepare('SELECT * FROM Branch WHERE id = ?').bind(body.id).all<Branch>();
        return NextResponse.json(results?.[0]);
    } catch (error) {
        console.error('[Branches POST]', error);
        return NextResponse.json(
            { error: 'Failed to create branch' },
            { status: 500 }
        );
    }
}
