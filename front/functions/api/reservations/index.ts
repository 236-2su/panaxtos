interface Env {
    DB: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
    try {
        const { request, env } = context;
        const url = new URL(request.url);
        const branchId = url.searchParams.get('branchId');
        const isAdmin = url.searchParams.get('admin') === 'true';

        // 관리자 인증 로직은 일단 생략하거나 헤더에서 확인
        // const authHeader = request.headers.get('Authorization');

        const db = env.DB;
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
        return Response.json({ error: error.message }, { status: 500 });
    }
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
    try {
        const { request, env } = context;
        const body = await request.json() as any;

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
            body.phone,
            body.password,
            body.dateTime,
            body.notes || null,
            body.programId || null
        ).run();

        if (!result.success) {
            throw new Error('Failed to insert reservation');
        }

        const reservation = await db.prepare('SELECT * FROM Reservation WHERE id = ?')
            .bind(result.meta.last_row_id)
            .first();

        return Response.json(reservation);
    } catch (error: any) {
        return Response.json({ error: error.message }, { status: 500 });
    }
};
