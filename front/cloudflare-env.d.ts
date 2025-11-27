// Cloudflare Pages 환경 변수 타입 정의
import { D1Database } from './lib/d1';

declare module '@cloudflare/next-on-pages' {
    interface CloudflareEnv {
        DB: D1Database;
    }
}
