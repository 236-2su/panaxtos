import type { Metadata } from "next";
import "./globals.css";
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import FloatingSidebar from '@/components/common/FloatingSidebar'

export const metadata: Metadata = {
  title: "뇌과학 1위 기업 파낙토스",
  description: "뇌과학 1위 기업 파낙토스",
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
        <FloatingSidebar />
      </body>
    </html>
  );
}
