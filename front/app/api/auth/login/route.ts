import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';
import { generateToken } from '@/lib/jwt';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { username, password } = body;

        const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
        const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'PanaxtosJinju2024!';

        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            const token = generateToken(username);
            return NextResponse.json({ token });
        }

        return NextResponse.json(
            { error: 'Invalid credentials' },
            { status: 401 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: 'Login failed' },
            { status: 500 }
        );
    }
}
