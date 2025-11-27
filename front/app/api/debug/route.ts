import { NextRequest, NextResponse } from 'next/server';
// import { getRequestContext } from '@cloudflare/next-on-pages'; // This will be dynamically imported

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    let context: any = null;
    let contextError: string | null = null;

    try {
        // 동적 import로 시도하여 모듈 로드 에러 방지
        const { getRequestContext } = await import('@cloudflare/next-on-pages');
        context = getRequestContext();
    } catch (e: any) {
        contextError = e.message;
    }

    try {
        const env = context?.env || {};

        // 민감한 정보는 마스킹하거나 키만 출력
        const envKeys = env ? Object.keys(env) : [];
        const dbBinding = env?.DB ? 'Present' : 'Missing';

        // D1 바인딩 상세 정보 (메타데이터만) - This part is removed in the new instruction
        // const dbInfo = env.DB ? {
        //     hasPrepare: typeof (env.DB as any).prepare === 'function',
        //     hasBatch: typeof (env.DB as any).batch === 'function',
        //     hasExec: typeof (env.DB as any).exec === 'function',
        // } : null;

        return NextResponse.json({
            status: 'ok',
            timestamp: new Date().toISOString(),
            runtime: process.env.NEXT_RUNTIME || 'unknown',
            contextStatus: {
                success: !!context,
                error: contextError,
                hasEnv: !!context?.env,
            },
            env: {
                keys: envKeys,
                dbBinding: dbBinding,
                // dbInfo: dbInfo // This part is removed in the new instruction
            },
            processEnv: {
                NODE_ENV: process.env.NODE_ENV,
                // 기타 안전한 환경 변수들
            }
        });
    } catch (error: any) {
        return NextResponse.json({
            error: 'Debug logic failed',
            message: error.message
        }, { status: 200 }); // 200으로 반환하여 에러 내용 확인
    }
}
