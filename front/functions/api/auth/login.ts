interface Env {
    DB: D1Database;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
    try {
        const { request } = context;
        const body = await request.json() as any;

        // 하드코딩된 관리자 계정 (환경변수로 빼는 것이 좋음)
        const ADMIN_USER = 'admin';
        const ADMIN_PASS = 'PanaxtosJinju2024!';

        if (body.username === ADMIN_USER && body.password === ADMIN_PASS) {
            // 간단한 토큰 반환 (실제로는 JWT 등을 사용해야 함)
            return Response.json({
                success: true,
                token: 'admin-secret-token-12345',
                user: { username: ADMIN_USER }
            });
        }

        return Response.json({ error: 'Invalid credentials' }, { status: 401 });
    } catch (error: any) {
        return Response.json({ error: error.message }, { status: 500 });
    }
};
