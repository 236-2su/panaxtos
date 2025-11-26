import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getTokenFromRequest, verifyToken } from '@/lib/jwt';

// GET /api/reviews
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const branchId = searchParams.get('branchId');

        const reviews = await prisma.review.findMany({
            where: branchId ? { branchId } : undefined,
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json(reviews);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch reviews' },
            { status: 500 }
        );
    }
}

// POST /api/reviews - 누구나 작성 가능
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const review = await prisma.review.create({ data: body });
        return NextResponse.json(review);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to create review' },
            { status: 500 }
        );
    }
}
