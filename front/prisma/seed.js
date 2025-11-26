const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL || 'file:./dev.db'
});

async function seedData() {
    console.log('🌱 Starting seed...');

    // 1. 진주 센터 생성
    const branch = await prisma.branch.upsert({
        where: { id: 'jinju-center' },
        update: {},
        create: {
            id: 'jinju-center',
            name: '파낙토스 진주센터',
            directorName: '홍길동',
            directorDesc: '국가공인 브레인트레이너 / 뇌파 분석 전문가',
            directorImg: 'https://www.panaxtos.com/img/logo.png',
            address: '경상남도 진주시 충무공동 123-45',
            mapSrc: 'https://map.kakao.com/'
        }
    });

    console.log('✅ Branch created:', branch.name);

    console.log('🎉 Seed completed!');
}

seedData()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
