import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'default-secret-key';
const secretKey = new TextEncoder().encode(JWT_SECRET);

export async function generateToken(username: string): Promise<string> {
    return new SignJWT({ username })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(secretKey);
}

export async function verifyToken(token: string): Promise<{ username: string } | null> {
    try {
        const { payload } = await jwtVerify(token, secretKey);
        return payload as { username: string };
    } catch {
        return null;
    }
}

export function getTokenFromRequest(authHeader: string | null): string | null {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return null;
    }
    return authHeader.substring(7);
}
