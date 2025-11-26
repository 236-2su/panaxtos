import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';
import { prisma } from '@/lib/prisma';
import { getTokenFromRequest, verifyToken } from '@/lib/jwt';

// GET /api/branches/[id]
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const branch = await prisma.branch.findUnique({
            where: { id }
        });

        if (!branch) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }

        return NextResponse.json(branch);
    } catch (error) {
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
        if (!token || !verifyToken(token)) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const body = await request.json();
        const branch = await prisma.branch.update({
            where: { id },
            data: body
        });

        return NextResponse.json(branch);
    } catch (error) {
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
        if (!token || !verifyToken(token)) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        await prisma.branch.delete({
            where: { id }
        });

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to delete branch' },
            { status: 500 }
        );
    }
}
