'use client';

import Link from 'next/link';

export default function FloatingSidebar() {
    return (
        <>
            {/* 플로팅 버튼 */}
            <div className="fixed right-6 bottom-6 z-50 flex flex-col gap-3">
                {/* 상담 예약 */}
                <Link
                    href="/reservation"
                    className="flex items-center justify-center w-16 h-16 rounded-full shadow-2xl hover:scale-110 transition-all"
                    style={{ background: '#EF9300', color: 'white' }}
                    title="상담 예약"
                >
                    <span className="text-2xl">📅</span>
                </Link>

                {/* 오시는 길 */}
                <Link
                    href="/location"
                    className="flex items-center justify-center w-16 h-16 rounded-full shadow-2xl hover:scale-110 transition-all"
                    style={{ background: '#34A853', color: 'white' }}
                    title="오시는 길"
                >
                    <span className="text-2xl">📍</span>
                </Link>

                {/* 전화 문의 */}
                <a
                    href="tel:055-920-2937"
                    className="flex items-center justify-center w-16 h-16 rounded-full shadow-2xl hover:scale-110 transition-all"
                    style={{ background: '#007BFF', color: 'white' }}
                    title="전화 문의"
                >
                    <span className="text-2xl">📞</span>
                </a>

                {/* AS 신청 */}
                <a
                    href="https://www.panaxtos.com/m_view.php?mk=cust_notice&ps_boid=277"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-16 h-16 rounded-full shadow-2xl hover:scale-110 transition-all"
                    style={{ background: '#5865F2', color: 'white' }}
                    title="AS 신청"
                >
                    <span className="text-2xl">🔧</span>
                </a>

                {/* 프로그램 다운로드 */}
                <a
                    href="https://www.panaxtos.com/m_board.php?mk=cust_download&ps_db=&"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-16 h-16 rounded-full shadow-2xl hover:scale-110 transition-all"
                    style={{ background: '#9333EA', color: 'white' }}
                    title="프로그램 다운로드"
                >
                    <span className="text-2xl">💾</span>
                </a>
            </div>
        </>
    );
}
