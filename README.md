# 파낙토스 진주센터 웹사이트

뇌과학 기반 두뇌 훈련 전문 센터인 파낙토스 진주센터의 공식 웹사이트입니다.

## 🚀 기술 스택

- **Frontend & Backend**: Next.js 15 (App Router + API Routes)
- **Database**: SQLite (로컬) / Cloudflare D1 (프로덕션)
- **ORM**: Prisma
- **인증**: JWT
- **스타일링**: CSS Variables + Tailwind Classes
- **배포**: Cloudflare Pages (무료)

## 📦 설치 및 실행

### 1. 패키지 설치
```bash
cd front
npm install
```

### 2. 환경 변수 설정
`.env.local` 파일이 자동 생성되어 있습니다. 필요시 수정:
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secret-key"
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="PanaxtosJinju2024!"
```

### 3. 데이터베이스 초기화
```bash
npx prisma db push
node prisma/seed.js
```

### 4. 개발 서버 실행
```bash
npm run dev
```

이제 http://localhost:3000 에서 사이트를 확인할 수 있습니다.

## 🔐 관리자 계정

- **ID**: `admin`
- **PW**: `PanaxtosJinju2024!`

관리자 로그인: http://localhost:3000/login

## 📂 프로젝트 구조

```
front/
├── app/                  # Next.js App Router
│   ├── api/             # API Routes (백엔드)
│   │   ├── auth/       # 로그인
│   │   ├── branches/   # 지사 관리
│   │   ├── reviews/    # 후기 관리
│   │   └── reservations/ # 예약 관리
│   ├── admin/          # 관리자 페이지
│   ├── about/          # 센터 소개
│   ├── programs/       # 프로그램 안내
│   ├── reviews/        # 훈련 후기
│   ├── reservation/    # 상담 예약
│   ├── location/       # 오시는 길
│   └── login/          # 로그인
├── components/         # React 컴포넌트
├── hooks/              # Custom Hooks (SWR)
├── lib/                # 유틸리티 (JWT, Prisma)
├── prisma/             # Prisma 스키마 & Seed
└── public/             # 정적 파일

scripts/                # 테스트 스크립트
```

## 🎯 주요 기능

### 사용자
- ✅ 센터 소개 및 프로그램 안내
- ✅ 훈련 후기 조회
- ✅ 상담 예약
- ✅ 오시는 길 (지도)

### 관리자
- ✅ 로그인 (JWT)
- ✅ 예약 목록 조회/관리
- ✅ 훈련 후기 작성/수정/삭제
- ✅ 지사 정보 관리

## 🧪 테스트

API 테스트:
```bash
node scripts/test-nextjs-api.js
```

## 🌐 배포 (Cloudflare Pages)

### 1. Cloudflare Pages 연결
1. GitHub 레포지토리 생성 및 push
2. Cloudflare Pages에서 프로젝트 연결
3. Build 설정:
   - Build command: `cd front &&  npm install && npx prisma generate && npm run build`
   - Build output directory: `front/.next`
   - Root directory: `/`

### 2. 환경 변수 설정 (Cloudflare)
Cloudflare Pages 설정에서 추가:
```
JWT_SECRET=your-production-secret
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-production-password
```

### 3. D1 데이터베이스 연결
```bash
cd front
npx wrangler d1 create panaxtos-db
npx prisma db push
```

## 📝 License

이 프로젝트는 파낙토스 진주센터의 공식 웹사이트입니다.

## 🤝 Contact

- 전화: 055-123-4567
- 주소: 경상남도 진주시
