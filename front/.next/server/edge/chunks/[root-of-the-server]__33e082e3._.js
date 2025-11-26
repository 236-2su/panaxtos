(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__33e082e3._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/lib/prisma.ts [app-edge-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "prisma",
    ()=>prisma
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$2f$default$2e$js__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@prisma/client/default.js [app-edge-route] (ecmascript)");
;
const globalForPrisma = /*TURBOPACK member replacement*/ __turbopack_context__.g;
const prisma = globalForPrisma.prisma || new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$2f$default$2e$js__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__["PrismaClient"]({
    log: [
        'query'
    ],
    datasourceUrl: process.env.DATABASE_URL || 'file:./dev.db'
});
if ("TURBOPACK compile-time truthy", 1) globalForPrisma.prisma = prisma;
}),
"[project]/ [app-edge-route] (unsupported edge import 'fs', ecmascript)", ((__turbopack_context__, module, exports) => {

__turbopack_context__.n(__import_unsupported(`fs`));
}),
"[project]/ [app-edge-route] (unsupported edge import 'path', ecmascript)", ((__turbopack_context__, module, exports) => {

__turbopack_context__.n(__import_unsupported(`path`));
}),
"[project]/app/api/reviews/route.ts [app-edge-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST,
    "dynamic",
    ()=>dynamic,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [app-edge-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/exports/index.js [app-edge-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/prisma.ts [app-edge-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$__$5b$app$2d$edge$2d$route$5d$__$28$unsupported__edge__import__$27$fs$272c$__ecmascript$29$__ = __turbopack_context__.i("[project]/ [app-edge-route] (unsupported edge import 'fs', ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$__$5b$app$2d$edge$2d$route$5d$__$28$unsupported__edge__import__$27$path$272c$__ecmascript$29$__ = __turbopack_context__.i("[project]/ [app-edge-route] (unsupported edge import 'path', ecmascript)");
;
const runtime = 'edge';
;
;
;
const dynamic = 'force-dynamic';
const DATA_FILE_PATH = __TURBOPACK__imported__module__$5b$project$5d2f$__$5b$app$2d$edge$2d$route$5d$__$28$unsupported__edge__import__$27$path$272c$__ecmascript$29$__["default"].join(process.cwd(), 'data', 'reviews.json');
function readJsonData() {
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$__$5b$app$2d$edge$2d$route$5d$__$28$unsupported__edge__import__$27$fs$272c$__ecmascript$29$__["default"].existsSync(DATA_FILE_PATH)) return [];
    const fileData = __TURBOPACK__imported__module__$5b$project$5d2f$__$5b$app$2d$edge$2d$route$5d$__$28$unsupported__edge__import__$27$fs$272c$__ecmascript$29$__["default"].readFileSync(DATA_FILE_PATH, 'utf-8');
    return JSON.parse(fileData);
}
function writeJsonData(data) {
    const dir = __TURBOPACK__imported__module__$5b$project$5d2f$__$5b$app$2d$edge$2d$route$5d$__$28$unsupported__edge__import__$27$path$272c$__ecmascript$29$__["default"].dirname(DATA_FILE_PATH);
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$__$5b$app$2d$edge$2d$route$5d$__$28$unsupported__edge__import__$27$fs$272c$__ecmascript$29$__["default"].existsSync(dir)) __TURBOPACK__imported__module__$5b$project$5d2f$__$5b$app$2d$edge$2d$route$5d$__$28$unsupported__edge__import__$27$fs$272c$__ecmascript$29$__["default"].mkdirSync(dir, {
        recursive: true
    });
    __TURBOPACK__imported__module__$5b$project$5d2f$__$5b$app$2d$edge$2d$route$5d$__$28$unsupported__edge__import__$27$fs$272c$__ecmascript$29$__["default"].writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2));
}
async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const branchId = searchParams.get('branchId');
        let reviews;
        try {
            reviews = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__["prisma"].review.findMany({
                where: branchId ? {
                    branchId
                } : undefined,
                orderBy: {
                    createdAt: 'desc'
                }
            });
        } catch (e) {
            console.warn('Prisma failed, falling back to JSON');
            let allData = readJsonData();
            if (branchId) {
                allData = allData.filter((r)=>r.branchId === branchId);
            }
            reviews = allData.sort((a, b)=>new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(reviews);
    } catch (error) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to fetch reviews'
        }, {
            status: 500
        });
    }
}
async function POST(request) {
    try {
        const body = await request.json();
        // 유효성 검사
        if (!body.password || body.password.length < 4) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: '비밀번호는 4자리 이상이어야 합니다.'
            }, {
                status: 400
            });
        }
        let review;
        try {
            review = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__["prisma"].review.create({
                data: body
            });
        } catch (e) {
            console.warn('Prisma failed, falling back to JSON');
            const allData = readJsonData();
            const newId = allData.length > 0 ? Math.max(...allData.map((r)=>r.id)) + 1 : 1;
            review = {
                ...body,
                id: newId,
                createdAt: new Date().toISOString()
            };
            allData.push(review);
            writeJsonData(allData);
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(review);
    } catch (error) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to create review'
        }, {
            status: 500
        });
    }
}
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__33e082e3._.js.map