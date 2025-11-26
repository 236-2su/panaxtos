import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getTokenFromRequest, verifyToken } from '@/lib/jwt';

// GET /api/reservations - 관리자만
export async function GET(request: NextRequest) {
    try {
        const token = getTokenFromRequest(request.headers.get('authorization'));
        if (!token || !verifyToken(token)) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const { searchParams } = new URL(request.url);
        const branchId = searchParams.get('branchId');

        const reservations = await prisma.reservation.findMany({
            where: branchId ? { branchId } : undefined,
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json(reservations);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch reservations' },
            { status: 500 }
        );
    }
}

// POST /api/reservations - 누구나 예약 가능
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const reservation = await prisma.reservation.create({ data: body });
        return NextResponse.json(reservation);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to create reservation' },
            { status: 500 }
        );
    }
}
