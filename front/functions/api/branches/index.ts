interface Env {
    DB: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
    try {
        const { env } = context;
        const db = env.DB;

        const { results } = await db.prepare('SELECT * FROM Branch ORDER BY name ASC').all<any>();

        return Response.json(results || []);
    } catch (error: any) {
        console.error('[Branches GET] Error:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
};
