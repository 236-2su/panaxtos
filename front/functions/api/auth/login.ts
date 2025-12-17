interface Env {
    DB: D1Database;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
    try {
        const { request } = context;
        const body = await request.json() as any;

        // 하드코딩된 관리자 계정 (Next.js API와 일치시킴)
        const ADMIN_USER = 'bada811';
        const ADMIN_PASS = 'Panaxtos#Brain$2025!Secure';

        if (body.username === ADMIN_USER && body.password === ADMIN_PASS) {
            return Response.json({
                success: true,
                token: 'secure_admin_token_12345',
                user: { name: 'Admin', role: 'admin' }
            });
        }

        return Response.json({ error: 'Invalid credentials' }, { status: 401 });
    } catch (error: any) {
        return Response.json({ error: error.message }, { status: 500 });
    }
};
