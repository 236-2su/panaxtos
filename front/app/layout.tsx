import type { Metadata } from "next";
import "./globals.css";
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://panaxtos-jinju.com'), // TODO: Replace with actual domain
  title: "다온통합뇌심리센터 (파낙토스 진주점) | ADHD, 집중력, 뇌파훈련 전문",
  description: "파낙토스 진주센터는 뇌과학 기반의 뉴로피드백 훈련으로 ADHD, 학습장애, 정서불안, 불면증 등을 개선하고 뇌기능을 최적화합니다.",
  keywords: "파낙토스, 진주센터, 뉴로피드백, 뇌파훈련, ADHD, 집중력, 학습능력, 브레인트레이닝",
  openGraph: {
    title: "다온통합뇌심리센터 (파낙토스 진주점)",
    description: "과학적인 뇌파 훈련으로 두뇌 건강을 지키세요. ADHD, 집중력 강화, 정서 안정 프로그램 운영.",
    type: "website",
    locale: "ko_KR",
    siteName: "다온통합뇌심리센터",
  },
  twitter: {
    card: "summary_large_image",
    title: "다온통합뇌심리센터 (파낙토스 진주점)",
    description: "파낙토스 진주센터에서 뇌과학 기반 맞춤형 뇌 훈련을 만나보세요.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Header />
        <main className="pb-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
