import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';
import { prisma } from '@/lib/prisma';
import { getTokenFromRequest, verifyToken } from '@/lib/jwt';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'reservations.json');

// Helper to read/write JSON for local dev fallback
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

// GET /api/reservations - 공개 (미래 예약만, 개인정보 마스킹)
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const branchId = searchParams.get('branchId');
        const isAdmin = searchParams.get('admin') === 'true'; // 관리자 모드 확인

        // 관리자 요청인 경우 토큰 확인
        if (isAdmin) {
            const token = getTokenFromRequest(request.headers.get('authorization'));
            if (!token || !verifyToken(token)) {
                return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
            }
        }

        let reservations;
        try {
            // Prisma 시도
            reservations = await prisma.reservation.findMany({
                where: {
                    ...(branchId ? { branchId } : {}),
                    // ...(isAdmin ? {} : { dateTime: { gte: new Date() } }) // 날짜 필터링 잠시 해제
                },
                orderBy: { dateTime: 'asc' }
            });
        } catch (e) {
            // Prisma 실패 시 JSON 파일 폴백
            console.warn('Prisma failed, falling back to JSON file');
            let allData = readJsonData();
            const now = new Date();
            reservations = allData.filter((r: any) => {
                const rDate = new Date(r.dateTime);
                const branchMatch = branchId ? r.branchId === branchId : true;
                // const timeMatch = isAdmin ? true : rDate >= now; // 날짜 필터링 잠시 해제
                return branchMatch; // && timeMatch;
            }).sort((a: any, b: any) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());
        }

        // 일반 사용자에게는 민감 정보 마스킹
        if (!isAdmin) {
            reservations = reservations.map((r: any) => ({
                id: r.id,
                branchId: r.branchId,
                name: r.name.length > 1 ? r.name[0] + '*' + r.name.slice(2) : r.name, // 홍*동
                dateTime: r.dateTime,
                programId: r.programId,
                // phone, notes, password 제외
            }));
        }

        return NextResponse.json(reservations);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: 'Failed to fetch reservations' },
            { status: 500 }
        );
    }
}

// POST /api/reservations - 예약 생성 (비밀번호 필수)
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // 유효성 검사
        if (!body.password || body.password.length < 4) {
            return NextResponse.json({ error: '비밀번호는 4자리 이상이어야 합니다.' }, { status: 400 });
        }

        let reservation;
        try {
            reservation = await prisma.reservation.create({ data: body });
        } catch (e) {
            console.warn('Prisma failed, falling back to JSON file');
            const allData = readJsonData();
            const newId = allData.length > 0 ? Math.max(...allData.map((r: any) => r.id)) + 1 : 1;
            reservation = { ...body, id: newId, createdAt: new Date().toISOString() };
            allData.push(reservation);
            writeJsonData(allData);
        }

        return NextResponse.json(reservation);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: 'Failed to create reservation' },
            { status: 500 }
        );
    }
}
