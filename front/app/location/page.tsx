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
                {/* 지도 영역 */}
                {/* 지도 영역 */}
                {/* 지도 영역 */}
                <div className="w-full h-96 rounded-2xl mb-12 overflow-hidden relative shadow-lg bg-gray-100 border border-gray-200">
                    {/* 카카오맵 정적 지도 이미지 (API 키 없이 가장 확실한 방법) */}
                    {/* 좌표: 35.165487, 128.057398 (진주시 순환로 529) */}
                    <a
                        href="https://map.kakao.com/?q=%ED%8C%8C%EB%82%99%ED%86%A0%EC%8A%A4IBC%ED%86%B5%ED%95%A9%EB%87%8C%EC%84%BC%ED%84%B0%20%EC%A7%84%EC%A3%BC%EC%84%BC%ED%84%B0"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full h-full"
                    >
                        <iframe
                            src="https://map.kakao.com/?q=%ED%8C%8C%EB%82%99%ED%86%A0%EC%8A%A4IBC%ED%86%B5%ED%95%A9%EB%87%8C%EC%84%BC%ED%84%B0%20%EC%A7%84%EC%A3%BC%EC%84%BC%ED%84%B0"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            title="파낙토스 진주센터 지도"
                        ></iframe>
                        {/* Iframe이 차단될 경우를 대비한 클릭 유도 오버레이 */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/5 hover:bg-black/0 transition-colors pointer-events-none">
                        </div>
                    </a>

                    {/* 지도 위 오버레이 버튼 (바로가기) */}
                    <div className="absolute bottom-4 right-4 z-10 pointer-events-auto">
                        <a
                            href="https://map.kakao.com/?q=%ED%8C%8C%EB%82%99%ED%86%A0%EC%8A%A4IBC%ED%86%B5%ED%95%A9%EB%87%8C%EC%84%BC%ED%84%B0%20%EC%A7%84%EC%A3%BC%EC%84%BC%ED%84%B0"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition-transform"
                            style={{ background: '#FEE500', color: '#191919' }}
                        >
                            <span>📍 카카오맵으로 길찾기</span>
                        </a>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-8 rounded-2xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: 'var(--text-main)' }}>
                            <span>📍</span> 주소
                        </h3>
                        <p className="text-lg mb-2" style={{ color: 'var(--text-main)' }}>
                            경남 진주시 순환로 529, 영성빌딩 501호
                        </p>
                        <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
                            (카카오맵/네이버 지도 '파낙토스 진주센터' 검색)
                        </p>
                    </div>

                    <div className="p-8 rounded-2xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: 'var(--text-main)' }}>
                            <span>📞</span> 연락처
                        </h3>
                        <p className="text-lg mb-2" style={{ color: 'var(--text-main)' }}>
                            055-920-2937
                        </p>
                        <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
                            평일 10:00 - 19:00 (점심시간 12:00 ~ 13:30)<br />
                            일요일, 월요일, 공휴일 휴무
                        </p>
                    </div>

                    <div className="p-8 rounded-2xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: 'var(--text-main)' }}>
                            <span>🚗</span> 주차 안내
                        </h3>
                        <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
                            건물 옆 유료 주차장을 이용하실 수 있습니다.
                        </p>
                    </div>

                    <div className="p-8 rounded-2xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: 'var(--text-main)' }}>
                            <span>🚌</span> 대중교통
                        </h3>
                        <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
                            평거동 10호광장, 탑마트 정류장 하차
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
