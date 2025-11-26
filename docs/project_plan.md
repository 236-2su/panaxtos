# Panaxtos 지사 홈페이지 프로젝트 계획

## 1️⃣ 목표
- 기존 https://www.panaxtos.com/ 와 동일한 레이아웃·디자인 유지
- 기존 사이트에서 텍스트·이미지 스크래핑 후 DB에 저장
- 후기(리뷰)와 예약 기능을 **CRUD** 로 제공
- 관리자 전용 페이지에서 후기·예약·사이트 콘텐츠 관리
- 무료 인프라 **Cloudflare Pages + Workers + D1** 로 배포

## 2️⃣ 전체 아키텍처
```
+-------------------+          +-------------------+          +-------------------+
| Cloudflare Pages | <---->  | Front (Next.js)   | <---->  | Cloudflare Workers |
| (static/SSR)    |          | /front            |          | (Java)             |
+-------------------+          +-------------------+          +-------------------+
        |   ^                         |
        |   |                         |
        v   |                         v
+-------------------+          +-------------------+
| Cloudflare D1    | <---->   | Spring Boot API   |
| (SQLite‑compatible)        | (backend)        |
+-------------------+          +-------------------+
```

## 3️⃣ 주요 컴포넌트 & 파일
| 영역 | 파일/디렉터리 | 설명 |
|------|----------------|------|
| **프론트** | `front/` | 기존 Next.js 프로젝트 전체. 디자인 토큰(`front/styles/tokens.css`) 추가. |
| **백엔드** | `backend/` | Spring Boot 기본 설정, 엔티티·레포지토리·컨트롤러. |
| **DB** | Cloudflare **D1** | 무료 SQLite‑compatible DB (10 MB). 후기·예약·사이트 콘텐츠 저장. |
| **스크래핑** | `scripts/scrape.js` | Node 스크립트 – https://www.panaxtos.com/ 로부터 텍스트·이미지 추출 → `front/public/data/site.json`. |
| **인증** | `backend/src/main/java/com/panaxtos/security/` | JWT 발급·검증, 관리자 전용 라우트 보호. |
| **배포** | Cloudflare Pages (프론트) + Workers (백엔드) | `wrangler.toml` 로 Workers 배포, Pages 빌드 커맨드 `npm run build`. |

## 4️⃣ 구현 로드맵 (시간 추정)
| 단계 | 내용 | 예상 시간 |
|------|------|------------|
| 0️⃣ 준비 | 레포 초기화·디렉터리 정리 | 0.5 h |
| 1️⃣ 프론트 리디자인 | 기존 UI 유지 + 디자인 토큰·다크모드 추가 | 2 h |
| 2️⃣ 스크래핑 스크립트 | `scripts/scrape.js` 구현·실행 | 1 h |
| 3️⃣ 백엔드 기본 설정 | SpringBoot 애플리케이션, D1 연동 설정 | 2 h |
| 4️⃣ 엔티티·레포지토리 | `Review`, `Reservation`, `SiteContent` 정의 | 2 h |
| 5️⃣ CRUD API | 컨트롤러·DTO·Validation 구현 | 3 h |
| 6️⃣ 인증·권한 | JWT 로그인·관리자 보호 | 2 h |
| 7️⃣ 프론트 API 연동 | `useSWR`/`react-query` 로 리뷰·예약 UI 연결 | 3 h |
| 8️⃣ D1 설정 | Cloudflare 대시보드 → D1 DB 생성·연결 | 1 h |
| 9️⃣ 배포 파이프라인 | Pages + Workers CI/CD (GitHub Actions) | 2 h |
| 🔟 테스트 & QA | 로컬 + Cloudflare 배포 테스트, Lighthouse ≥90 | 2 h |
| 📦 최종 릴리즈 | 도메인 연결·SSL·모니터링 | 0.5 h |

**총 예상 소요**: 약 **20‑30 시간** (한 명 개발자 기준).

## 5️⃣ Cloudflare 무료 DB 옵션
| 옵션 | 무료 한도 | 권장 사용 | 비고 |
|------|-----------|-----------|------|
| **Cloudflare D1** | 10 MB 스토리지, 5 M 쿼리/월 | ★추천★ | SQLite‑compatible, Workers와 바로 연동. |
| Workers KV | 1 GB, 1 KB 이하 값 | 캐시용 | 구조화된 CRUD에 부적합. |
| Supabase (Free) | 500 MB, 2 M 쿼리/월 | 가능하지만 별도 서비스 | CORS 설정 필요. |
| FaunaDB (Free) | 5 GB, 100 k 쿼리/월 | 가능하지만 HTTP API 필요 | 별도 인증 필요. |

## 6️⃣ 보안·운영 체크리스트
- HTTPS (Cloudflare 자동 TLS) 
- CORS 설정 (Workers → `Access-Control-Allow-Origin: *` 혹은 도메인 지정) 
- Rate‑limit (Cloudflare Rate Limiting) 
- 환경변수: `WRANGLER_D1_DATABASE_ID`, `ADMIN_PASSWORD_HASH` 등은 Cloudflare UI에 저장 
- D1 백업 (주 1회 Export) 
- 로그 모니터링 (`wrangler tail`) 

## 7️⃣ 마일스톤
| 마일스톤 | 목표 |
|----------|------|
| M1 – 프로젝트 초기화 | 레포·디렉터리 정리, GitHub 연결 |
| M2 – UI·스크래핑 | 기존 디자인 유지, 스크래핑 스크립트 완성 |
| M3 – DB·API 구현 | D1 스키마, CRUD API, JWT 인증 |
| M4 – 프론트 연동 | 리뷰·예약 UI + 관리자 페이지 |
| M5 – 배포 자동화 | Pages + Workers CI/CD 설정 |
| M6 – QA·퍼포먼스 | Lighthouse ≥90, 보안 점검 |
| M7 – 런칭 | 도메인 연결·모니터링 |

---

**다음 작업**
1. `docs/project_plan.md` 파일을 확인하고 필요 시 수정합니다.
2. GitHub 레포에 푸시 → Cloudflare Pages/Workers 연동을 시작합니다.
3. D1 DB 생성 후 `wrangler.toml`에 바인딩을 추가합니다.

> 언제든 추가 파일(스크래핑 스크립트, 백엔드 엔티티, 관리자 UI 등) 요청해 주세요. 바로 생성해 드리겠습니다! 🚀
