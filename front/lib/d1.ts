// Cloudflare D1 데이터베이스 헬퍼 함수
import { getRequestContext } from '@cloudflare/next-on-pages';

export interface D1Database {
    prepare(query: string): D1PreparedStatement;
    batch<T = unknown>(statements: D1PreparedStatement[]): Promise<D1Result<T>[]>;
    exec(query: string): Promise<D1ExecResult>;
}

export interface D1PreparedStatement {
    bind(...values: any[]): D1PreparedStatement;
    first<T = unknown>(colName?: string): Promise<T | null>;
    run<T = unknown>(): Promise<D1Result<T>>;
    all<T = unknown>(): Promise<D1Result<T>>;
}

export interface D1Result<T = unknown> {
    results?: T[];
    success: boolean;
    meta: {
        changed_db: boolean;
        changes: number;
        duration: number;
        last_row_id: number;
        rows_read: number;
        rows_written: number;
    };
}

export interface D1ExecResult {
    count: number;
    duration: number;
}

// D1 데이터베이스 인스턴스 가져오기
export function getDB(): D1Database {
    try {
        const context = getRequestContext();
        if (!context?.env?.DB) {
            throw new Error('D1 database binding not found');
        }
        return context.env.DB as D1Database;
    } catch (error) {
        console.error('[D1] Failed to get database:', error);
        throw new Error('Database connection failed');
    }
}

// 타입 정의
export interface Branch {
    id: string;
    name: string;
    directorName: string;
    directorDesc: string | null;
    directorImg: string | null;
    address: string;
    mapSrc: string | null;
    createdAt: string;
}

export interface Review {
    id: number;
    branchId: string;
    author: string;
    password: string;
    title: string | null;
    rating: number;
    comment: string;
    createdAt: string;
}

export interface Reservation {
    id: number;
    branchId: string;
    name: string;
    phone: string;
    password: string;
    dateTime: string;
    notes: string | null;
    programId: string | null;
    createdAt: string;
}
