import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getTokenFromRequest, verifyToken } from '@/lib/jwt';
import fs from 'fs';
import path from 'path';

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

// GET /api/reviews/[id]
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        let review;
        try {
            review = await prisma.review.findUnique({
                where: { id: parseInt(id) }
            });
        } catch (e) {
            console.warn('Prisma failed, falling back to JSON');
            const allData = readJsonData();
            review = allData.find((r: any) => r.id === parseInt(id));
        }

        if (!review) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }
        return NextResponse.json(review);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch review' }, { status: 500 });
    }
}

// PUT /api/reviews/[id] - user edit with password verification
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const body = await request.json();
        // Expect password field for verification
        if (!body.password) {
            return NextResponse.json({ error: 'Password required' }, { status: 400 });
        }
        // Fetch existing review to compare password
        let existingReview;
        try {
            existingReview = await prisma.review.findUnique({ where: { id: parseInt(id) } });
        } catch (e) {
            console.warn('Prisma failed, falling back to JSON');
            const allData = readJsonData();
            existingReview = allData.find((r: any) => r.id === parseInt(id));
        }
        if (!existingReview) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }
        if (existingReview.password !== body.password) {
            return NextResponse.json({ error: 'Incorrect password' }, { status: 403 });
        }
        // Remove password from update payload to avoid overwriting it unintentionally
        const { password, ...updateData } = body;
        let review;
        try {
            review = await prisma.review.update({
                where: { id: parseInt(id) },
                data: updateData,
            });
        } catch (e) {
            console.warn('Prisma failed, falling back to JSON');
            const allData = readJsonData();
            const index = allData.findIndex((r: any) => r.id === parseInt(id));
            if (index !== -1) {
                allData[index] = { ...allData[index], ...updateData };
                writeJsonData(allData);
                review = allData[index];
            }
        }
        return NextResponse.json(review);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update review' }, { status: 500 });
    }
}

// DELETE /api/reviews/[id] - user delete with password verification
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const body = await request.json();
        if (!body.password) {
            return NextResponse.json({ error: 'Password required' }, { status: 400 });
        }
        // Fetch existing review to verify password
        let existingReview;
        try {
            existingReview = await prisma.review.findUnique({ where: { id: parseInt(id) } });
        } catch (e) {
            console.warn('Prisma failed, falling back to JSON');
            const allData = readJsonData();
            existingReview = allData.find((r: any) => r.id === parseInt(id));
        }
        if (!existingReview) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }
        if (existingReview.password !== body.password) {
            return NextResponse.json({ error: 'Incorrect password' }, { status: 403 });
        }
        // Perform deletion
        try {
            await prisma.review.delete({ where: { id: parseInt(id) } });
        } catch (e) {
            console.warn('Prisma failed, falling back to JSON');
            const allData = readJsonData();
            const newData = allData.filter((r: any) => r.id !== parseInt(id));
            writeJsonData(newData);
        }
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 });
    }
}
