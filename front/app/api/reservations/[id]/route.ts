import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';
import { prisma } from '@/lib/prisma';
import { getTokenFromRequest, verifyToken } from '@/lib/jwt';

// GET /api/reservations/[id] - 관리자만 (상세 정보)
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const token = getTokenFromRequest(request.headers.get('authorization'));
        if (!token || !(await verifyToken(token))) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const reservation = await prisma.reservation.findUnique({
            where: { id: parseInt(id) }
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

// PUT /api/reservations/[id] - 관리자 또는 비밀번호 일치 시
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const body = await request.json();
        const token = getTokenFromRequest(request.headers.get('authorization'));
        const isAdmin = token && (await verifyToken(token));
        const password = body.password; // 요청 바디에서 비밀번호 확인

        // 1. 기존 예약 조회
        const reservation = await prisma.reservation.findUnique({ where: { id: parseInt(id) } });

        if (!reservation) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }

        // 2. 권한 확인 (관리자 또는 비밀번호 일치)
        let isPasswordCorrect = false;
        if (isAdmin) {
            isPasswordCorrect = true;
        } else {
            if (password && reservation.password === password) {
                isPasswordCorrect = true;
            }
        }

        if (!isPasswordCorrect) {
            return NextResponse.json({ error: '비밀번호가 일치하지 않습니다.' }, { status: 403 });
        }

        // 3. 업데이트
        // 비밀번호는 업데이트하지 않거나, 새 비밀번호가 있으면 업데이트 (여기서는 제외)
        const { password: _, ...updateData } = body;
        const updatedReservation = await prisma.reservation.update({
            where: { id: parseInt(id) },
            data: updateData
        });

        return NextResponse.json(updatedReservation);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to update reservation' },
            { status: 500 }
        );
    }
}

// DELETE /api/reservations/[id] - 관리자 또는 비밀번호 일치 시
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        // DELETE 요청은 body를 가질 수 있지만, 일부 클라이언트는 지원하지 않을 수 있음.
        // 여기서는 헤더나 query param으로 비밀번호를 받을 수도 있지만, 
        // Next.js에서는 Request body를 읽을 수 있음.
        let password = '';
        try {
            const body = await request.json();
            password = body.password;
        } catch (e) {
            // Body가 없는 경우 (관리자 삭제 등)
        }

        const token = getTokenFromRequest(request.headers.get('authorization'));
        const isAdmin = token && (await verifyToken(token));

        // 1. 기존 예약 조회 (비밀번호 확인용)
        const reservation = await prisma.reservation.findUnique({ where: { id: parseInt(id) } });

        if (!reservation) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }

        // 2. 권한 확인
        let isPasswordCorrect = false;
        if (isAdmin) {
            isPasswordCorrect = true;
        } else {
            if (password && reservation.password === password) {
                isPasswordCorrect = true;
            }
        }

        if (!isPasswordCorrect) {
            return NextResponse.json({ error: '비밀번호가 일치하지 않습니다.' }, { status: 403 });
        }

        // 3. 삭제
        await prisma.reservation.delete({ where: { id: parseInt(id) } });

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to delete reservation' },
            { status: 500 }
        );
    }
}
