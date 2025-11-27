interface Env {
    DB: D1Database;
}

export const onRequestDelete: PagesFunction<Env> = async (context) => {
    try {
        const { params, request, env } = context;
        const id = params.id as string;
        console.log(`[Reservation DELETE /${id}] Start`);

        // body가 없을 수도 있으므로 안전하게 파싱
        let body: any = {};
        try {
            const text = await request.text();
            console.log(`[Reservation DELETE /${id}] Request body text:`, text);
            if (text) {
                body = JSON.parse(text);
                console.log(`[Reservation DELETE /${id}] Parsed body:`, body);
            } else {
                console.log(`[Reservation DELETE /${id}] Body is empty`);
            }
        } catch (e: any) {
            console.error(`[Reservation DELETE /${id}] Body parsing error:`, e.message);
        }

        const db = env.DB;

        // 관리자 권한 확인 (Authorization 헤더 체크)
        const authHeader = request.headers.get('Authorization');
        console.log(`[Reservation DELETE /${id}] Auth header:`, authHeader);
        // 실제로는 JWT 검증 등을 해야 하지만, 여기서는 간단히 토큰 존재 여부와 특정 값 확인
        const isAdmin = authHeader && authHeader.includes('admin-secret-token-12345');
        console.log(`[Reservation DELETE /${id}] isAdmin:`, isAdmin);

        if (!isAdmin) {
            // 관리자가 아니면 비밀번호 확인
            console.log(`[Reservation DELETE /${id}] Not admin, checking password`);
            if (!body.password) {
                return Response.json({ error: '비밀번호를 입력해주세요.' }, { status: 400 });
            }

            const existingReservation = await db.prepare('SELECT password FROM Reservation WHERE id = ?')
                .bind(id)
                .first<any>();

            if (!existingReservation) {
                console.log(`[Reservation DELETE /${id}] Reservation not found`);
                return Response.json({ error: 'Reservation not found' }, { status: 404 });
            }

            if (existingReservation.password !== body.password) {
                console.log(`[Reservation DELETE /${id}] Password mismatch`);
                return Response.json({ error: '비밀번호가 일치하지 않습니다.' }, { status: 403 });
            }
        } else {
            console.log(`[Reservation DELETE /${id}] Admin access, skipping password check`);
        }

        // 삭제
        console.log(`[Reservation DELETE /${id}] Deleting reservation`);
        await db.prepare('DELETE FROM Reservation WHERE id = ?')
            .bind(id)
            .run();

        console.log(`[Reservation DELETE /${id}] Success`);
        return Response.json({ success: true });
    } catch (error: any) {
        console.error('[Reservation DELETE] Error:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
};
