import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';
import { getPrisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// GET /api/reviews
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const branchId = searchParams.get('branchId');

        const prisma = getPrisma();
        const reviews = await prisma.review.findMany({
            where: branchId ? { branchId } : undefined,
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json(reviews);
    } catch (error) {
        console.error(error);
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

        const prisma = getPrisma();
        const review = await prisma.review.create({ data: body });

        return NextResponse.json(review);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: 'Failed to create review' },
            { status: 500 }
        );
    }
}
