interface Env {
    DB: D1Database;
}

export const onRequestDelete: PagesFunction<Env> = async (context) => {
    try {
        const { params, request, env } = context;
        const id = params.id as string;
        const body = await request.json() as any;
        const db = env.DB;

        // 관리자 권한 확인 (Authorization 헤더 체크)
        const authHeader = request.headers.get('Authorization');
        // 실제로는 JWT 검증 등을 해야 하지만, 여기서는 간단히 토큰 존재 여부와 특정 값 확인
        const isAdmin = authHeader && authHeader.includes('admin-secret-token-12345');

        if (!isAdmin) {
            // 관리자가 아니면 비밀번호 확인
            if (!body.password) {
                return Response.json({ error: '비밀번호를 입력해주세요.' }, { status: 400 });
            }

            const existingReservation = await db.prepare('SELECT password FROM Reservation WHERE id = ?')
                .bind(id)
                .first<any>();

            if (!existingReservation) {
                return Response.json({ error: 'Reservation not found' }, { status: 404 });
            }

            if (existingReservation.password !== body.password) {
                return Response.json({ error: '비밀번호가 일치하지 않습니다.' }, { status: 403 });
            }
        }

        // 삭제
        await db.prepare('DELETE FROM Reservation WHERE id = ?')
            .bind(id)
            .run();

        return Response.json({ success: true });
    } catch (error: any) {
        console.error('[Reservation DELETE] Error:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
};
