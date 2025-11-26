import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getTokenFromRequest, verifyToken } from '@/lib/jwt';

// GET /api/reviews/[id]
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const review = await prisma.review.findUnique({
            where: { id: parseInt(id) }
        });
        if (!review) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }
        return NextResponse.json(review);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch review' }, { status: 500 });
    }
}

// PUT /api/reviews/[id] - admin only
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
        const review = await prisma.review.update({
            where: { id: parseInt(id) },
            data: body
        });
        return NextResponse.json(review);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update review' }, { status: 500 });
    }
}

// DELETE /api/reviews/[id] - admin only
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
        await prisma.review.delete({ where: { id: parseInt(id) } });
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 });
    }
}
