import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';
import { getDB, Reservation } from '@/lib/d1';
import { getTokenFromRequest, verifyToken } from '@/lib/jwt';

// GET /api/reservations/[id] - 관리자만
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

        const db = getDB();
        const reservation = await db.prepare('SELECT * FROM Reservation WHERE id = ?')
            .bind(parseInt(id))
            .first<Reservation>();

        if (!reservation) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }

        return NextResponse.json(reservation);
    } catch (error) {
        console.error('[Reservation GET]', error);
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
        const body = await request.json() as any;
        const token = getTokenFromRequest(request.headers.get('authorization'));
        const isAdmin = token && (await verifyToken(token));
        const password = body.password;

        const db = getDB();

        // 기존 예약 조회
        const reservation = await db.prepare('SELECT password FROM Reservation WHERE id = ?')
            .bind(parseInt(id))
            .first<{ password: string }>();

        if (!reservation) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }

        // 권한 확인
        if (!isAdmin && (!password || reservation.password !== password)) {
            return NextResponse.json({ error: '비밀번호가 일치하지 않습니다.' }, { status: 403 });
        }

        // 업데이트
        const result = await db.prepare(`
            UPDATE Reservation 
            SET name = ?, phone = ?, dateTime = ?, notes = ?, programId = ?
            WHERE id = ?
        `).bind(
            body.name,
            body.phone,
            body.dateTime,
            body.notes || null,
            body.programId || null,
            parseInt(id)
        ).run();

        if (!result.success) {
            throw new Error('Failed to update reservation');
        }

        // 업데이트된 예약 조회
        const updatedReservation = await db.prepare('SELECT * FROM Reservation WHERE id = ?')
            .bind(parseInt(id))
            .first<Reservation>();

        return NextResponse.json(updatedReservation);
    } catch (error) {
        console.error('[Reservation PUT]', error);
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
        let password = '';
        try {
            const body = await request.json() as any;
            password = body.password;
        } catch (e) {
            // Body가 없는 경우
        }

        const token = getTokenFromRequest(request.headers.get('authorization'));
        const isAdmin = token && (await verifyToken(token));

        const db = getDB();

        // 기존 예약 조회
        const reservation = await db.prepare('SELECT password FROM Reservation WHERE id = ?')
            .bind(parseInt(id))
            .first<{ password: string }>();

        if (!reservation) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }

        // 권한 확인
        if (!isAdmin && (!password || reservation.password !== password)) {
            return NextResponse.json({ error: '비밀번호가 일치하지 않습니다.' }, { status: 403 });
        }

        // 삭제
        const result = await db.prepare('DELETE FROM Reservation WHERE id = ?')
            .bind(parseInt(id))
            .run();

        if (!result.success) {
            throw new Error('Failed to delete reservation');
        }

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error('[Reservation DELETE]', error);
        return NextResponse.json(
            { error: 'Failed to delete reservation' },
            { status: 500 }
        );
    }
}
