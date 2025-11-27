interface Env {
    DB: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
    try {
        const { request, env } = context;
        const url = new URL(request.url);
        const branchId = url.searchParams.get('branchId');
        const db = env.DB;

        let query: string;
        let stmt: D1PreparedStatement;

        if (branchId) {
            query = 'SELECT * FROM Review WHERE branchId = ? ORDER BY createdAt DESC';
            stmt = db.prepare(query).bind(branchId);
        } else {
            query = 'SELECT * FROM Review ORDER BY createdAt DESC';
            stmt = db.prepare(query);
        }

        const { results } = await stmt.all<any>();

        return Response.json(results || []);
    } catch (error: any) {
        console.error('[Reviews GET] Error:', error);
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
      INSERT INTO Review (branchId, author, title, rating, comment, password)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(
            body.branchId,
            body.author,
            body.title || null,
            body.rating,
            body.comment,
            body.password
        ).run();

        if (!result.success) {
            throw new Error('Failed to insert review');
        }

        const review = await db.prepare('SELECT * FROM Review WHERE id = ?')
            .bind(result.meta.last_row_id)
            .first();

        return Response.json(review);
    } catch (error: any) {
        console.error('[Reviews POST] Error:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
};
