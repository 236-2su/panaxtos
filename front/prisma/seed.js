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
            id: 'jinju', // ID를 'jinju'로 통일 (코드에서 jinju 사용중)
            name: '파낙토스 진주센터',
            directorName: '김희영',
            directorDesc: '파낙토스 통합뇌센터 진주점 대표 / 국가공인 브레인트레이너',
            directorImg: '/images/profile/director.jpg',
            address: '경남 진주시 순환로 529, 영성빌딩 501호',
            mapSrc: 'https://map.naver.com/v5/search/파낙토스진주센터'
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
