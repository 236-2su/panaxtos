import { PrismaClient } from '@prisma/client';
import { PrismaD1 } from '@prisma/adapter-d1';
import { getRequestContext } from '@cloudflare/next-on-pages';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const makePrisma = () => {
    try {
        // Cloudflare 환경인지 확인 (Edge Runtime에서만 동작)
        const ctx = getRequestContext();
        if (ctx && ctx.env && ctx.env.DB) {
            console.log('Using D1 Database Adapter');
            const adapter = new PrismaD1(ctx.env.DB);
            return new PrismaClient({ adapter });
        }
    } catch (e) {
        // Edge Runtime이 아니거나 getRequestContext 실패 시 무시하고 로컬 DB 사용
    }

    console.log('Using Local SQLite File');
    // 기본값: 로컬 파일 DB
    return new PrismaClient({
        log: ['query'],
        datasourceUrl: process.env.DATABASE_URL || 'file:./dev.db'
    });
};

export const prisma = globalForPrisma.prisma || makePrisma();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
