import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getTokenFromRequest, verifyToken } from '@/lib/jwt';

// GET /api/reservations/[id] - 관리자만
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const token = getTokenFromRequest(request.headers.get('authorization'));
        if (!token || !verifyToken(token)) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const reservation = await prisma.reservation.findUnique({
            where: { id: parseInt(params.id) }
        });

        if (!reservation) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }

        return NextResponse.json(reservation);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch reservation' },
            { status: 500 }
        );
    }
}

// PUT /api/reservations/[id] - 관리자만
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const token = getTokenFromRequest(request.headers.get('authorization'));
        if (!token || !verifyToken(token)) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const body = await request.json();
        const reservation = await prisma.reservation.update({
            where: { id: parseInt(params.id) },
            data: body
        });

        return NextResponse.json(reservation);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to update reservation' },
            { status: 500 }
        );
    }
}

// DELETE /api/reservations/[id] - 관리자만
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const token = getTokenFromRequest(request.headers.get('authorization'));
        if (!token || !verifyToken(token)) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        await prisma.reservation.delete({
            where: { id: parseInt(params.id) }
        });

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to delete reservation' },
            { status: 500 }
        );
    }
}
