import { PrismaClient } from '@prisma/client';
import { PrismaD1 } from '@prisma/adapter-d1';

// 전역 변수에 인스턴스 캐싱
const globalForPrisma = global as unknown as { prisma: PrismaClient | null };

export const getPrisma = (): PrismaClient => {
    // 1. 이미 생성된 인스턴스가 있으면 반환
    if (globalForPrisma.prisma) {
        return globalForPrisma.prisma;
    }

    let prisma: PrismaClient;
    let d1Binding: any = null;

    // 2. Cloudflare D1 바인딩 시도
    try {
        // @cloudflare/next-on-pages는 Edge Runtime에서만 사용 가능
        // 동적 import로 에러 방지
        const nextOnPages = require('@cloudflare/next-on-pages');
        if (nextOnPages && nextOnPages.getRequestContext) {
            const ctx = nextOnPages.getRequestContext();
            d1Binding = ctx?.env?.DB;
        }
    } catch (error) {
        // Edge Runtime이 아니거나 모듈이 없는 경우 무시
        console.log('[Prisma] Not in Cloudflare environment or getRequestContext failed');
    }

    // 3. D1 바인딩이 있으면 사용
    if (d1Binding) {
        console.log('[Prisma] Using D1 Database');
        const adapter = new PrismaD1(d1Binding);
        prisma = new PrismaClient({ adapter });
    } else {
        // 4. 로컬 개발 환경 (SQLite 파일)
        console.log('[Prisma] Using Local SQLite');
        prisma = new PrismaClient({
            log: ['query'],
            datasourceUrl: process.env.DATABASE_URL || 'file:./dev.db'
        });
    }

    // 개발 환경에서만 전역 변수에 저장
    if (process.env.NODE_ENV !== 'production') {
        globalForPrisma.prisma = prisma;
    }

    return prisma;
};
