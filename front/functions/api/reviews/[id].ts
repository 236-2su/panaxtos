interface Env {
    DB: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
    try {
        const { params, env } = context;
        const id = params.id as string;
        const db = env.DB;

        const review = await db.prepare('SELECT * FROM Review WHERE id = ?')
            .bind(id)
            .first<any>();

        if (!review) {
            return Response.json({ error: 'Review not found' }, { status: 404 });
        }

        return Response.json(review);
    } catch (error: any) {
        console.error('[Review GET] Error:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
};

export const onRequestPut: PagesFunction<Env> = async (context) => {
    try {
        const { params, request, env } = context;
        const id = params.id as string;
        const body = await request.json() as any;
        const db = env.DB;

        // 비밀번호 확인
        const existingReview = await db.prepare('SELECT password FROM Review WHERE id = ?')
            .bind(id)
            .first<any>();

        if (!existingReview) {
            return Response.json({ error: 'Review not found' }, { status: 404 });
        }

        if (existingReview.password !== body.password) {
            return Response.json({ error: '비밀번호가 일치하지 않습니다.' }, { status: 403 });
        }

        // 업데이트
        await db.prepare(`
      UPDATE Review 
      SET author = ?, title = ?, rating = ?, comment = ?
      WHERE id = ?
    `).bind(
            body.author,
            body.title || null,
            body.rating,
            body.comment,
            id
        ).run();

        const updatedReview = await db.prepare('SELECT * FROM Review WHERE id = ?')
            .bind(id)
            .first();

        return Response.json(updatedReview);
    } catch (error: any) {
        console.error('[Review PUT] Error:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
};

export const onRequestDelete: PagesFunction<Env> = async (context) => {
    try {
        const { params, request, env } = context;
        const id = params.id as string;
        console.log(`[Review DELETE /${id}] Start`);

        // body가 없을 수도 있으므로 안전하게 파싱
        let body: any = {};
        try {
            const text = await request.text();
            console.log(`[Review DELETE /${id}] Request body text:`, text);
            if (text) {
                body = JSON.parse(text);
                console.log(`[Review DELETE /${id}] Parsed body:`, body);
            } else {
                console.log(`[Review DELETE /${id}] Body is empty`);
            }
        } catch (e: any) {
            console.error(`[Review DELETE /${id}] Body parsing error:`, e.message);
        }

        const db = env.DB;

        // 관리자 권한 확인 (Authorization 헤더 체크)
        const authHeader = request.headers.get('Authorization');
        console.log(`[Review DELETE /${id}] Auth header:`, authHeader);
        const isAdmin = authHeader && authHeader.includes('admin-secret-token-12345');
        console.log(`[Review DELETE /${id}] isAdmin:`, isAdmin);

        if (!isAdmin) {
            // 비밀번호 확인
            console.log(`[Review DELETE /${id}] Not admin, checking password`);
            const existingReview = await db.prepare('SELECT password FROM Review WHERE id = ?')
                .bind(id)
                .first<any>();

            if (!existingReview) {
                console.log(`[Review DELETE /${id}] Review not found`);
                return Response.json({ error: 'Review not found' }, { status: 404 });
            }

            if (existingReview.password !== body.password) {
                console.log(`[Review DELETE /${id}] Password mismatch`);
                return Response.json({ error: '비밀번호가 일치하지 않습니다.' }, { status: 403 });
            }
        } else {
            console.log(`[Review DELETE /${id}] Admin access, skipping password check`);
        }

        // 삭제
        console.log(`[Review DELETE /${id}] Deleting review`);
        await db.prepare('DELETE FROM Review WHERE id = ?')
            .bind(id)
            .run();

        console.log(`[Review DELETE /${id}] Success`);
        return Response.json({ success: true });
    } catch (error: any) {
        console.error('[Review DELETE] Error:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
};
