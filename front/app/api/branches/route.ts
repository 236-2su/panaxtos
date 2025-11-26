import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';
import { prisma } from '@/lib/prisma';
import { getTokenFromRequest, verifyToken } from '@/lib/jwt';

// GET /api/branches - 모두 조회 (공개)
export async function GET() {
    try {
        const branches = await prisma.branch.findMany();
        return NextResponse.json(branches);
    } catch (error) {
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

        const body = await request.json();
        const branch = await prisma.branch.create({ data: body });
        return NextResponse.json(branch);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to create branch' },
            { status: 500 }
        );
    }
}
