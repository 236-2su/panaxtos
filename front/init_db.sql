-- Branch 테이블 생성
CREATE TABLE IF NOT EXISTS "Branch" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "directorName" TEXT NOT NULL,
    "directorDesc" TEXT,
    "directorImg" TEXT,
    "address" TEXT NOT NULL,
    "mapSrc" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Review 테이블 생성
CREATE TABLE IF NOT EXISTS "Review" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "branchId" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "title" TEXT,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("branchId") REFERENCES "Branch" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Reservation 테이블 생성
CREATE TABLE IF NOT EXISTS "Reservation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "branchId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "dateTime" DATETIME NOT NULL,
    "notes" TEXT,
    "programId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("branchId") REFERENCES "Branch" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- 초기 데이터 (진주점) - 중복 방지를 위해 INSERT OR IGNORE 사용
INSERT OR IGNORE INTO "Branch" ("id", "name", "directorName", "address") 
VALUES ('jinju', '진주점', '관리자', '주소 미정');
