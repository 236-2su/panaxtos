import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';
import { prisma } from '@/lib/prisma';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'reviews.json');

function readJsonData() {
    if (!fs.existsSync(DATA_FILE_PATH)) return [];
    const fileData = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
    return JSON.parse(fileData);
}

function writeJsonData(data: any[]) {
    const dir = path.dirname(DATA_FILE_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2));
}

// GET /api/reviews
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const branchId = searchParams.get('branchId');

        let reviews;
        try {
            reviews = await prisma.review.findMany({
                where: branchId ? { branchId } : undefined,
                orderBy: { createdAt: 'desc' }
            });
        } catch (e) {
            console.warn('Prisma failed, falling back to JSON');
            let allData = readJsonData();
            if (branchId) {
                allData = allData.filter((r: any) => r.branchId === branchId);
            }
            reviews = allData.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }

        return NextResponse.json(reviews);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch reviews' },
            { status: 500 }
        );
    }
}

// POST /api/reviews - 누구나 작성 가능
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // 유효성 검사
        if (!body.password || body.password.length < 4) {
            return NextResponse.json({ error: '비밀번호는 4자리 이상이어야 합니다.' }, { status: 400 });
        }

        let review;
        try {
            review = await prisma.review.create({ data: body });
        } catch (e) {
            console.warn('Prisma failed, falling back to JSON');
            const allData = readJsonData();
            const newId = allData.length > 0 ? Math.max(...allData.map((r: any) => r.id)) + 1 : 1;
            review = { ...body, id: newId, createdAt: new Date().toISOString() };
            allData.push(review);
            writeJsonData(allData);
        }

        return NextResponse.json(review);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to create review' },
            { status: 500 }
        );
    }
}
