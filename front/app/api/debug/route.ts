import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    try {
        const context = getRequestContext();
        const env = context?.env || {};

        // 민감한 정보는 마스킹하거나 키만 출력
        const envKeys = Object.keys(env);
        const dbBinding = env.DB ? 'Present' : 'Missing';

        // D1 바인딩 상세 정보 (메타데이터만)
        const dbInfo = env.DB ? {
            hasPrepare: typeof (env.DB as any).prepare === 'function',
            hasBatch: typeof (env.DB as any).batch === 'function',
            hasExec: typeof (env.DB as any).exec === 'function',
        } : null;

        return NextResponse.json({
            status: 'ok',
            timestamp: new Date().toISOString(),
            runtime: process.env.NEXT_RUNTIME || 'unknown',
            context: {
                hasContext: !!context,
                hasEnv: !!context?.env,
            },
            env: {
                keys: envKeys,
                dbBinding: dbBinding,
                dbInfo: dbInfo
            },
            processEnv: {
                NODE_ENV: process.env.NODE_ENV,
                // 기타 안전한 환경 변수들
            }
        });
    } catch (error: any) {
        return NextResponse.json({
            error: 'Debug failed',
            message: error.message,
            stack: error.stack
        }, { status: 500 });
    }
}
