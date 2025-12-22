"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// --- Custom Visualizations Replaced with Realistic Images ---



const AssessmentPage = () => {
    const [activeTab, setActiveTab] = useState('기업프로그램');
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const onMouseDown = (e: React.MouseEvent) => {
        if (!scrollContainerRef.current) return;
        setIsDragging(true);
        setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
        setScrollLeft(scrollContainerRef.current.scrollLeft);
    };

    const onMouseLeave = () => {
        setIsDragging(false);
    };

    const onMouseUp = () => {
        setIsDragging(false);
    };

    const onMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !scrollContainerRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollContainerRef.current.offsetLeft;
        const walk = (x - startX); // 1:1 Scroll
        scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    };

    const tabs = [
        '기업프로그램',
        '뇌파검사(BQ)',
        '종합심리검사',
        '컬러심리분석',
        'Aura분석',
        'MMPI',
        '로샤검사',
        '웩슬러지능검사',
        '진로적성검사'
    ];

    return (
        <div className="min-h-screen bg-white font-sans text-gray-900">

            {/* Hero Section */}
            <section className="relative h-[300px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/assessment/assessment_hero_bg.png"
                        alt="검사 프로그램 배경"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40"></div>
                </div>
                <div className="relative z-10 text-center text-white px-4">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-md">
                        검사 프로그램 (Assessment)
                    </h1>
                    <p className="text-lg md:text-xl font-light opacity-90 max-w-2xl mx-auto">
                        과학적인 검사로 마음과 뇌의 상태를 정확하게 진단합니다
                    </p>
                </div>
            </section>

            {/* Pill Navigation (Centered) */}
            <div className="bg-gray-50 border-b border-gray-200">
                <div
                    ref={scrollContainerRef}
                    className="max-w-7xl mx-auto px-4 py-4 overflow-x-auto cursor-grab active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    onMouseDown={onMouseDown}
                    onMouseLeave={onMouseLeave}
                    onMouseUp={onMouseUp}
                    onMouseMove={onMouseMove}
                >
                    <div className="flex space-x-2 md:justify-center min-w-max">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-2.5 rounded-full text-sm md:text-base font-medium transition-all duration-200 ${activeTab === tab
                                    ? 'bg-blue-600 text-white shadow-md transform scale-105'
                                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <main className="max-w-7xl mx-auto px-4 py-16">

                {/* Tab 0: 기업프로그램 (Added) */}
                {activeTab === '기업프로그램' && (
                    <div className="animate-fadeIn max-w-6xl mx-auto space-y-20">
                        {/* 1. Intro Section */}
                        <div className="flex flex-col lg:flex-row gap-12 items-center">
                            <div className="lg:w-1/2 text-left">
                                <h2 className="text-3xl font-bold mb-6 text-[#00305B]">EAP(근로자지원프로그램) 란?</h2>
                                <h3 className="text-xl font-bold mb-6 text-[#EF9300]">Employee Assistance Program</h3>
                                <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
                                    <p>
                                        기업의 생산성에 영향을 미칠 수 있는 요인에 대해 상담, 컨설팅, 코칭, 서비스 권고 등의 기술을 활용하여
                                        근본적 해결 방안을 종합적으로 지원하는 프로그램입니다.
                                    </p>
                                    <p className="font-medium text-[#00305B]">
                                        개인이 심리적 안정을 찾고 자신과 조직을 이해하며 즐거운 직장 생활을 영위해 나가는데 그 목적이 있습니다.
                                    </p>
                                </div>
                            </div>
                            <div className="lg:w-1/2 w-full">
                                <div className="relative h-[300px] md:h-[400px] w-full rounded-3xl overflow-hidden shadow-xl border border-gray-100">
                                    <Image
                                        src="https://humancare.kr/wp-content/uploads/dp/pg/imgs/1631761186_image.png"
                                        alt="기업 상담 및 컨설팅 장면"
                                        fill
                                        className="object-cover"
                                        unoptimized
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 2. Necessity Section */}
                        <div className="bg-blue-50/50 rounded-3xl p-10 border border-blue-100">
                            <h3 className="text-2xl font-bold mb-8 text-center text-[#00305B]">EAP의 필요성</h3>
                            <div className="grid md:grid-cols-3 gap-6">
                                {[
                                    { icon: "🏢", text: "직군별, 업무별, 부서별 구성원들의 협력 및 업무 효율 증진을 위한 심리 정서 교육이 필요할 때" },
                                    { icon: "🎁", text: "임직원의 복지 차원에서 상담 서비스를 제공하여 구성원의 직무 만족도를 높이고 싶을 때" },
                                    { icon: "💆", text: "과도한 업무 스트레스를 해소하기 위한 전문 심리 케어 프로그램이 필요할 때" }
                                ].map((item, i) => (
                                    <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-blue-50 flex flex-col items-center text-center hover:shadow-md transition-shadow">
                                        <div className="text-4xl mb-4">{item.icon}</div>
                                        <p className="text-gray-700 font-medium leading-relaxed break-keep">{item.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 3. Concept Diagram Section */}
                        <div>
                            <h3 className="text-2xl font-bold mb-8 text-center text-[#00305B]">EAP 개념도</h3>
                            <div className="max-w-4xl mx-auto bg-white p-4 rounded-3xl shadow-lg border border-gray-100">
                                <div className="relative aspect-[16/9] w-full">
                                    <Image
                                        src="https://humancare.kr/wp-content/uploads/dp/pg/imgs/1631768482_image.png"
                                        alt="EAP 개념도 (Work & Life Balance)"
                                        fill
                                        className="object-contain"
                                        unoptimized
                                    />
                                </div>
                                <p className="text-center text-gray-500 mt-4 font-medium">직장(WORK)과 가정/생활(LIFE)의 균형을 위한 통합 지원</p>
                            </div>
                        </div>

                        {/* 4. Effects Section */}
                        <div className="grid md:grid-cols-2 gap-12 items-start">
                            <div className="bg-white p-8 rounded-3xl shadow-lg border-t-4 border-blue-600">
                                <h4 className="text-2xl font-bold mb-6 text-blue-800 flex items-center gap-2">
                                    <span className="text-3xl">🏢</span> 기업 (Organization)
                                </h4>
                                <ul className="space-y-4 text-gray-700 font-medium">
                                    <li className="flex gap-3">
                                        <span className="text-blue-500 font-bold">✓</span>
                                        건강하고 성숙한 사회 구성원
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-blue-500 font-bold">✓</span>
                                        활기찬 조직 문화 형성
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-blue-500 font-bold">✓</span>
                                        업무 몰입도 및 성과 증대
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-blue-500 font-bold">✓</span>
                                        기업의 성장 기여
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-white p-8 rounded-3xl shadow-lg border-t-4 border-green-500">
                                <h4 className="text-2xl font-bold mb-6 text-green-700 flex items-center gap-2">
                                    <span className="text-3xl">👤</span> 개인 (Individual)
                                </h4>
                                <ul className="space-y-4 text-gray-700 font-medium">
                                    <li className="flex gap-3">
                                        <span className="text-green-500 font-bold">✓</span>
                                        업무 효율 및 직무 만족 저하 요인 파악
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-green-500 font-bold">✓</span>
                                        뇌과학적 접근, 심리 상담, 인지 치료, 리더십 코칭 활용
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-green-500 font-bold">✓</span>
                                        개인과 가족의 행복 증진
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* 5. Program Structure & Evaluation */}
                        <div className="space-y-12">
                            <div>
                                <h3 className="text-2xl font-bold mb-8 text-center text-[#00305B]">프로그램 구성</h3>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="bg-slate-50 p-8 rounded-2xl border border-gray-200">
                                        <h4 className="text-xl font-bold text-slate-800 mb-4">1. EAP 협약 프로그램</h4>
                                        <p className="text-gray-600 mb-4">센터로 내방하여 진행되는 전문 상담 및 검사</p>
                                        <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                            <li>종합심리검사</li>
                                            <li>개인 심리 상담</li>
                                            <li>집단 심리 상담</li>
                                        </ul>
                                    </div>
                                    <div className="bg-slate-50 p-8 rounded-2xl border border-gray-200">
                                        <h4 className="text-xl font-bold text-slate-800 mb-4">2. EAP 출강/교육 프로그램</h4>
                                        <p className="text-gray-600 mb-4">전문가가 기업을 방문하여 진행</p>
                                        <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                            <li>주제별 강의 및 교육</li>
                                            <li>집단 프로그램 (워크샵 등)</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t pt-12 border-gray-100">
                                <h3 className="text-xl font-bold mb-6 text-left text-gray-800">심리 평가 (Psychological Evaluation)</h3>
                                <p className="text-gray-600 mb-6 text-left">
                                    개인의 성격 및 대인관계 패턴을 객관적으로 파악하고 정신 건강 상태를 점검합니다.
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    {[
                                        "지능 검사", "MMPI-2 (다면적 인성검사)", "TCI (기질 및 성격검사)",
                                        "투사 검사 (HTP, KFD)", "Rorschach (로샤 검사)", "BQ 뇌기능 검사",
                                        "COG 인지기늠 검사", "그림 심리 검사", "SCT (문장완성 검사)",
                                        "MBTI (성격 유형 검사)", "에니어그램", "이고그램 (Ego-gram)"
                                    ].map((test, i) => (
                                        <span key={i} className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600 shadow-sm">
                                            {test}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                )}

                {/* Tab 1: 뇌파검사(BQ) - Layout: Image Left, Text Right (Reverse) */}
                {activeTab === '뇌파검사(BQ)' && (
                    <div className="animate-fadeIn max-w-6xl mx-auto">
                        <div className="flex flex-col lg:flex-row-reverse gap-12 items-center mb-16">
                            <div className="lg:w-1/2">
                                <h2 className="text-3xl font-bold mb-6 text-left text-[#00305B]">뇌기능 분석 (Brain Quotient)</h2>
                                <p className="text-gray-600 leading-relaxed text-lg text-left mb-6">
                                    뇌파 측정기를 통해 신경세포의 전기적 활동을 분석하여 뇌의 발달 정도, 노화 상태, 활성 강도, 상호 작용 패턴 등을 과학적으로 측정합니다.
                                </p>
                                <p className="text-gray-600 leading-relaxed text-lg text-left mb-6">
                                    현재의 뇌 건강 상태와 두뇌 활용 능력을 정밀하게 진단하여 맞춤형 훈련을 설계합니다.
                                </p>
                            </div>
                            <div className="lg:w-1/2 relative h-[300px] md:h-[400px] w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100 group">
                                <Image
                                    src="/images/humancare/brain_generic.png"
                                    alt="실시간 뇌파 분석 소프트웨어 화면"
                                    fill
                                    className="object-contain transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                { title: "기초 율동 지수 (BRO)", desc: "뇌의 발달 정도와 안정성, 노화 정도를 판단하는 지표입니다." },
                                { title: "자기 조절 지수 (SRO)", desc: "뇌 신경계의 자율적 조절 능력을 판단합니다." },
                                { title: "주의 지수 (ATQ)", desc: "뇌의 각성 정도와 외부 자극에 대한 집중/저항력을 측정합니다." },
                                { title: "활성 지수 (ACQ)", desc: "뇌의 정신적 활동성 및 인지 속도를 나타냅니다." },
                                { title: "정서 지수 (EQ)", desc: "정서적 안정 상태를 파악합니다. (우울/불안 등)" },
                                { title: "스트레스 지수 (SO)", desc: "육체적, 정신적 스트레스에 대한 뇌의 저항 능력을 판단합니다." },
                                { title: "좌우 뇌 균형 지수 (CQ)", desc: "좌뇌와 우뇌의 정보 처리 조화 및 협응 능력을 분석합니다." },
                                { title: "뇌기능 지수 (BQ)", desc: "뇌의 전반적인 기능 상태를 보여주는 종합 점수입니다." }
                            ].map((item, idx) => (
                                <div key={idx} className="bg-white p-6 rounded-xl shadow border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow">
                                    <h3 className="text-lg font-bold text-blue-800 mb-2">{item.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Tab 2: 종합심리검사 - Layout: Text Left, Image Right (Standard) */}
                {activeTab === '종합심리검사' && (
                    <div className="animate-fadeIn max-w-6xl mx-auto">
                        <div className="flex flex-col lg:flex-row gap-12 items-center mb-16">
                            <div className="lg:w-1/2">
                                <h2 className="text-3xl font-bold mb-6 text-left text-[#00305B]">종합 심리 평가 (Full Battery)</h2>
                                <p className="text-gray-600 mb-6 font-medium text-lg leading-relaxed text-left">
                                    신체 종합검진처럼 마음의 건강 상태를 종합적으로 진단하는 검사입니다.
                                </p>
                                <p className="text-gray-600 leading-relaxed text-lg text-left">
                                    인지 지능, 정서 상태, 성격 특성, 무의식적 욕구 등을 다각도로 평가하여 심리적 적응 수준과 잠재적 문제를 정확히 파악하고 최적의 치료 계획을 수립합니다.
                                </p>
                            </div>
                            <div className="lg:w-1/2 relative h-[300px] md:h-[400px] w-full bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 p-4">
                                <Image
                                    src="/images/humancare/full_battery.png"
                                    alt="종합 심리 평가 구성 도표"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                            <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100">
                                <h3 className="text-xl font-bold mb-6 text-blue-900 border-b border-blue-200 pb-2">상세 검사 구성</h3>
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="font-bold text-gray-800 text-lg mb-1">1. 지능 & 인지 기능</h4>
                                        <p className="text-sm text-gray-600 mb-2">학습 능력, 인지적 강점/약점, 인지 효율성 평가</p>
                                        <ul className="list-disc pl-5 text-sm text-gray-700">
                                            <li><strong>K-WISC-V (웩슬러 지능검사)</strong></li>
                                            <li><strong>COG 신경인지검사</strong> (주의력, 기억력, 반응 속도)</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-800 text-lg mb-1">2. 정서 & 성격 특성</h4>
                                        <p className="text-sm text-gray-600 mb-2">심리적 불안정, 우울, 성격적 기질 파악</p>
                                        <ul className="list-disc pl-5 text-sm text-gray-700">
                                            <li><strong>MMPI-A/2 (다면적 인성검사)</strong></li>
                                            <li><strong>TCI (기질 및 성격검사)</strong></li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-800 text-lg mb-1">3. 투사 검사 (무의식 탐색)</h4>
                                        <p className="text-sm text-gray-600 mb-2">말(언어)로 표현하기 힘든 심층 심리 분석</p>
                                        <ul className="list-disc pl-5 text-sm text-gray-700">
                                            <li><strong>Rorschach (로샤 검사)</strong></li>
                                            <li><strong>HTP / KFD / SCT</strong> (그림 및 문장완성)</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
                                <h3 className="text-xl font-bold mb-6 text-gray-800 border-b border-gray-300 pb-2">추천 대상</h3>
                                <ul className="space-y-4 text-gray-700">
                                    <li className="flex items-start">
                                        <span className="text-blue-500 mr-2 font-bold">✓</span>
                                        <div><span className="font-bold">원인 모를 학습 부진과 학교 부적응</span> 지능 문제인지 정서 문제인지 판별</div>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-500 mr-2 font-bold">✓</span>
                                        <div><span className="font-bold">정서적 불안과 문제 행동</span> 우울증, ADHD 심층 원인 파악</div>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-500 mr-2 font-bold">✓</span>
                                        <div><span className="font-bold">자기 이해와 성장</span> 성격적 특성과 잠재력 발견</div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tab 3: 컬러심리분석 - Layout: Image Left, Text Right (Reverse) */}
                {activeTab === '컬러심리분석' && (
                    <div className="animate-fadeIn max-w-6xl mx-auto">
                        <div className="flex flex-col lg:flex-row-reverse gap-12 items-center mb-16">
                            <div className="lg:w-1/2">
                                <h2 className="text-3xl font-bold mb-6 text-left text-[#00305B]">컬러 심리 분석 (CPA)</h2>
                                <p className="text-gray-600 text-left leading-relaxed text-lg mb-6">
                                    타고난 기질 컬러와 현재 심리 상태를 반영하는 컬러를 통해 나를 이해하고 치유합니다.
                                </p>
                                <p className="text-gray-600 text-left leading-relaxed">
                                    색채는 무의식의 언어입니다. 선호하는 색과 거부하는 색을 통해 현재의 스트레스 원인과 잠재된 욕구를 파악하고, 개인에게 필요한 보완 컬러(Energy Color)를 처방합니다.
                                </p>
                            </div>
                            <div className="lg:w-1/2 w-full relative h-[300px] md:h-[400px] bg-white rounded-3xl shadow-xl overflow-hidden p-6 border border-gray-100">
                                <Image
                                    src="/images/humancare/color_analysis.png"
                                    alt="컬러 심리 분석 그리드"
                                    fill
                                    className="object-contain"
                                    unoptimized
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6 w-full">
                            <div className="bg-orange-50 p-6 rounded-xl text-orange-900 border border-orange-100 flex flex-col h-full hover:-translate-y-1 transition-transform">
                                <h3 className="font-bold mb-2 text-lg">기질 분석 (DNA Color)</h3>
                                <p className="text-sm leading-relaxed">생년월일을 기반으로 타고난 성향과 기질(Base Color)을 분석하여 변하지 않는 본질적인 나를 찾습니다.</p>
                            </div>
                            <div className="bg-purple-50 p-6 rounded-xl text-purple-900 border border-purple-100 flex flex-col h-full hover:-translate-y-1 transition-transform">
                                <h3 className="font-bold mb-2 text-lg">현재 상태 (Mind Color)</h3>
                                <p className="text-sm leading-relaxed">직관적으로 선택한 컬러를 통해 현재의 스트레스 요인, 심리적 갈등, 그리고 내면의 욕구를 파악합니다.</p>
                            </div>
                            <div className="bg-green-50 p-6 rounded-xl text-green-900 border border-green-100 flex flex-col h-full hover:-translate-y-1 transition-transform">
                                <h3 className="font-bold mb-2 text-lg">보완 처방 (Energy Color)</h3>
                                <p className="text-sm leading-relaxed">심리적 균형을 회복하기 위해 지금 나에게 필요한 에너지 컬러를 처방하고 일상에 적용합니다.</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tab 4: Aura분석 - Layout: Text Left, Image Right (Standard) */}
                {activeTab === 'Aura분석' && (
                    <div className="animate-fadeIn max-w-6xl mx-auto">
                        <div className="flex flex-col lg:flex-row gap-12 items-center mb-16">
                            <div className="lg:w-1/2">
                                <h2 className="text-3xl font-bold mb-6 text-left text-[#00305B]">Aura & 생체 에너지 분석</h2>
                                <p className="text-gray-600 leading-relaxed text-left text-lg">
                                    모든 생명체는 고유한 '생체 에너지(기, 氣)'를 발산합니다.
                                    바이오피드백 기술을 활용해 눈에 보이지 않는 생체 에너지를 시각화하여
                                    신체적 활력도, 스트레스 레벨, 그리고 기질적 특성을 분석합니다.
                                </p>
                            </div>
                            <div className="lg:w-1/2 relative w-full h-[300px] md:h-[400px] bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-200">
                                <Image
                                    src="/images/humancare/aura_analysis.png"
                                    alt="생체 에너지(Aura) 스캔 화면"
                                    fill
                                    className="object-contain p-4"
                                />
                            </div>
                        </div>

                        <div className="bg-gray-50 p-8 rounded-2xl max-w-6xl mx-auto border border-gray-200">
                            <h3 className="text-xl font-bold mb-6 text-gray-800">주요 컬러별 에너지 상태</h3>
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
                                {[
                                    { color: "Red", title: "Red / Black", desc: "에너지 과잉 분출, 다혈질, 예민, 스트레스 과다 상태" },
                                    { color: "Orange", title: "Orange", desc: "창조적, 예술적, 독립적이나 감정 기복이 있을 수 있음" },
                                    { color: "Yellow", title: "Yellow", desc: "지성적, 명석함, 사려 깊음. 생각이 너무 많아 신경계 피로 우려" },
                                    { color: "Green", title: "Green", desc: "평화, 조화, 배려. 타인 관계 양호하나 순환 기능 체크 필요" },
                                ].map((item, idx) => (
                                    <div key={idx} className={`p-4 bg-white rounded-lg border-l-4 border-${item.color.toLowerCase() === 'yellow' ? 'yellow-400' : item.color.toLowerCase() + '-500'} shadow-sm`}>
                                        <div className={`font-bold text-${item.color.toLowerCase() === 'yellow' ? 'yellow-600' : item.color.toLowerCase() + '-600'} mb-1`}>{item.title}</div>
                                        <p className="text-xs text-gray-600">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Tab 5: MMPI - Layout: Image Left, Text Right (Reverse) */}
                {activeTab === 'MMPI' && (
                    <div className="animate-fadeIn max-w-6xl mx-auto">
                        <div className="flex flex-col lg:flex-row-reverse gap-12 items-center mb-16">
                            <div className="lg:w-1/2">
                                <h2 className="text-3xl font-bold mb-6 text-left text-[#00305B]">MMPI-2 (다면적 인성 검사)</h2>
                                <p className="text-gray-600 mb-6 text-left text-lg leading-relaxed">
                                    세계적으로 가장 널리 사용되는 객관적 성격 검사로, 성격 구조와 심리적 적응 상태를 정밀하게 파악합니다.
                                </p>
                            </div>
                            <div className="lg:w-1/2 bg-white shadow-xl rounded-3xl overflow-hidden border border-gray-100">
                                {/* Inserted MMPI Image */}
                                <div className="relative w-full h-[300px] bg-white border-b border-gray-100">
                                    <Image
                                        src="/images/humancare/mmpi.png"
                                        alt="MMPI 다면적 인성 검사 결과 그래프"
                                        fill
                                        className="object-contain p-4"
                                    />
                                </div>
                                <div className="bg-slate-800 text-white p-4 font-bold text-center text-sm">주요 임상 척도</div>
                            </div>
                        </div>

                        <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100 p-6">
                            <h3 className="text-xl font-bold mb-6 text-gray-900 border-b pb-2">임상 척도 상세</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                {[
                                    { scale: "1. 건강염려증 (Hs)", desc: "신체 기능에 대한 과도한 집착과 불안" },
                                    { scale: "2. 우울증 (D)", desc: "비관적 태도, 슬픔, 무력감, 사고의 지연" },
                                    { scale: "3. 히스테리 (Hy)", desc: "스트레스 회피 수단으로서의 신체적 증상 호소" },
                                    { scale: "4. 반사회성 (Pd)", desc: "사회적 규범 무시, 권위에 대한 반항, 충동성" },
                                    { scale: "5. 남성성/여성성 (Mf)", desc: "흥미 패턴, 심미적 취향, 성 역할 유연성" },
                                    { scale: "6. 편집증 (Pa)", desc: "대인 관계의 예민성, 의심, 피해 의식" },
                                    { scale: "7. 강박증 (Pt)", desc: "만성적인 불안, 걱정, 완벽주의적 성향" },
                                    { scale: "8. 조현병 (Sc)", desc: "현실감 저하, 기이한 사고, 사회적 고립" },
                                    { scale: "9. 경조증 (Ma)", desc: "과도한 활동성, 고항진된 정서, 사고의 비약" },
                                    { scale: "0. 내향성 (Si)", desc: "사회적 위축, 수줍음, 대인 관계 회피" },
                                ].map((item, idx) => (
                                    <div key={idx} className="p-3 bg-gray-50 rounded-lg flex flex-col hover:bg-gray-100 transition-colors">
                                        <span className="font-bold text-blue-700 mb-1">{item.scale}</span>
                                        <span className="text-gray-600 text-sm">{item.desc}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Tab 6: 로샤검사 - Layout: Text Left, Image Right (Standard) */}
                {activeTab === '로샤검사' && (
                    <div className="animate-fadeIn max-w-6xl mx-auto">
                        <div className="flex flex-col lg:flex-row gap-12 items-center mb-16">
                            <div className="lg:w-1/2">
                                <h2 className="text-3xl font-bold mb-6 text-left text-[#00305B]">로샤 검사 (Rorschach Test)</h2>
                                <p className="text-gray-600 mb-6 text-left leading-relaxed text-lg">
                                    10장의 잉크 반점 카드를 사용하여 개인의 무의식적 성격 특성, 정서 통제 방식, 인지 스타일을 탐색하는 투사 검사입니다.
                                </p>
                            </div>
                            <div className="lg:w-1/2 relative w-full h-[300px] md:h-[400px] bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-200">
                                <Image
                                    src="/images/humancare/rorschach_test.png"
                                    alt="로샤 잉크 반점 검사 카드"
                                    fill
                                    className="object-contain hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                { title: "인지 (Cognitive)", desc: "정보를 지각하고 처리하는 방식, 사고의 효율성" },
                                { title: "사고 (Ideation)", desc: "논리적 사고력, 현실 검증력, 사고의 유연성" },
                                { title: "정서 (Affect)", desc: "감정 표현 방식, 스트레스에 대한 반응성, 정서적 통제력" },
                                { title: "자기지각 (Self-Perception)", desc: "자신에 대한 이미지, 자존감, 자기애적 성향" },
                                { title: "대인지각 (Interpersonal)", desc: "타인을 바라보는 관점, 대인 관계 패턴 및 기대" },
                                { title: "중재 (Mediation)", desc: "스트레스 상황에서의 대처 능력 및 자원" },
                            ].map((area, idx) => (
                                <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-blue-300 transition-colors flex flex-col h-full">
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">{area.title}</h3>
                                    <p className="text-gray-600 text-sm">{area.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Tab 7: 웩슬러지능검사 - Layout: Image Left, Text Right (Reverse) */}
                {activeTab === '웩슬러지능검사' && (
                    <div className="animate-fadeIn max-w-6xl mx-auto">
                        <div className="flex flex-col lg:flex-row-reverse gap-12 items-center mb-16">
                            <div className="lg:w-1/2">
                                <h2 className="text-3xl font-bold mb-6 text-left text-[#00305B]">웩슬러 지능 검사 (WISC-V)</h2>
                                <p className="text-gray-600 mb-6 text-left leading-relaxed text-lg">
                                    단순한 IQ 측정을 넘어 아동/청소년의 인지적 강점과 약점을 파악하여 학습 전략 및 진로 지도에 활용합니다.
                                </p>
                            </div>
                            <div className="lg:w-1/2 relative w-full h-[300px] md:h-[400px] bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 p-6">
                                <Image
                                    src="/images/humancare/wechsler_intelligence_scale.png"
                                    alt="웩슬러 지능 검사 도구 및 결과"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 text-center">
                            {[
                                { title: "언어 이해", desc: "언어적 개념 형성 및 추론 능력, 어휘력", color: "text-blue-600", bg: "bg-blue-50" },
                                { title: "시공간", desc: "시각적 세부 사항 인식 및 공간 관계", color: "text-green-600", bg: "bg-green-50" },
                                { title: "유동 추론", desc: "새로운 문제 해결 능력, 논리적 연역", color: "text-purple-600", bg: "bg-purple-50" },
                                { title: "작업 기억", desc: "주의력, 정보 유지 및 조작 능력", color: "text-orange-600", bg: "bg-orange-50" },
                                { title: "처리 속도", desc: "시각 정보를 빠르고 정확하게 처리", color: "text-red-600", bg: "bg-red-50" },
                            ].map((item, idx) => (
                                <div key={idx} className={`p-6 rounded-3xl flex flex-col items-center justify-center shadow-md border-2 border-white ${item.bg} h-full hover:scale-105 transition-transform`}>
                                    <h3 className={`text-lg font-bold mb-2 ${item.color}`}>{item.title}</h3>
                                    <p className="text-xs text-gray-600 leading-snug">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Tab 8: 진로적성검사 - Layout: Text Left, Image Right (Standard) */}
                {activeTab === '진로적성검사' && (
                    <div className="animate-fadeIn max-w-6xl mx-auto">
                        <div className="flex flex-col lg:flex-row gap-12 items-center mb-16">
                            <div className="lg:w-1/2">
                                <h2 className="text-3xl font-bold mb-6 text-left text-[#00305B]">진로 적성 검사</h2>
                                <p className="text-gray-600 mb-6 text-left leading-relaxed text-lg">
                                    개인의 성격, 흥미, 가치관, 능력을 종합적으로 분석하여 최적의 진로 방향을 제시합니다.
                                </p>
                            </div>
                            <div className="lg:w-1/2 relative w-full h-[300px] md:h-[400px] bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100">
                                <Image
                                    src="/images/humancare/career_aptitude_test.png"
                                    alt="진로 적성 검사 결과 리포트"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-12 rounded-3xl shadow-inner border border-blue-100">
                            <div className="grid md:grid-cols-3 gap-8">
                                <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center hover:-translate-y-1 transition-transform">
                                    <h3 className="font-bold mb-2 text-lg">흥미 (Interest)</h3>
                                    <p className="text-sm text-gray-500">내가 좋아하는 것, 즐거움을 느끼는 활동</p>
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center hover:-translate-y-1 transition-transform">
                                    <h3 className="font-bold mb-2 text-lg">능력 (Ability)</h3>
                                    <p className="text-sm text-gray-500">내가 잘하는 것, 잠재된 재능</p>
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center hover:-translate-y-1 transition-transform">
                                    <h3 className="font-bold mb-2 text-lg">가치 (Value)</h3>
                                    <p className="text-sm text-gray-500">내가 중요하게 생각하는 직업적 요소</p>
                                </div>
                            </div>
                            <div className="mt-12 text-center">
                                <p className="text-lg font-medium text-gray-800 mb-6">진로 설계를 위한 전문 솔루션</p>
                                <div className="flex flex-wrap justify-center gap-4">
                                    <span className="px-4 py-2 bg-white rounded-lg shadow-sm text-gray-700 font-medium border border-gray-100">Holland 진로 탐색</span>
                                    <span className="px-4 py-2 bg-white rounded-lg shadow-sm text-gray-700 font-medium border border-gray-100">다중지능 검사</span>
                                    <span className="px-4 py-2 bg-white rounded-lg shadow-sm text-gray-700 font-medium border border-gray-100">학습 유형 (U&I)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
};

export default AssessmentPage;
