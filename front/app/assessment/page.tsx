"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

// --- Custom Visualizations ---

// 1. Brain Wave (BQ) Visualization
const BrainWaveViz = () => (
    <div className="w-full h-64 bg-slate-900 rounded-xl overflow-hidden relative border border-slate-700 shadow-inner flex items-center justify-center">
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 opacity-20">
            {Array.from({ length: 72 }).map((_, i) => (
                <div key={i} className="border border-slate-600/30" />
            ))}
        </div>
        <div className="absolute left-0 right-0 h-full flex items-center">
            {/* Simulated Brainwaves */}
            <svg className="w-full h-40" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M0 10 Q 2.5 5, 5 10 T 10 10 T 15 10 T 20 10 T 25 10" fill="none" stroke="#4ade80" strokeWidth="0.2" className="animate-pulse" />
                <path d="M0 10 Q 5 15, 10 10 T 20 10 T 30 10" fill="none" stroke="#60a5fa" strokeWidth="0.2" opacity="0.7" />
                <path d="M0 12 Q 2 8, 4 12 T 8 12 T 12 12" fill="none" stroke="#f472b6" strokeWidth="0.2" opacity="0.5" />
            </svg>
        </div>
        <div className="z-10 text-center">
            <h3 className="text-white text-lg font-mono mb-2">Real-time BQ Analysis</h3>
            <div className="flex gap-4 justify-center text-xs font-mono">
                <span className="text-green-400">Alpha: 10Hz (Normal)</span>
                <span className="text-blue-400">Beta: 15Hz (Active)</span>
                <span className="text-pink-400">Theta: 6Hz (Rest)</span>
            </div>
            <div className="mt-4 px-4 py-1 bg-white/10 rounded-full inline-block backdrop-blur-sm text-slate-300 text-xs">
                Data Visualization Mode
            </div>
        </div>
    </div>
);

// 2. Full Battery Structure Diagram
const FullBatteryDiagram = () => (
    <div className="w-full max-w-4xl mx-auto p-8 rounded-2xl bg-white border border-gray-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 relative z-10">
            {/* Intelligence Node */}
            <div className="flex-1 bg-blue-50 p-6 rounded-xl border border-blue-100 w-full text-center hover:scale-105 transition-transform duration-300">
                <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center text-2xl mb-3">🧩</div>
                <h4 className="font-bold text-blue-900 mb-2">지능 (Intelligence)</h4>
                <p className="text-xs text-blue-700">K-WISC-V<br />COG 신경인지</p>
            </div>

            {/* Center Core */}
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-600 to-blue-600 shadow-xl flex flex-col items-center justify-center text-white p-2 text-center shrink-0 border-4 border-indigo-100 z-20">
                <span className="font-bold text-sm tracking-widest uppercase opacity-80 mb-1">Total</span>
                <span className="font-extrabold text-lg leading-tight">종합<br />심리평가</span>
            </div>

            {/* Personality Node */}
            <div className="flex-1 bg-purple-50 p-6 rounded-xl border border-purple-100 w-full text-center hover:scale-105 transition-transform duration-300">
                <div className="w-12 h-12 mx-auto bg-purple-100 rounded-full flex items-center justify-center text-2xl mb-3">🎭</div>
                <h4 className="font-bold text-purple-900 mb-2">정서/성격 (Emotion)</h4>
                <p className="text-xs text-purple-700">MMPI-2<br />TCI 기질검사</p>
            </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-8 relative z-10">
            {/* Neuro Node */}
            <div className="flex-1 bg-green-50 p-6 rounded-xl border border-green-100 w-full text-center hover:scale-105 transition-transform duration-300">
                <div className="w-12 h-12 mx-auto bg-green-100 rounded-full flex items-center justify-center text-2xl mb-3">🧠</div>
                <h4 className="font-bold text-green-900 mb-2">신경/생리 (Neuro)</h4>
                <p className="text-xs text-green-700">BQ 뇌기능<br />스트레스 검사</p>
            </div>

            {/* Projection Node */}
            <div className="flex-1 bg-orange-50 p-6 rounded-xl border border-orange-100 w-full text-center hover:scale-105 transition-transform duration-300">
                <div className="w-12 h-12 mx-auto bg-orange-100 rounded-full flex items-center justify-center text-2xl mb-3">🖼️</div>
                <h4 className="font-bold text-orange-900 mb-2">투사/무의식 (Projective)</h4>
                <p className="text-xs text-orange-700">로샤(Rorschach)<br />HTP 그림검사</p>
            </div>
        </div>

        {/* Connecting Lines (Decorational) */}
        <div className="absolute inset-0 pointer-events-none z-0 hidden md:block">
            <svg className="w-full h-full opacity-20">
                <line x1="50%" y1="50%" x2="25%" y2="25%" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" />
                <line x1="50%" y1="50%" x2="75%" y2="25%" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="5,5" />
                <line x1="50%" y1="50%" x2="25%" y2="75%" stroke="#22c55e" strokeWidth="2" strokeDasharray="5,5" />
                <line x1="50%" y1="50%" x2="75%" y2="75%" stroke="#f97316" strokeWidth="2" strokeDasharray="5,5" />
            </svg>
        </div>
    </div>
);

