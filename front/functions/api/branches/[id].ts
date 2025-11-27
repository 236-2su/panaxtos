interface Env {
    DB: D1Database;
}

export const onRequest: PagesFunction<Env> = async (context) => {
    try {
        const { params, env } = context;
        const id = params.id as string;
        const db = env.DB;

        const branch = await db.prepare('SELECT * FROM Branch WHERE id = ?')
            .bind(id)
            .first<any>();

        if (!branch) {
            return Response.json({ error: 'Branch not found' }, { status: 404 });
        }

        return Response.json(branch);
    } catch (error: any) {
        console.error('[Branch GET] Error:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
};
