import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';
import { prisma } from '@/lib/prisma';
import { getTokenFromRequest, verifyToken } from '@/lib/jwt';
import fs from 'fs';
import path from 'path';

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'reservations.json');

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

// GET /api/reservations/[id] - 관리자만 (상세 정보)
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const token = getTokenFromRequest(request.headers.get('authorization'));
        if (!token || !verifyToken(token)) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        let reservation;
        try {
            reservation = await prisma.reservation.findUnique({
                where: { id: parseInt(id) }
            });
        } catch (e) {
            console.warn('Prisma failed, falling back to JSON');
            const allData = readJsonData();
            reservation = allData.find((r: any) => r.id === parseInt(id));
        }

        if (!reservation) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }

        return NextResponse.json(reservation);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch reservation' },
            { status: 500 }
        );
    }
}

// PUT /api/reservations/[id] - 관리자 또는 비밀번호 일치 시
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const body = await request.json();
        const token = getTokenFromRequest(request.headers.get('authorization'));
        const isAdmin = token && verifyToken(token);
        const password = body.password; // 요청 바디에서 비밀번호 확인

        let reservation;
        let isPasswordCorrect = false;

        // 1. 기존 예약 조회
        try {
            reservation = await prisma.reservation.findUnique({ where: { id: parseInt(id) } });
        } catch (e) {
            const allData = readJsonData();
            reservation = allData.find((r: any) => r.id === parseInt(id));
        }

        if (!reservation) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }

        // 2. 권한 확인 (관리자 또는 비밀번호 일치)
        if (isAdmin) {
            isPasswordCorrect = true;
        } else {
            if (password && reservation.password === password) {
                isPasswordCorrect = true;
            }
        }

        if (!isPasswordCorrect) {
            return NextResponse.json({ error: '비밀번호가 일치하지 않습니다.' }, { status: 403 });
        }

        // 3. 업데이트
        try {
            // 비밀번호는 업데이트하지 않거나, 새 비밀번호가 있으면 업데이트 (여기서는 제외)
            const { password: _, ...updateData } = body;
            reservation = await prisma.reservation.update({
                where: { id: parseInt(id) },
                data: updateData
            });
        } catch (e) {
            console.warn('Prisma failed, falling back to JSON');
            const allData = readJsonData();
            const index = allData.findIndex((r: any) => r.id === parseInt(id));
            if (index !== -1) {
                // 기존 데이터에 새 데이터 병합 (비밀번호 유지)
                allData[index] = { ...allData[index], ...body, password: allData[index].password };
                writeJsonData(allData);
                reservation = allData[index];
            }
        }

        return NextResponse.json(reservation);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to update reservation' },
            { status: 500 }
        );
    }
}

// DELETE /api/reservations/[id] - 관리자 또는 비밀번호 일치 시
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        // DELETE 요청은 body를 가질 수 있지만, 일부 클라이언트는 지원하지 않을 수 있음.
        // 여기서는 헤더나 query param으로 비밀번호를 받을 수도 있지만, 
        // Next.js에서는 Request body를 읽을 수 있음.
        let password = '';
        try {
            const body = await request.json();
            password = body.password;
        } catch (e) {
            // Body가 없는 경우 (관리자 삭제 등)
        }

        const token = getTokenFromRequest(request.headers.get('authorization'));
        const isAdmin = token && verifyToken(token);

        let reservation;
        let isPasswordCorrect = false;

        // 1. 기존 예약 조회 (비밀번호 확인용)
        try {
            reservation = await prisma.reservation.findUnique({ where: { id: parseInt(id) } });
        } catch (e) {
            const allData = readJsonData();
            reservation = allData.find((r: any) => r.id === parseInt(id));
        }

        if (!reservation) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }

        // 2. 권한 확인
        if (isAdmin) {
            isPasswordCorrect = true;
        } else {
            if (password && reservation.password === password) {
                isPasswordCorrect = true;
            }
        }

        if (!isPasswordCorrect) {
            return NextResponse.json({ error: '비밀번호가 일치하지 않습니다.' }, { status: 403 });
        }

        // 3. 삭제
        try {
            await prisma.reservation.delete({ where: { id: parseInt(id) } });
        } catch (e) {
            console.warn('Prisma failed, falling back to JSON');
            const allData = readJsonData();
            const newData = allData.filter((r: any) => r.id !== parseInt(id));
            writeJsonData(newData);
        }

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to delete reservation' },
            { status: 500 }
        );
    }
}
