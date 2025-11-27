interface Env {
    DB: D1Database;
}

export const onRequest: PagesFunction<Env> = async (context) => {
    const { env } = context;

    return Response.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        envKeys: Object.keys(env),
        hasDB: !!env.DB,
        dbType: env.DB ? typeof env.DB : 'undefined'
    });
};
