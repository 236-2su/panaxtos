'use client';

export default function LocationPage() {
    return (
        <div className="min-h-screen py-16 px-4" style={{ background: 'var(--bg-main)' }}>
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-main)' }}>
                        오시는 길
                    </h1>
                    <p className="text-xl" style={{ color: 'var(--text-secondary)' }}>
                        파낙토스 진주센터로 오시는 방법을 안내해 드립니다.
                    </p>
                </div>

                {/* 지도 영역 (더미) */}
                <div className="w-full h-96 rounded-2xl mb-12 flex items-center justify-center bg-gray-200">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-gray-500 mb-2">지도 영역</p>
                        <p className="text-gray-400">카카오맵/네이버맵 API 연동 필요</p>
                        <a
                            href="https://map.kakao.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                        >
                            카카오맵에서 보기 (임시 링크)
                        </a>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-8 rounded-2xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: 'var(--text-main)' }}>
                            <span>📍</span> 주소
                        </h3>
                        <p className="text-lg mb-2" style={{ color: 'var(--text-main)' }}>
                            경상남도 진주시 충무공동 123-45
                        </p>
                        <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
                            (진주혁신도시 LH 본사 맞은편 건물 3층)
                        </p>
                    </div>

                    <div className="p-8 rounded-2xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: 'var(--text-main)' }}>
                            <span>📞</span> 연락처
                        </h3>
                        <p className="text-lg mb-2" style={{ color: 'var(--text-main)' }}>
                            055-123-4567
                        </p>
                        <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
                            상담 가능 시간: 평일 10:00 - 19:00
                        </p>
                    </div>

                    <div className="p-8 rounded-2xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: 'var(--text-main)' }}>
                            <span>🚗</span> 주차 안내
                        </h3>
                        <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
                            건물 지하 주차장을 이용하실 수 있습니다.<br />
                            (상담 및 훈련 고객 2시간 무료 주차권 제공)
                        </p>
                    </div>

                    <div className="p-8 rounded-2xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: 'var(--text-main)' }}>
                            <span>🚌</span> 대중교통
                        </h3>
                        <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
                            LH 본사 정류장 하차 후 도보 3분<br />
                            (버스 노선: 100, 150, 200번 등)
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
