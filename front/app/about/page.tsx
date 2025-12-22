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
                    TAB 1: CENTER DIRECTOR - RESTRUCTURED
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
                                        <p className="text-gray-600 font-medium leading-relaxed">
                                            "과학적 데이터와 따뜻한 공감으로<br />아이와 가정의 회복을 돕습니다."
                                        </p>
                                    </div>
                                </div>

                                {/* Right: Detailed Profile Content */}
                                <div className="w-full lg:w-2/3 space-y-12">
                                    {/* 인사말 */}
                                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                                        <h2 className="text-2xl font-bold text-[#00305B] mb-6">인사말</h2>
                                        <div className="space-y-4 text-gray-700 leading-relaxed text-justify">
                                            <p>
                                                안녕하세요. <strong>다온통합뇌심리센터(파낙토스 진주센터)</strong> 센터장 김희영입니다.
                                            </p>
                                            <p>
                                                반복되는 아이의 어려움으로 마음이 무거우신가요? 다온은 그런 부모님의 간절한 마음을 깊이 이해하며 시작되었습니다.
                                            </p>
                                            <p className="font-semibold text-[#00305B]">
                                                "정서가 안정되고 뇌가 회복될 때, 아이의 행동과 삶은 비로소 변화하기 시작합니다."
                                            </p>
                                            <p>
                                                아이의 정서와 뇌가 안정되고, 행동의 변화로 삶이 달라지는 여정에 다온통합뇌심리센터가 따뜻하게 동행하겠습니다.
                                            </p>
                                        </div>
                                    </div>

                                    {/* 1. 핵심 전문 자격 (Key Qualifications) */}
                                    <div>
                                        <h3 className="text-xl font-bold text-[#00305B] mb-4 flex items-center gap-2">
                                            <span className="w-8 h-8 rounded-lg bg-[#00305B] text-white flex items-center justify-center text-sm">01</span>
                                            핵심 전문 자격
                                        </h3>
                                        <div className="bg-[#F8FBFE] p-6 rounded-xl border border-blue-50">
                                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700 font-medium">
                                                <li>• 재활심리 박사과정 수료</li>
                                                <li>• 재활심리학 석사</li>
                                                <li>• 사회복지학 석사</li>
                                                <li>• 국가공인 브레인트레이너</li>
                                                <li>• 정신건강상담사 (수련감독전문가)</li>
                                                <li>• 미술심리상담사 (수련감독전문가)</li>
                                                <li>• 보건복지부 등록 발달재활서비스 제공인력</li>
                                                <li>• 사회복지사 2급</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {/* 2. 심리·정서·교육 */}
                                        <div>
                                            <h3 className="text-xl font-bold text-[#00305B] mb-4 flex items-center gap-2">
                                                <span className="w-8 h-8 rounded-lg bg-[#E6F0F7] text-[#00305B] flex items-center justify-center text-sm">02</span>
                                                심리·정서·교육 분야
                                            </h3>
                                            <div className="bg-white p-6 rounded-xl border border-gray-100 h-full">
                                                <ul className="space-y-2 text-gray-600 custom-bullet">
                                                    <li>놀이심리상담사 1급</li>
                                                    <li>감정코칭전문가 1급</li>
                                                    <li>청소년지도사 2급</li>
                                                    <li>평생교육사</li>
                                                    <li>유치원정교사</li>
                                                </ul>
                                            </div>
                                        </div>

                                        {/* 3. 뇌·인지·노년 */}
                                        <div>
                                            <h3 className="text-xl font-bold text-[#00305B] mb-4 flex items-center gap-2">
                                                <span className="w-8 h-8 rounded-lg bg-[#E6F0F7] text-[#00305B] flex items-center justify-center text-sm">03</span>
                                                뇌·인지·노년 분야
                                            </h3>
                                            <div className="bg-white p-6 rounded-xl border border-gray-100 h-full">
                                                <ul className="space-y-2 text-gray-600 custom-bullet">
                                                    <li>뇌심리상담사</li>
                                                    <li>브레인 HQ 트레이너</li>
                                                    <li>위드브레인 전문가</li>
                                                    <li>노인두뇌관리사 1급</li>
                                                    <li>노인인지지도사 1급</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 4. 학력 및 경력 (Accordions or Compact Lists) */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-800 mb-3 border-b-2 border-[#EF9300] inline-block pb-1">학력 요약</h3>
                                            <ul className="space-y-2 text-sm text-gray-600 mt-2">
                                                <li>• 재활심리 박사과정 수료 / 재활심리학 석사</li>
                                                <li>• 사회복지학 석사</li>
                                                <li>• 뇌기반심리상담학 학사</li>
                                                <li>• 교육학 / 유아교육학 / 청소년교육학 학사</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-800 mb-3 border-b-2 border-[#EF9300] inline-block pb-1">주요 경력</h3>
                                            <ul className="space-y-2 text-sm text-gray-600 mt-2">
                                                <li><span className="font-bold text-[#00305B]">현)</span> 다온심리상담연구소 소장</li>
                                                <li><span className="font-bold text-[#00305B]">현)</span> 파낙토스 통합뇌센터 진주센터장</li>
                                                <li><span className="font-bold text-[#00305B]">현)</span> 한국미술치료상담학회 교수위원</li>
                                                <li><span className="text-gray-400">전)</span> 효성재가복지센터 센터장 / 교육원 원장</li>
                                                <li><span className="text-gray-400">전)</span> 소화아동가족상담연구소 상담실장</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}


                {/* -----------------------------------------------------------------------
                    TAB 2: CENTER TOUR (기존 유지)
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
                                    <div className="w-full aspect-[4/3] relative rounded-xl overflow-hidden shadow-md group">
                                        <Image src="/images/center/counter.png" alt="안내 데스크" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                                        <div className="absolute bottom-0 left-0 bg-white/90 px-4 py-2 m-4 rounded-lg text-sm font-bold shadow-sm">안내 데스크</div>
                                    </div>
                                    <div className="w-full aspect-[4/3] relative rounded-xl overflow-hidden shadow-md group">
                                        <Image src="/images/center/living_room.png" alt="메인 대기실" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                                        <div className="absolute bottom-0 left-0 bg-white/90 px-4 py-2 m-4 rounded-lg text-sm font-bold shadow-sm">메인 라운지</div>
                                    </div>
                                    <div className="w-full aspect-[4/3] relative rounded-xl overflow-hidden shadow-md group">
                                        <Image src="/images/center/table.png" alt="휴게 공간" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                                        <div className="absolute bottom-0 left-0 bg-white/90 px-4 py-2 m-4 rounded-lg text-sm font-bold shadow-sm">카페테리아 & 휴게</div>
                                    </div>
                                    <div className="w-full aspect-[4/3] relative rounded-xl overflow-hidden shadow-md group lg:col-span-3 h-64 md:h-80">
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
                                        <div className="w-full aspect-video relative rounded-xl overflow-hidden mb-4 group">
                                            <Image src="/images/center/counsel_room.png" alt="제1상담실" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                                        </div>
                                        <h3 className="text-lg font-bold text-[#00305B]">제1상담실</h3>
                                        <p className="text-sm text-gray-500">편안하고 프라이빗한 분위기에서 깊이 있는 대화를 나눕니다.</p>
                                    </div>
                                    <div className="bg-white p-4 rounded-2xl shadow-sm">
                                        <div className="w-full aspect-video relative rounded-xl overflow-hidden mb-4 group">
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
                                    <div className="w-full aspect-square relative rounded-xl overflow-hidden shadow-md group">
                                        <Image src="/images/center/play_room.png" alt="놀이치료실" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white translate-y-2 group-hover:translate-y-0 transition-transform">
                                            <p className="font-bold text-lg">놀이치료실</p>
                                            <p className="text-xs opacity-80 mt-1">아이들을 위한 즐거운 공간</p>
                                        </div>
                                    </div>
                                    <div className="w-full aspect-square relative rounded-xl overflow-hidden shadow-md group">
                                        <Image src="/images/center/room.png" alt="개별 훈련실" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white translate-y-2 group-hover:translate-y-0 transition-transform">
                                            <p className="font-bold text-lg">집중 훈련실</p>
                                            <p className="text-xs opacity-80 mt-1">몰입도를 높이는 환경</p>
                                        </div>
                                    </div>
                                    <div className="w-full aspect-square relative rounded-xl overflow-hidden shadow-md group">
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