// 3. Aura Visualization
const AuraViz = () => (
    <div className="w-full h-[400px] bg-black rounded-2xl overflow-hidden relative flex items-center justify-center shadow-2xl">
        {/* Aura Glow Layers */}
        <div className="absolute w-64 h-80 bg-red-600 rounded-full blur-[80px] opacity-40 animate-pulse"></div>
        <div className="absolute w-60 h-72 bg-yellow-500 rounded-full blur-[60px] opacity-30 translate-y-[-20px] mix-blend-screen"></div>
        <div className="absolute w-72 h-72 bg-blue-600 rounded-full blur-[90px] opacity-20 translate-x-[30px] mix-blend-screen"></div>

        {/* Human Silhouette */}
        <div className="relative z-10 w-40 h-80 bg-black rounded-full/30 backdrop-blur-[2px] border border-white/10 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full border border-white/20 absolute top-10 animate-ping opacity-20"></div>
            <div className="text-white/50 text-xs font-mono absolute bottom-4">Bio-Field Scan</div>

            {/* Simple SVG Silhouette */}
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-black drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                <path d="M12 4C13.6569 4 15 5.34315 15 7C15 8.65685 13.6569 10 12 10C10.3431 10 9 8.65685 9 7C9 5.34315 10.3431 4 12 4ZM12 12C14.6667 12 20 13.3333 20 16V19H4V16C4 13.3333 9.33333 12 12 12Z" />
            </svg>
        </div>

        {/* Data Points */}
        <div className="absolute top-4 right-4 space-y-2">
            <div className="flex gap-2 items-center">
                <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_red]"></div>
                <span className="text-xs text-red-300 font-mono">Stress: High</span>
            </div>
            <div className="flex gap-2 items-center">
                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_green]"></div>
                <span className="text-xs text-green-300 font-mono">Vitality: Normal</span>
            </div>
        </div>
    </div>
);


