import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';
import { prisma } from '@/lib/prisma';

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

// PUT /api/reviews/[id] - user edit with password verification
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const body = await request.json();
        // Expect password field for verification
        if (!body.password) {
            return NextResponse.json({ error: 'Password required' }, { status: 400 });
        }
        // Fetch existing review to compare password
        const existingReview = await prisma.review.findUnique({ where: { id: parseInt(id) } });

        if (!existingReview) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }
        if (existingReview.password !== body.password) {
            return NextResponse.json({ error: 'Incorrect password' }, { status: 403 });
        }
        // Remove password from update payload to avoid overwriting it unintentionally
        const { password, ...updateData } = body;
        const review = await prisma.review.update({
            where: { id: parseInt(id) },
            data: updateData,
        });

        return NextResponse.json(review);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update review' }, { status: 500 });
    }
}

// DELETE /api/reviews/[id] - user delete with password verification
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const body = await request.json();
        if (!body.password) {
            return NextResponse.json({ error: 'Password required' }, { status: 400 });
        }
        // Fetch existing review to verify password
        const existingReview = await prisma.review.findUnique({ where: { id: parseInt(id) } });

        if (!existingReview) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }
        if (existingReview.password !== body.password) {
            return NextResponse.json({ error: 'Incorrect password' }, { status: 403 });
        }
        // Perform deletion
        await prisma.review.delete({ where: { id: parseInt(id) } });

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 });
    }
}
