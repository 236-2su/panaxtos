import { NextResponse } from 'next/server';


export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { username, password } = body;

        // Secure Credentials (bada811)
        if (username === 'bada811' && password === 'Panaxtos#Brain$2025!Secure') {
            return NextResponse.json({
                success: true,
                token: 'secure_admin_token_12345',
                user: { name: 'Admin', role: 'admin' }
            });
        } else {
            return NextResponse.json(
                { success: false, error: '아이디 또는 비밀번호가 올바르지 않습니다.' },
                { status: 401 }
            );
        }
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { success: false, error: '서버 오류가 발생했습니다.' },
            { status: 500 }
        );
    }
}
