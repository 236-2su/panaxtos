import type { Metadata } from "next";
import "./globals.css";
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'

export const metadata: Metadata = {
  title: "파낙토스 통합뇌센터 진주점 | ADHD, 집중력, 뇌파훈련 전문",
  description: "파낙토스 진주센터는 뇌과학 기반의 뉴로피드백 훈련으로 ADHD, 학습장애, 정서불안, 불면증 등을 개선하고 뇌기능을 최적화합니다.",
  keywords: "파낙토스, 진주센터, 뉴로피드백, 뇌파훈련, ADHD, 집중력, 학습능력, 브레인트레이닝",
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
        <div className="default-container pb-20">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
