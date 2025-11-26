import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';
import { getPrisma } from '@/lib/prisma';
import { getTokenFromRequest, verifyToken } from '@/lib/jwt';

export const dynamic = 'force-dynamic';

// GET /api/reservations - 공개 (미래 예약만, 개인정보 마스킹)
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const branchId = searchParams.get('branchId');
        const isAdmin = searchParams.get('admin') === 'true'; // 관리자 모드 확인

        // 관리자 요청인 경우 토큰 확인
        if (isAdmin) {
            const token = getTokenFromRequest(request.headers.get('authorization'));
            if (!token || !(await verifyToken(token))) {
                return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
            }
        }

        const prisma = getPrisma();
        let reservations = await prisma.reservation.findMany({
            where: {
                ...(branchId ? { branchId } : {}),
                // ...(isAdmin ? {} : { dateTime: { gte: new Date() } }) // 날짜 필터링 잠시 해제
            },
            orderBy: { dateTime: 'asc' }
        });

        // 일반 사용자에게는 민감 정보 마스킹
        if (!isAdmin) {
            reservations = (reservations as any[]).map((r: any) => ({
                id: r.id,
                branchId: r.branchId,
                name: r.name.length > 1 ? r.name[0] + '*' + r.name.slice(2) : r.name, // 홍*동
                dateTime: r.dateTime,
                programId: r.programId,
                // phone, notes, password 제외
            })) as any;
        }

        return NextResponse.json(reservations);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: 'Failed to fetch reservations' },
            { status: 500 }
        );
    }
}

// POST /api/reservations - 예약 생성 (비밀번호 필수)
export async function POST(request: NextRequest) {
    try {
        const body = await request.json() as any;

        // 유효성 검사
        if (!body.password || body.password.length < 4) {
            return NextResponse.json({ error: '비밀번호는 4자리 이상이어야 합니다.' }, { status: 400 });
        }

        const prisma = getPrisma();
        const reservation = await prisma.reservation.create({ data: body });

        return NextResponse.json(reservation);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: 'Failed to create reservation' },
            { status: 500 }
        );
    }
}
