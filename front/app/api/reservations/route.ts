import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';
import { getDB, Reservation } from '@/lib/d1';
import { getTokenFromRequest, verifyToken } from '@/lib/jwt';

export const dynamic = 'force-dynamic';

// GET /api/reservations - 공개 (미래 예약만, 개인정보 마스킹)
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const branchId = searchParams.get('branchId');
        const isAdmin = searchParams.get('admin') === 'true';

        // 관리자 요청인 경우 토큰 확인
        if (isAdmin) {
            const token = getTokenFromRequest(request.headers.get('authorization'));
            if (!token || !(await verifyToken(token))) {
                return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
            }
        }

        const db = getDB();
        let query: string;
        let stmt;

        if (isAdmin) {
            // 관리자: 모든 정보
            query = branchId
                ? 'SELECT * FROM Reservation WHERE branchId = ? ORDER BY dateTime ASC'
                : 'SELECT * FROM Reservation ORDER BY dateTime ASC';
            stmt = branchId ? db.prepare(query).bind(branchId) : db.prepare(query);
        } else {
            // 일반 사용자: 개인정보 마스킹
            query = branchId
                ? 'SELECT id, branchId, name, dateTime, programId FROM Reservation WHERE branchId = ? ORDER BY dateTime ASC'
                : 'SELECT id, branchId, name, dateTime, programId FROM Reservation ORDER BY dateTime ASC';
            stmt = branchId ? db.prepare(query).bind(branchId) : db.prepare(query);
        }

        const { results } = await stmt.all<any>();
        let reservations = results || [];

        // 일반 사용자에게는 이름 마스킹
        if (!isAdmin) {
            reservations = reservations.map((r: any) => ({
                ...r,
                name: r.name.length > 1 ? r.name[0] + '*' + r.name.slice(2) : r.name
            }));
        }

        return NextResponse.json(reservations);
    } catch (error) {
        console.error('[Reservations GET]', error);
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

        const db = getDB();
        const result = await db.prepare(`
            INSERT INTO Reservation (branchId, name, phone, password, dateTime, notes, programId)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `).bind(
            body.branchId,
            body.name,
            body.phone,
            body.password,
            body.dateTime,
            body.notes || null,
            body.programId || null
        ).run();

        if (!result.success) {
            throw new Error('Failed to insert reservation');
        }

        // 생성된 예약 조회
        const reservation = await db.prepare('SELECT * FROM Reservation WHERE id = ?')
            .bind(result.meta.last_row_id)
            .first<Reservation>();

        return NextResponse.json(reservation);
    } catch (error) {
        console.error('[Reservations POST]', error);
        return NextResponse.json(
            { error: 'Failed to create reservation' },
            { status: 500 }
        );
    }
}
