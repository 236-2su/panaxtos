import { NextResponse } from 'next/server';

export const runtime = 'edge'; // Cloudflare Edge Runtime 사용

export async function POST(request: Request) {
    try {
        const { DB } = process.env as any; // D1 바인딩 가져오기

        // 로컬 개발 환경용 예외 처리 (DB가 없을 경우)
        if (!DB) {
            return NextResponse.json(
                { error: 'D1 데이터베이스가 연결되지 않았습니다. (Local Dev)' },
                { status: 500 }
            );
        }

        const body = await request.json();
        const { name, phone, password, dateTime, notes, programId, branchId = 'jinju' } = body;

        // 필수 필드 검증
        if (!name || !phone || !password || !dateTime) {
            return NextResponse.json(
                { error: '필수 정보가 누락되었습니다.' },
                { status: 400 }
            );
        }

        // D1에 데이터 삽입
        const result = await DB.prepare(
            `INSERT INTO Reservation (branchId, name, phone, password, dateTime, notes, programId) 
             VALUES (?, ?, ?, ?, ?, ?, ?)`
        ).bind(branchId, name, phone, password, dateTime, notes, programId).run();

        return NextResponse.json({ success: true, result });

    } catch (error) {
        console.error('Reservation create error:', error);
        return NextResponse.json(
            { error: '예약 처리에 실패했습니다.' },
            { status: 500 }
        );
    }
}

export async function GET(request: Request) {
    try {
        const { DB } = process.env as any;

        if (!DB) {
            // 로컬 테스트용 더미 데이터
            return NextResponse.json([
                { id: 1, name: '테스트(로컬)', dateTime: new Date().toISOString(), phone: '010-0000-0000', notes: '로컬 환경입니다.' }
            ]);
        }

        const { searchParams } = new URL(request.url);
        const admin = searchParams.get('admin');

        // 관리자용: 모든 예약 조회
        if (admin === 'true') {
            const { results } = await DB.prepare(
                `SELECT * FROM Reservation ORDER BY dateTime DESC`
            ).all();

            return NextResponse.json(results);
        }

        return NextResponse.json({ error: '권한이 없습니다.' }, { status: 403 });
    } catch (error) {
        console.error('Reservation fetch error:', error);
        return NextResponse.json({ error: '데이터 조회 실패' }, { status: 500 });
    }
}