const AssessmentPage = () => {
    const [activeTab, setActiveTab] = useState('뇌파검사(BQ)');

    const tabs = [
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
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900">
                    {/* Abstract data pattern background since real image is unavailable */}
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
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
                <div className="max-w-7xl mx-auto px-4 py-4 overflow-x-auto">
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

                {/* Tab 1: 뇌파검사(BQ) */}
                {activeTab === '뇌파검사(BQ)' && (
                    <div className="animate-fadeIn max-w-5xl mx-auto">
                        <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">뇌기능 분석 (Brain Quotient)</h2>

                        {/* Custom BQ Visualization */}
                        <div className="mb-12">
                            <BrainWaveViz />
                            <p className="text-center text-sm text-gray-400 mt-2">* 실제 뇌파 측정 화면 예시입니다.</p>
                        </div>

                        <div className="bg-blue-50 p-8 rounded-2xl mb-12 text-center">
                            <p className="text-lg text-gray-700 leading-relaxed">
                                뇌파 측정기를 통해 신경세포의 전기적 활동을 분석하여 뇌의 발달 정도, 노화 상태, 활성 강도, 상호 작용 패턴 등을
                                과학적으로 측정합니다. 현재의 뇌 건강 상태와 두뇌 활용 능력을 정밀하게 진단하는 검사입니다.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                { title: "기초 율동 지수 (BRO)", desc: "뇌의 발달 정도와 안정성, 노화 정도를 판단하는 지표입니다. 휴식 상태에서의 뇌 기본 리듬을 확인합니다." },
                                { title: "자기 조절 지수 (SRO)", desc: "뇌 신경계의 자율적 조절 능력을 판단합니다. 환경 변화에 대한 유연한 대처 능력을 의미합니다." },
                                { title: "주의 지수 (ATQ)", desc: "뇌의 각성 정도와 외부 자극에 대한 집중/저항력을 측정합니다. 산만함이나 과몰입 여부를 확인합니다." },
                                { title: "활성 지수 (ACQ)", desc: "뇌의 정신적 활동성 및 인지 속도를 나타냅니다. 뇌가 얼마나 빠르고 효율적으로 일하는지 평가합니다." },
                                { title: "정서 지수 (EQ)", desc: "정서적 안정 상태를 파악합니다. 우울, 불안, 흥분 등 감정적 불균형 여부를 진단합니다." },
                                { title: "스트레스 지수 (SO)", desc: "육체적, 정신적 스트레스에 대한 뇌의 저항 능력을 판단합니다." },
                                { title: "좌우 뇌 균형 지수 (CQ)", desc: "좌뇌와 우뇌의 정보 처리 조화 및 협응 능력을 분석합니다. 논리와 직관의 밸런스를 확인합니다." },
                                { title: "뇌기능 지수 (BQ)", desc: "위의 모든 지수를 종합하여 뇌의 전반적인 기능 상태를 보여주는 종합 점수입니다." }
                            ].map((item, idx) => (
                                <div key={idx} className="bg-white p-6 rounded-xl shadow border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow">
                                    <h3 className="text-lg font-bold text-blue-800 mb-2">{item.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Tab 2: 종합심리검사 */}
                {activeTab === '종합심리검사' && (
                    <div className="animate-fadeIn">
                        <div className="text-center max-w-4xl mx-auto mb-12">
                            <h2 className="text-3xl font-bold mb-6">종합 심리 평가 (Full Battery)</h2>
                            <p className="text-gray-600 mb-4 font-medium text-lg leading-relaxed">
                                신체 종합검진처럼 마음의 건강 상태를 종합적으로 진단하는 검사입니다.
                                인지 지능, 정서 상태, 성격 특성, 무의식적 욕구 등을 다각도로 평가하여
                                심리적 적응 수준과 잠재적 문제를 정확히 파악합니다.
                            </p>
                        </div>

                        {/* Custom Full Battery Diagram */}
                        <div className="mb-16">
                            <FullBatteryDiagram />
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                            <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100">
                                <h3 className="text-xl font-bold mb-6 text-blue-900 border-b border-blue-200 pb-2">상세 검사 구성</h3>
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="font-bold text-gray-800 text-lg mb-1">1. 지능 & 인지 기능</h4>
                                        <p className="text-sm text-gray-600 mb-2">학습 능력, 인지적 강점/약점, 인지 효율성 평가</p>
                                        <ul className="list-disc pl-5 text-sm text-gray-700">
                                            <li><strong>K-WISC-V (웩슬러 지능검사)</strong>: 가장 공신력 있는 아동/청소년 지능 검사</li>
                                            <li><strong>COG 신경인지검사</strong>: 주의력, 기억력, 반응 속도 정밀 측정</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-800 text-lg mb-1">2. 정서 & 성격 특성</h4>
                                        <p className="text-sm text-gray-600 mb-2">심리적 불안정, 우울, 성격적 기질 파악</p>
                                        <ul className="list-disc pl-5 text-sm text-gray-700">
                                            <li><strong>MMPI-A/2 (다면적 인성검사)</strong>: 정신 병리 및 성격 구조 객관적 평가</li>
                                            <li><strong>TCI (기질 및 성격검사)</strong>: 타고난 기질과 후천적 성격 구분 분석</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-800 text-lg mb-1">3. 투사 검사 (무의식 탐색)</h4>
                                        <p className="text-sm text-gray-600 mb-2">말(언어)로 표현하기 힘든 심층 심리 분석</p>
                                        <ul className="list-disc pl-5 text-sm text-gray-700">
                                            <li><strong>Rorschach (로샤 검사)</strong>: 잉크 반점을 통한 무의식적 인지/정서 패턴 분석</li>
                                            <li><strong>HTP (집-나무-사람)</strong>, <strong>KFD (동적가족화)</strong>: 그림을 통해 내면의 욕구 확인</li>
                                            <li><strong>SCT (문장완성)</strong>: 미완성 문장을 채우며 심리적 갈등 요소 파악</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
                                <h3 className="text-xl font-bold mb-6 text-gray-800 border-b border-gray-300 pb-2">추천 대상 (이런 분께 필요합니다)</h3>
                                <ul className="space-y-4 text-gray-700">
                                    <li className="flex items-start">
                                        <span className="text-blue-500 mr-2 font-bold">✓</span>
                                        <div>
                                            <span className="font-bold block">원인 모를 학습 부진과 학교 부적응</span>
                                            지능 문제인지, 정서 문제인지 정확히 구별이 필요할 때
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-500 mr-2 font-bold">✓</span>
                                        <div>
                                            <span className="font-bold block">정서적 불안과 문제 행동</span>
                                            우울증, ADHD, 틱 장애 등의 심리적 원인을 찾고 싶을 때
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-500 mr-2 font-bold">✓</span>
                                        <div>
                                            <span className="font-bold block">종합적인 자기 이해와 성장</span>
                                            자신의 성격적 특성과 잠재력을 깊이 있게 이해하고 싶을 때
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-500 mr-2 font-bold">✓</span>
                                        <div>
                                            <span className="font-bold block">병원 기록이 남지 않는 전문 검사</span>
                                            정신과 방문이 부담스럽지만, 동급의 정밀 검사가 필요할 때
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tab 3: 컬러심리분석 */}
                {activeTab === '컬러심리분석' && (
                    <div className="animate-fadeIn">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold mb-6">컬러 심리 분석 (CPA)</h2>
                            <p className="text-gray-600">
                                타고난 기질 컬러와 현재 심리 상태를 반영하는 컬러를 통해 나를 이해하고 치유합니다.
                            </p>
                        </div>
                        <div className="flex flex-col gap-12 items-center max-w-5xl mx-auto">
                            <div className="w-full relative h-[400px] md:h-[500px] bg-white rounded-2xl shadow-md overflow-hidden p-4 border border-gray-100">
                                <Image
                                    src="/images/humancare/color_grid.png"
                                    alt="컬러 심리 분석 그리드"
                                    fill
                                    className="object-contain"
                                    unoptimized
                                />
                            </div>
                            <div className="grid md:grid-cols-3 gap-6 w-full">
                                <div className="bg-orange-50 p-6 rounded-xl text-orange-900 border border-orange-100 flex flex-col h-full">
                                    <h3 className="font-bold mb-2 text-lg">기질 분석 (DNA Color)</h3>
                                    <p className="text-sm leading-relaxed">생년월일을 기반으로 타고난 성향과 기질(Base Color)을 분석하여 변하지 않는 본질적인 나를 찾습니다.</p>
                                </div>
                                <div className="bg-purple-50 p-6 rounded-xl text-purple-900 border border-purple-100 flex flex-col h-full">
                                    <h3 className="font-bold mb-2 text-lg">현재 상태 (Mind Color)</h3>
                                    <p className="text-sm leading-relaxed">직관적으로 선택한 컬러를 통해 현재의 스트레스 요인, 심리적 갈등, 그리고 내면의 욕구를 파악합니다.</p>
                                </div>
                                <div className="bg-green-50 p-6 rounded-xl text-green-900 border border-green-100 flex flex-col h-full">
                                    <h3 className="font-bold mb-2 text-lg">보완 처방 (Energy Color)</h3>
                                    <p className="text-sm leading-relaxed">심리적 균형을 회복하기 위해 지금 나에게 필요한 에너지 컬러를 처방하고 일상에 적용합니다.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tab 4: Aura분석 */}
                {activeTab === 'Aura분석' && (
                    <div className="animate-fadeIn text-center">
                        <h2 className="text-3xl font-bold mb-8">Aura & 생체 에너지 분석</h2>
                        <p className="text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
                            모든 생명체는 고유한 '생체 에너지(기, 氣)'를 발산합니다.
                            바이오피드백 기술을 활용해 눈에 보이지 않는 생체 에너지를 시각화하여
                            신체적 활력도, 스트레스 레벨, 그리고 기질적 특성을 분석합니다.
                        </p>

                        {/* Custom Aura Visualization */}
                        <div className="max-w-3xl mx-auto mb-16">
                            <AuraViz />
                        </div>

                        <div className="bg-gray-50 p-8 rounded-2xl max-w-5xl mx-auto border border-gray-200">
                            <h3 className="text-xl font-bold mb-6 text-gray-800">주요 컬러별 에너지 상태</h3>
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
                                <div className="p-4 bg-white rounded-lg border-l-4 border-red-500 shadow-sm">
                                    <div className="font-bold text-red-600 mb-1">Red / Black</div>
                                    <p className="text-xs text-gray-600">에너지 과잉 분출, 다혈질, 예민, 스트레스 과다 상태</p>
                                </div>
                                <div className="p-4 bg-white rounded-lg border-l-4 border-orange-500 shadow-sm">
                                    <div className="font-bold text-orange-500 mb-1">Orange</div>
                                    <p className="text-xs text-gray-600">창조적, 예술적, 독립적이나 감정 기복이 있을 수 있음</p>
                                </div>
                                <div className="p-4 bg-white rounded-lg border-l-4 border-yellow-400 shadow-sm">
                                    <div className="font-bold text-yellow-600 mb-1">Yellow</div>
                                    <p className="text-xs text-gray-600">지성적, 명석함, 사려 깊음. 생각이 너무 많아 신경계 피로 우려</p>
                                </div>
                                <div className="p-4 bg-white rounded-lg border-l-4 border-green-500 shadow-sm">
                                    <div className="font-bold text-green-600 mb-1">Green</div>
                                    <p className="text-xs text-gray-600">평화, 조화, 배려. 타인 관계 양호하나 순환 기능 체크 필요</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tab 5: MMPI */}
                {activeTab === 'MMPI' && (
                    <div className="animate-fadeIn max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold mb-8 text-center">MMPI-2 (다면적 인성 검사)</h2>
                        <p className="text-gray-600 mb-10 text-center">
                            세계적으로 가장 널리 사용되는 객관적 성격 검사로, 성격 구조와 심리적 적응 상태를 정밀하게 파악합니다.
                        </p>

                        <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100">
                            <div className="bg-gray-900 text-white p-4 font-bold text-center">주요 임상 척도</div>
                            <div className="divide-y divide-gray-100">
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
                                    <div key={idx} className="p-4 flex flex-col md:flex-row md:items-center hover:bg-gray-50 transition-colors">
                                        <span className="font-bold text-blue-700 w-48 shrink-0">{item.scale}</span>
                                        <span className="text-gray-600 text-sm">{item.desc}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Tab 6: 로샤검사 */}
                {activeTab === '로샤검사' && (
                    <div className="animate-fadeIn max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold mb-8 text-center">로샤 검사 (Rorschach Test)</h2>
                        <p className="text-gray-600 mb-10 text-center">
                            10장의 잉크 반점 카드를 사용하여 개인의 무의식적 성격 특성, 정서 통제 방식, 인지 스타일을 탐색하는 투사 검사입니다.
                        </p>

                        <div className="grid md:grid-cols-2 gap-6">
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

                {/* Tab 7: 웩슬러지능검사 */}
                {activeTab === '웩슬러지능검사' && (
                    <div className="animate-fadeIn max-w-5xl mx-auto">
                        <h2 className="text-3xl font-bold mb-8 text-center">웩슬러 지능 검사 (WISC-V)</h2>
                        <p className="text-gray-600 mb-10 text-center max-w-3xl mx-auto">
                            단순한 IQ 측정을 넘어 아동/청소년의 인지적 강점과 약점을 파악하여 학습 전략 및 진로 지도에 활용합니다.
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 text-center">
                            {[
                                { title: "언어 이해", desc: "언어적 개념 형성 및 추론 능력, 어휘력", color: "text-blue-600", bg: "bg-blue-50" },
                                { title: "시공간", desc: "시각적 세부 사항 인식 및 공간 관계", color: "text-green-600", bg: "bg-green-50" },
                                { title: "유동 추론", desc: "새로운 문제 해결 능력, 논리적 연역", color: "text-purple-600", bg: "bg-purple-50" },
                                { title: "작업 기억", desc: "주의력, 정보 유지 및 조작 능력", color: "text-orange-600", bg: "bg-orange-50" },
                                { title: "처리 속도", desc: "시각 정보를 빠르고 정확하게 처리", color: "text-red-600", bg: "bg-red-50" },
                            ].map((item, idx) => (
                                <div key={idx} className={`p-6 rounded-3xl flex flex-col items-center justify-center shadow-md border-2 border-white ${item.bg} h-full`}>
                                    <h3 className={`text-lg font-bold mb-2 ${item.color}`}>{item.title}</h3>
                                    <p className="text-xs text-gray-600 leading-snug">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Tab 8: 진로적성검사 */}
                {activeTab === '진로적성검사' && (
                    <div className="animate-fadeIn max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-8">진로 적성 검사</h2>
                        <p className="text-gray-600 mb-12">
                            개인의 성격, 흥미, 가치관, 능력을 종합적으로 분석하여 최적의 진로 방향을 제시합니다.
                        </p>

                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-12 rounded-3xl shadow-inner">
                            <div className="grid md:grid-cols-3 gap-8">
                                <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center">
                                    <h3 className="font-bold mb-2 text-lg">흥미 (Interest)</h3>
                                    <p className="text-sm text-gray-500">내가 좋아하는 것, 즐거움을 느끼는 활동</p>
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center">
                                    <h3 className="font-bold mb-2 text-lg">능력 (Ability)</h3>
                                    <p className="text-sm text-gray-500">내가 잘하는 것, 잠재된 재능</p>
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center">
                                    <h3 className="font-bold mb-2 text-lg">가치 (Value)</h3>
                                    <p className="text-sm text-gray-500">내가 중요하게 생각하는 직업적 요소</p>
                                </div>
                            </div>
                            <div className="mt-12">
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
