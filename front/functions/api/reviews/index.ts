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

        console.log('[Reviews POST] Received:', JSON.stringify(body));

        // Validation
        if (!body.branchId) {
            return Response.json({ error: 'branchId is required' }, { status: 400 });
        }
        if (!body.author) {
            return Response.json({ error: 'author is required' }, { status: 400 });
        }
        if (!body.password || body.password.length < 4) {
            return Response.json({ error: '비밀번호는 4자리 이상이어야 합니다.' }, { status: 400 });
        }
        if (!body.rating || body.rating < 1 || body.rating > 5) {
            return Response.json({ error: 'rating must be between 1 and 5' }, { status: 400 });
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
            body.comment || '',
            body.password
        ).run();

        console.log('[Reviews POST] Result:', JSON.stringify({
            success: result.success,
            meta: result.meta
        }));

        if (!result.success) {
            throw new Error('Failed to insert review');
        }

        const lastId = result.meta?.last_row_id;
        if (!lastId) {
            console.error('[Reviews POST] No last_row_id returned');
            return Response.json({
                success: true,
                message: 'Review created successfully'
            }, { status: 201 });
        }

        const review = await db.prepare('SELECT * FROM Review WHERE id = ?')
            .bind(lastId)
            .first();

        return Response.json(review, { status: 201 });
    } catch (error: any) {
        console.error('[Reviews POST] Error:', error.message);
        return Response.json({
            error: 'Server error',
            details: error.message
        }, { status: 500 });
    }
};
