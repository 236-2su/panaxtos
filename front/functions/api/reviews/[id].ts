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
        const body = await request.json() as any;
        const db = env.DB;

        // 관리자 권한 확인 (Authorization 헤더 체크)
        const authHeader = request.headers.get('Authorization');
        const isAdmin = authHeader && authHeader.includes('admin-secret-token-12345');

        if (!isAdmin) {
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
        }

        // 삭제
        await db.prepare('DELETE FROM Review WHERE id = ?')
            .bind(id)
            .run();

        return Response.json({ success: true });
    } catch (error: any) {
        console.error('[Review DELETE] Error:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
};
