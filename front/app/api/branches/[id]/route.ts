import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';
import { getDB, Branch } from '@/lib/d1';
import { getTokenFromRequest, verifyToken } from '@/lib/jwt';

// GET /api/branches/[id]
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const db = getDB();
        const branch = await db.prepare('SELECT * FROM Branch WHERE id = ?').bind(id).first<Branch>();

        if (!branch) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }

        return NextResponse.json(branch);
    } catch (error) {
        console.error('[Branch GET]', error);
        return NextResponse.json(
            { error: 'Failed to fetch branch' },
            { status: 500 }
        );
    }
}

// PUT /api/branches/[id] - 관리자만
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const token = getTokenFromRequest(request.headers.get('authorization'));
        if (!token || !(await verifyToken(token))) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const body = await request.json() as any;
        const db = getDB();

        const result = await db.prepare(`
            UPDATE Branch 
            SET name = ?, directorName = ?, directorDesc = ?, directorImg = ?, address = ?, mapSrc = ?
            WHERE id = ?
        `).bind(
            body.name,
            body.directorName,
            body.directorDesc || null,
            body.directorImg || null,
            body.address,
            body.mapSrc || null,
            id
        ).run();

        if (!result.success || result.meta.changes === 0) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }

        // 업데이트된 데이터 조회
        const branch = await db.prepare('SELECT * FROM Branch WHERE id = ?').bind(id).first<Branch>();
        return NextResponse.json(branch);
    } catch (error) {
        console.error('[Branch PUT]', error);
        return NextResponse.json(
            { error: 'Failed to update branch' },
            { status: 500 }
        );
    }
}

// DELETE /api/branches/[id] - 관리자만
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const token = getTokenFromRequest(request.headers.get('authorization'));
        if (!token || !(await verifyToken(token))) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const db = getDB();
        const result = await db.prepare('DELETE FROM Branch WHERE id = ?').bind(id).run();

        if (!result.success || result.meta.changes === 0) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error('[Branch DELETE]', error);
        return NextResponse.json(
            { error: 'Failed to delete branch' },
            { status: 500 }
        );
    }
}
