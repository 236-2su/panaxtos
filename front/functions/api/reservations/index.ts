interface Env {
    DB: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
    try {
        const { request, env } = context;
        const url = new URL(request.url);
        const branchId = url.searchParams.get('branchId');
        const isAdmin = url.searchParams.get('admin') === 'true';

        const db = env.DB;

        // 과거 예약 자동 삭제 (현재 시간보다 1시간 이상 지난 예약)
        const now = new Date();
        const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000); // 1시간 전
        const isoOneHourAgo = oneHourAgo.toISOString();

        await db.prepare('DELETE FROM Reservation WHERE dateTime < ?')
            .bind(isoOneHourAgo)
            .run();

        let query: string;
        let stmt: D1PreparedStatement;

        if (isAdmin) {
            query = branchId
                ? 'SELECT * FROM Reservation WHERE branchId = ? ORDER BY dateTime ASC'
                : 'SELECT * FROM Reservation ORDER BY dateTime ASC';
            stmt = branchId ? db.prepare(query).bind(branchId) : db.prepare(query);
        } else {
            query = branchId
                ? 'SELECT id, branchId, name, dateTime, programId FROM Reservation WHERE branchId = ? ORDER BY dateTime ASC'
                : 'SELECT id, branchId, name, dateTime, programId FROM Reservation ORDER BY dateTime ASC';
            stmt = branchId ? db.prepare(query).bind(branchId) : db.prepare(query);
        }

        const { results } = await stmt.all<any>();
        let reservations = results || [];

        if (!isAdmin) {
            reservations = reservations.map((r: any) => ({
                ...r,
                name: r.name.length > 1 ? r.name[0] + '*' + r.name.slice(2) : r.name
            }));
        }

        return Response.json(reservations);
    } catch (error: any) {
        console.error('[Reservations GET] Error:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
    try {
        const { request, env } = context;
        const body = await request.json() as any;

        console.log('[Reservations POST] Received:', JSON.stringify(body));

        // Validation
        if (!body.branchId) {
            return Response.json({ error: 'branchId is required' }, { status: 400 });
        }
        if (!body.name) {
            return Response.json({ error: 'name is required' }, { status: 400 });
        }
        if (!body.password || body.password.length < 4) {
            return Response.json({ error: '비밀번호는 4자리 이상이어야 합니다.' }, { status: 400 });
        }

        const db = env.DB;

        const result = await db.prepare(`
      INSERT INTO Reservation (branchId, name, phone, password, dateTime, notes, programId)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(
            body.branchId,
            body.name,
            body.phone || '',
            body.password,
            body.dateTime,
            body.notes || null,
            body.programId || null
        ).run();

        console.log('[Reservations POST] Result:', JSON.stringify({
            success: result.success,
            meta: result.meta
        }));

        if (!result.success) {
            throw new Error('Failed to insert reservation');
        }

        // D1에서 last_row_id 가져오기
        const lastId = result.meta?.last_row_id;
        if (!lastId) {
            console.error('[Reservations POST] No last_row_id returned');
            return Response.json({
                success: true,
                message: 'Reservation created successfully'
            }, { status: 201 });
        }

        const reservation = await db.prepare('SELECT * FROM Reservation WHERE id = ?')
            .bind(lastId)
            .first();

        return Response.json(reservation, { status: 201 });
    } catch (error: any) {
        console.error('[Reservations POST] Error:', error.message);
        return Response.json({
            error: 'Server error',
            details: error.message
        }, { status: 500 });
    }
};
