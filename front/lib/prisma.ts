import { PrismaClient } from '@prisma/client';
import { PrismaD1 } from '@prisma/adapter-d1';

// 전역 변수에 인스턴스 캐싱 (Hot Reload 대응)
const globalForPrisma = global as unknown as { prisma: PrismaClient | null };

export const getPrisma = (): PrismaClient => {
    // 1. 이미 생성된 인스턴스가 있으면 반환 (재사용)
    if (globalForPrisma.prisma) {
        return globalForPrisma.prisma;
    }

    let prisma: PrismaClient;

    // 2. Cloudflare Pages 환경인지 확인
    // process.env.CF_PAGES가 있으면 Cloudflare Pages 환경
    const isCloudflare = typeof process !== 'undefined' && process.env.CF_PAGES === '1';

    if (isCloudflare) {
        try {
            // Cloudflare 환경에서만 getRequestContext import
            const { getRequestContext } = require('@cloudflare/next-on-pages');
            const ctx = getRequestContext();

            if (ctx && ctx.env && ctx.env.DB) {
                const adapter = new PrismaD1(ctx.env.DB);
                prisma = new PrismaClient({ adapter });
                console.log('[Prisma] Using D1 Database');
            } else {
                throw new Error('D1 binding not found in Cloudflare context');
            }
        } catch (error) {
            console.error('[Prisma] Failed to initialize D1:', error);
            throw new Error('Database initialization failed in Cloudflare environment');
        }
    } else {
        // 3. 로컬 개발 환경 (SQLite 파일)
        console.log('[Prisma] Using Local SQLite');
        prisma = new PrismaClient({
            log: ['query'],
            datasourceUrl: process.env.DATABASE_URL || 'file:./dev.db'
        });
    }

    // 개발 환경에서만 전역 변수에 저장 (Next.js Hot Reload 대응)
    if (process.env.NODE_ENV !== 'production') {
        globalForPrisma.prisma = prisma;
    }

    return prisma;
};
