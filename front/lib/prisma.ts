import { PrismaClient } from '@prisma/client';
import { PrismaD1 } from '@prisma/adapter-d1';
import { getRequestContext } from '@cloudflare/next-on-pages';

// 전역 변수에 인스턴스 캐싱 (Hot Reload 대응)
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const getPrisma = () => {
    // 1. 이미 생성된 인스턴스가 있으면 반환 (재사용)
    if (globalForPrisma.prisma) {
        return globalForPrisma.prisma;
    }

    let prisma: PrismaClient;

    try {
        // 2. Cloudflare Pages 환경 (D1) - 요청 처리 중에만 성공함
        const ctx = getRequestContext();
        if (ctx && ctx.env && ctx.env.DB) {
            // console.log('Using D1 Database Adapter');
            const adapter = new PrismaD1(ctx.env.DB);
            prisma = new PrismaClient({ adapter });
            // Cloudflare 환경에서는 전역 캐싱을 주의해야 할 수도 있지만, 
            // 일반적인 요청 스코프 내에서는 재사용하는 것이 좋음.
            // 다만 next-on-pages는 요청마다 격리될 수 있음.
        } else {
            throw new Error('No D1 binding found');
        }
    } catch (e) {
        // 3. 로컬 개발 또는 빌드 타임 (SQLite 파일)
        // console.log('Using Local SQLite File');
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

// 하위 호환성을 위해 남겨두지만, 사용하지 않는 것이 좋음.
// 빌드 타임 에러를 피하기 위해 getter로 접근할 때만 실행되도록 할 수도 있지만,
// 명시적으로 getPrisma()를 호출하는 것이 안전함.
