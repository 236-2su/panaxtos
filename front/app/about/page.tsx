'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function AboutPage() {
    const [activeTab, setActiveTab] = useState('director'); // 'director' | 'center'

    return (
        <main className="min-h-screen bg-white">
            {/* Page Header */}
            <section className="relative bg-[#00305B] py-24 text-center text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('/images/center/aisle.png')] bg-cover bg-center"></div>
                <div className="relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">센터 소개</h1>
                    <p className="text-blue-100 text-lg">탁월한 전문성과 따뜻한 공간이 만나는 곳</p>
                </div>
            </section>

            {/* Tab Navigation */}
            <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
                <div className="container mx-auto px-4">
                    <div className="flex justify-center gap-8">
                        <button
                            onClick={() => setActiveTab('director')}
                            className={`py-5 text-lg font-bold border-b-4 transition-all ${activeTab === 'director'
                                    ? 'border-[#EF9300] text-[#00305B]'
                                    : 'border-transparent text-gray-400 hover:text-gray-600'
                                }`}
                        >
                            센터장 소개
                        </button>
                        <button
                            onClick={() => setActiveTab('center')}
                            className={`py-5 text-lg font-bold border-b-4 transition-all ${activeTab === 'center'
                                    ? 'border-[#EF9300] text-[#00305B]'
                                    : 'border-transparent text-gray-400 hover:text-gray-600'
                                }`}
                        >
                            센터 내부 둘러보기
                        </button>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="min-h-[600px] bg-gray-50/50">
                {/* -----------------------------------------------------------------------
                    TAB 1: CENTER DIRECTOR (풍성하게 보강됨) 
                   ----------------------------------------------------------------------- */}
                {activeTab === 'director' && (
                    <div className="animate-fade-in py-20">
                        <div className="max-w-6xl mx-auto px-4">
                            <div className="flex flex-col lg:flex-row gap-16 items-start">
                                {/* Left: Profile Image & Core Title */}
                                <div className="w-full lg:w-1/3 flex flex-col items-center lg:sticky lg:top-32">
                                    <div className="relative w-80 h-[450px] rounded-sm overflow-hidden shadow-2xl mb-8 border-[10px] border-white ring-1 ring-gray-100">
                                        <Image
                                            src="/images/profile/director.jpg"
                                            alt="김희영 센터장"
                                            fill
                                            className="object-cover"
                                            priority
                                        />
                                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pt-20 text-white">
                                            <p className="font-light text-sm opacity-90 mb-1">Center Director</p>
                                            <h3 className="text-3xl font-bold">김 희 영</h3>
                                        </div>
                                    </div>

                                    <div className="w-full text-center">
                                        <div className="inline-block px-4 py-1.5 bg-[#00305B] text-white text-sm font-bold rounded-full mb-4">
                                            뇌·정서·행동 통합 전문가
                                        </div>
                                        <p className="text-gray-600 font-medium">
                                            "과학적 데이터와 따뜻한 공감으로<br />아이와 가정의 회복을 돕습니다."
                                        </p>
                                    </div>
                                </div>

                                {/* Right: Greeting & Detailed Resume */}
                                <div className="w-full lg:w-2/3">
                                    {/* 인사말 */}
                                    <div className="mb-16">
                                        <h2 className="text-3xl font-bold text-[#00305B] mb-8 relative inline-block">
                                            인사말
                                            <span className="absolute bottom-1 left-0 w-full h-3 bg-[#EF9300]/20 -z-10"></span>
                                        </h2>
                                        <div className="space-y-6 text-gray-700 leading-relaxed text-lg text-justify bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                                            <p>
                                                안녕하세요. <strong>파낙토스 진주센터(다온통합뇌심리센터)</strong> 센터장 김희영입니다.
                                            </p>
                                            <p>
                                                반복되는 아이의 어려움으로 마음이 무거우신가요?<br />
                                                다온은 그런 부모님의 간절한 마음을 깊이 이해하며 시작되었습니다.
                                            </p>
                                            <p className="font-semibold text-[#00305B]">
                                                "정서가 안정되고 뇌가 회복될 때, 아이의 행동과 삶은 비로소 변화하기 시작합니다."
                                            </p>
                                            <p>
                                                수많은 임상 현장에서 얻은 확신입니다.
                                                저희는 아이를 억지로 훈련하지 않습니다.
                                                편안한 호흡과 즐거운 놀이를 통해 뇌가 스스로 안정과 회복을 찾도록 자연스러운 흐름을 만들어갑니다.
                                            </p>
                                            <p>
                                                그 과정 속에서 아이의 마음, 집중력, 인지 기능은 일상의 행동 변화로 이어지는
                                                '진짜 회복'을 향해 단단하게 열릴 것입니다.
                                            </p>
                                        </div>
                                    </div>

                                    {/* 상세 약력 (대폭 추가) */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {/* 학력 */}
                                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-full">
                                            <h3 className="text-xl font-bold text-[#00305B] mb-6 flex items-center gap-2">
                                                <span className="text-2xl">🎓</span> 학 무
                                            </h3>
                                            <ul className="space-y-4 text-gray-700 text-sm">
                                                <li className="flex gap-3">
                                                    <span className="font-bold min-w-16 text-[#EF9300]">박사과정</span>
                                                    <span>재활심리 박사 수료</span>
                                                </li>
                                                <li className="flex gap-3">
                                                    <span className="font-bold min-w-16 text-[#EF9300]">석사</span>
                                                    <span>사회복지학 석사</span>
                                                </li>
                                                <li className="flex gap-3">
                                                    <span className="font-bold min-w-16 text-[#EF9300]">학사</span>
                                                    <div>
                                                        <p>· 뇌기반심리상담학 학사</p>
                                                        <p>· 교육학 학사</p>
                                                        <p>· 유아교육학 학사</p>
                                                        <p>· 청소년교육학 학사</p>
                                                    </div>
                                                </li>
                                                <li className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500 italic">
                                                    교육, 재활, 복지, 뇌심리를 아우르는 통합적 학문 배경 보유
                                                </li>
                                            </ul>
                                        </div>

                                        {/* 경력 및 자격 */}
                                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-full">
                                            <h3 className="text-xl font-bold text-[#00305B] mb-6 flex items-center gap-2">
                                                <span className="text-2xl">🏆</span> 주요 경력 및 자격
                                            </h3>
                                            <ul className="space-y-3 text-gray-700 text-sm">
                                                <li className="flex items-start gap-2">
                                                    <span className="text-[#EF9300] mt-1.5 w-1.5 h-1.5 rounded-full bg-[#EF9300] block flex-shrink-0"></span>
                                                    <span className="font-bold">현) 다온심리상담연구소 소장</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-[#EF9300] mt-1.5 w-1.5 h-1.5 rounded-full bg-[#EF9300] block flex-shrink-0"></span>
                                                    <span className="font-bold">현) 파낙토스 통합뇌센터 진주센터장</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-[#EF9300] mt-1.5 w-1.5 h-1.5 rounded-full bg-[#EF9300] block flex-shrink-0"></span>
                                                    <span>한국미술치료상담학회 교수위원</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-[#EF9300] mt-1.5 w-1.5 h-1.5 rounded-full bg-[#EF9300] block flex-shrink-0"></span>
                                                    <span>국가공인 브레인트레이너</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-[#EF9300] mt-1.5 w-1.5 h-1.5 rounded-full bg-[#EF9300] block flex-shrink-0"></span>
                                                    <span>보건복지부 등록 발달재활서비스 제공인력</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-[#EF9300] mt-1.5 w-1.5 h-1.5 rounded-full bg-[#EF9300] block flex-shrink-0"></span>
                                                    <span>두뇌기능분석 전문가</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    {/* 전문 분야 */}
                                    <div className="mt-12">
                                        <h3 className="text-xl font-bold text-[#00305B] mb-6">전문 상담 분야</h3>
                                        <div className="flex flex-wrap gap-3">
                                            {['뇌기반 정서조절', 'ADHD/학습장애', '발달재활', '부모교육', '성인 직무스트레스', '트라우마 회복'].map((tag, i) => (
                                                <span key={i} className="px-4 py-2 bg-white border border-gray-200 rounded-full text-gray-600 text-sm font-medium shadow-sm">
                                                    # {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}


                {/* -----------------------------------------------------------------------
                    TAB 2: CENTER TOUR (모든 이미지 활용)
                   ----------------------------------------------------------------------- */}
                {activeTab === 'center' && (
                    <div className="animate-fade-in pb-20">
                        {/* Zone 1: Welcome & Lounge */}
                        <section className="py-20 bg-white">
                            <div className="max-w-6xl mx-auto px-4">
                                <div className="text-center mb-12">
                                    <span className="text-[#EF9300] font-bold text-sm tracking-widest uppercase">Zone 01</span>
                                    <h2 className="text-3xl font-bold text-[#00305B] mt-2">맞이함과 휴식의 공간</h2>
                                    <p className="text-gray-500 mt-2">편안한 마음으로 방문하실 수 있는 로비와 대기실입니다.</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <div className="aspect-[4/3] relative rounded-xl overflow-hidden shadow-md group">
                                        <Image src="/images/center/counter.png" alt="안내 데스크" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                                        <div className="absolute bottom-0 left-0 bg-white/90 px-4 py-2 m-4 rounded-lg text-sm font-bold shadow-sm">안내 데스크</div>
                                    </div>
                                    <div className="aspect-[4/3] relative rounded-xl overflow-hidden shadow-md group">
                                        <Image src="/images/center/living_room.png" alt="메인 대기실" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                                        <div className="absolute bottom-0 left-0 bg-white/90 px-4 py-2 m-4 rounded-lg text-sm font-bold shadow-sm">메인 라운지</div>
                                    </div>
                                    <div className="aspect-[4/3] relative rounded-xl overflow-hidden shadow-md group">
                                        <Image src="/images/center/table.png" alt="휴게 공간" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                                        <div className="absolute bottom-0 left-0 bg-white/90 px-4 py-2 m-4 rounded-lg text-sm font-bold shadow-sm">카페테리아 & 휴게</div>
                                    </div>
                                    <div className="aspect-[4/3] relative rounded-xl overflow-hidden shadow-md group lg:col-span-3 h-64 md:h-80">
                                        <Image src="/images/center/aisle.png" alt="복도 전경" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                                        <div className="absolute bottom-0 left-0 bg-white/90 px-4 py-2 m-4 rounded-lg text-sm font-bold shadow-sm">치유로 이어지는 복도</div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Zone 2: Professional Care */}
                        <section className="py-20 bg-gray-50">
                            <div className="max-w-6xl mx-auto px-4">
                                <div className="text-center mb-12">
                                    <span className="text-[#EF9300] font-bold text-sm tracking-widest uppercase">Zone 02</span>
                                    <h2 className="text-3xl font-bold text-[#00305B] mt-2">상담 및 검사 공간</h2>
                                    <p className="text-gray-500 mt-2">전문적인 검사와 심도 깊은 상담이 이루어집니다.</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="bg-white p-4 rounded-2xl shadow-sm">
                                        <div className="aspect-video relative rounded-xl overflow-hidden mb-4 group">
                                            <Image src="/images/center/counsel_room.png" alt="제1상담실" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                                        </div>
                                        <h3 className="text-lg font-bold text-[#00305B]">제1상담실</h3>
                                        <p className="text-sm text-gray-500">편안하고 프라이빗한 분위기에서 깊이 있는 대화를 나눕니다.</p>
                                    </div>
                                    <div className="bg-white p-4 rounded-2xl shadow-sm">
                                        <div className="aspect-video relative rounded-xl overflow-hidden mb-4 group">
                                            <Image src="/images/center/analyze_room.png" alt="뇌파 검사실" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                                        </div>
                                        <h3 className="text-lg font-bold text-[#00305B]">뇌파 검사실</h3>
                                        <p className="text-sm text-gray-500">최신 장비를 통해 정밀한 두뇌 기능 분석을 진행합니다.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Zone 3: Training & Therapy */}
                        <section className="py-20 bg-white">
                            <div className="max-w-6xl mx-auto px-4">
                                <div className="text-center mb-12">
                                    <span className="text-[#EF9300] font-bold text-sm tracking-widest uppercase">Zone 03</span>
                                    <h2 className="text-3xl font-bold text-[#00305B] mt-2">훈련 및 치료 공간</h2>
                                    <p className="text-gray-500 mt-2">다양한 프로그램이 진행되는 특화 공간입니다.</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <div className="aspect-square relative rounded-xl overflow-hidden shadow-md group">
                                        <Image src="/images/center/play_room.png" alt="놀이치료실" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white translate-y-2 group-hover:translate-y-0 transition-transform">
                                            <p className="font-bold text-lg">놀이치료실</p>
                                            <p className="text-xs opacity-80 mt-1">아이들을 위한 즐거운 공간</p>
                                        </div>
                                    </div>
                                    <div className="aspect-square relative rounded-xl overflow-hidden shadow-md group">
                                        <Image src="/images/center/room.png" alt="개별 훈련실" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white translate-y-2 group-hover:translate-y-0 transition-transform">
                                            <p className="font-bold text-lg">집중 훈련실</p>
                                            <p className="text-xs opacity-80 mt-1">몰입도를 높이는 환경</p>
                                        </div>
                                    </div>
                                    <div className="aspect-square relative rounded-xl overflow-hidden shadow-md group">
                                        {/* Another angle of counsel or play room if available, reusing counsel room 1 style for variety */}
                                        <Image src="/images/center/counsel_room1.png" alt="다목적실" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white translate-y-2 group-hover:translate-y-0 transition-transform">
                                            <p className="font-bold text-lg">다목적 치료실</p>
                                            <p className="text-xs opacity-80 mt-1">다양한 활동이 가능한 공간</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                )}
            </div>
        </main>
    );
}
