"use client";

import React, { useState } from 'react';
import Image from 'next/image';

const NeurofeedbackPage = () => {
    const [activeTab, setActiveTab] = useState('뉴로피드백');
    // Tab for Self-Check sub-navigation
    const [activeSelfCheck, setActiveSelfCheck] = useState('PAT'); // 'PAT' | 'AdultChild' | 'ADHD'

    const tabs = [
        '뉴로피드백',
        '뇌파훈련프로그램',
        '뇌파훈련 누가할까요',
        '자가진단(Self-Check)',
        '뇌파훈련사례',
        '뇌에서 답을 찾자',
    ];

    // --- Data for Cases ---
    const cases = [
        {
            title: "뉴로피드백 훈련효과",
            date: "2016.05.26",
            content: `뉴로피드백은 뇌파를 스스로 조절할 수 있도록 훈련시키는 과학적인 뇌파훈련 신기술입니다.
            정서불안, 강박증 우울증, 주의력, 집중력 향상, ADHD, 업무능력향상 등 뇌의 정상화에 탁월한 효과를 발휘합니다.
            
            뉴로피드백 훈련은 자신의 뇌파가 변화되는 과정을 실시간으로 피드백을 받으면서 자기 스스로 뇌파를 조절할 수 있도록 하는 뇌 운동이며, 뇌신경망 활성화로 뇌기능이 점차 좋아지므로 뇌가 좋아지면 모든 것이 좋아지게 됩니다.`
        },
        {
            title: "뉴로피드백 훈련으로 뇌기능 개선 증상",
            date: "2014.01.13",
            content: `뉴로피드백 훈련으로 다음과 같은 다양한 뇌기능 개선 효과(Target Symptoms)를 기대할 수 있습니다
            
            - 집중력 향상 (Attention)
            - 실행기능 개선
            - 기억력 향상 (Memory)
            - 주의력 향상
            - 대인기피 개선
            - 수면개선 (Sleep)
            - 불안 감소 (Anxiety) 및 긴장 이완
            - 우울 기분 향상 (Mood)
            - 피로 개선 (Fatigue)
            - 분노 조절 (Aggression)
            - 스트레스 조절
            - 중독·탐닉 조절
            - 언어 발달
            - 정서적 감정 조절
            - 긍정적 성격 형성
            - 자신감 향상
            - 의욕적이고 적극적인 태도
            - 성장 발육 (키가 크고 튼튼해짐)`
        },
        {
            title: "뇌파훈련 전후 비교 임상 사례",
            date: "2013.12.13",
            content: "실제 내담자들의 훈련 전후 뇌기능 분석 결과 비교 데이터입니다. (센터 방문 시 상세 데이터를 확인하실 수 있습니다.)"
        },
        {
            title: "공부 못하는 뇌파 vs 공부 잘하는 뇌파",
            date: "2012.02.06",
            content: "학습 효율이 높은 뇌파 상태와 그렇지 않은 상태의 차이점을 분석합니다. 안정된 SMR파와 저베타파가 활성화된 두뇌는 높은 학습 능력을 발휘합니다."
        },
    ];

    // --- Data for Knowledge ---
    const knowledges = [
        {
            title: "선택적 함구증 (Selective Mutism)",
            date: "2014.09.27",
            content: `선택적 함구증은 보통 5세 이전에 발병하며 여아에게 더 흔하게 나타납니다.
            
            주요 원인:
            1. 정신분석이론: 구강기의 지나친 억압, 의존성, 공포심 등
            2. 외상론: 신체적/성적 학대, 입 주변 외상 등
            3. 기질적 요인: 태어날 때의 성격상 특성, 지나친 수줍음
            4. 분리불안: 어머니와의 분리 시 나타나는 불안
            5. 가족의 정신병리: 부부 불화, 우울증, 과잉보호 등
            6. 신경발달학적 요인: 대화장애, 유뇨증 동반 또는 뇌파 이상 소견
            7. 염색체 이상: 18번 염색체 이상 소견 등`
        },
        {
            title: "마음의 병은 뇌의 고장이다",
            date: "2014.01.11",
            content: "심리적 문제로만 치부하던 우울증, 불안장애 등은 사실 뇌의 기능적 불균형 문제입니다. 뇌의 신경학적 기능을 회복함으로써 마음의 병을 치유할 수 있습니다."
        },
        {
            title: "뇌를 좋아지게 하는 처방법",
            date: "2013.05.28",
            content: "일상 생활에서 실천할 수 있는 뇌 건강 관리법: 충분한 수면, 균형 잡힌 영양 섭취, 적절한 신체 운동, 그리고 지속적인 두뇌 훈련이 필요합니다."
        },
    ];

    // --- Data for Self Check Questions ---
    const selfCheckData = {
        PAT: {
            title: "부모 양육 태도 검사 (PAT)",
            desc: "자녀에게 나는 어떤 부모일까요? 평소의 양육 스타일을 점검해보세요.",
            questions: [
                "아이가 밥을 먹기 싫다고 투정 부릴 때 어떻게 하시나요?",
                "아이가 약속을 어겼을 때 일관성 있게 훈육하시나요?",
                "아이의 사소한 실수에도 크게 화를 내는 편인가요?",
                "아이와 하루에 얼마나 대화를 나누시나요?",
                "아이가 스스로 결정할 수 있도록 기다려주시나요?",
                "아이의 감정을 공감하고 읽어주려 노력하시나요?",
                "칭찬보다 지적을 더 많이 하는 편인가요?",
                "다른 아이와 내 아이를 자주 비교하시나요?",
                "아이 앞에서 부부싸움을 하거나 큰 소리를 내시나요?",
                "아이의 숙제나 준비물을 대신 챙겨주시나요?"
            ],
            result: "※ 해당 검사는 간이 문항입니다. 정확한 양육 태도 유형(허용적, 권위적, 민주적) 분석을 위해 센터 방문을 권장합니다."
        },
        AdultChild: {
            title: "성인아이 자가진단",
            desc: "몸은 어른이지만 마음은 아이인 채로 머물러 있나요? 내면의 상처를 확인해보세요.",
            questions: [
                "적당한 것이 무엇인지 혼돈스러울 때가 많다.",
                "계획한 일을 끝까지 해내기가 어렵다.",
                "진실을 말하는 것이 더 쉬울 때도 거짓말을 한다.",
                "자기 자신에게 무자비한 비판을 가한다.",
                "즐거운 시간을 보내는 것이 어렵거나 죄책감이 든다.",
                "자신을 너무 심각하게 받아들인다.",
                "친밀한 관계를 맺기가 어렵다.",
                "변화가 있거나 통제 불가능한 상황에서 과민반응한다.",
                "타인의 칭찬과 인정에 지나치게 목말라한다.",
                "지나치게 책임감이 강하거나, 반대로 지나치게 무책임하다.",
                "자신이 다른 사람들과 다르다고 느낀다.",
                "충동적으로 행동하는 경향이 있다."
            ],
            result: "※ 5개 이상 해당된다면, 내면아이 치료와 상담이 필요할 수 있습니다."
        },
        ADHD: {
            title: "집중력 결핍(ADHD) 자가진단",
            desc: "산만하고 집중하기 어려운가요? 주의력 결핍 여부를 체크해보세요.",
            questions: [
                "오랫동안 한 가지 일에 집중하기가 힘들다.",
                "손발을 가만히 두지 못하고 꼼지락거린다.",
                "외부 자극에 의해 쉽게 산만해진다.",
                "게임이나 그룹 활동에서 차례를 기다리기 힘들다.",
                "질문이 끝나기도 전에 불쑥 대답해버린다.",
                "지시를 끝까지 따르지 못하고 일을 완수하지 못한다.",
                "놀이나 과제 수행 시 지속적인 주의 집중이 힘들다.",
                "한 가지 활동을 끝내지 않고 다른 활동으로 넘어간다.",
                "필요한 물건(준비물, 숙제 등)을 자주 잃어버린다.",
                "말을 너무 많이 하거나 시끄럽게 떠든다."
            ],
            result: "※ 8점 이상(각 항목 5점 기준, 약 4개 항목 이상) 해당 시 전문가의 정밀 진단이 필요합니다."
        }
    };

    return (
        <div className="min-h-screen bg-white font-sans text-gray-900">

            {/* Hero Section */}
            <section className="relative h-[300px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="/images/renewal/hero.png"
                        alt="Neurofeedback Hero"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40" />
                </div>
                <div className="relative z-10 text-center text-white px-4">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-md">
                        뉴로피드백 (Neurofeedback)
                    </h1>
                    <p className="text-lg md:text-xl font-light opacity-90 max-w-2xl mx-auto">
                        뇌의 자가 치유 능력을 깨우는 과학적인 훈련
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

                {/* Tab 1: 뉴로피드백 (Intro) */}
                {activeTab === '뉴로피드백' && (
                    <div className="space-y-16 animate-fadeIn">
                        <div className="text-center max-w-4xl mx-auto mb-12">
                            <h2 className="text-3xl font-bold mb-6 text-gray-900">뉴로피드백이란?</h2>
                            <p className="text-gray-600 leading-relaxed text-lg text-justify md:text-center">
                                뉴로피드백(Neurofeedback)은 뇌파를 측정하여 자신의 뇌 상태를 실시간으로 모니터링하고,
                                긍정적인 뇌파 상태를 보상함으로써 뇌 스스로가 최적의 기능을 학습하도록 돕는
                                <strong> 비약물적 두뇌 훈련 프로그램</strong>입니다.
                            </p>
                        </div>

                        {/* Principle Diagram */}
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 max-w-5xl mx-auto">
                            <div className="relative h-[300px] md:h-[500px] w-full">
                                <Image
                                    src="/images/humancare/neurofeedback_principle.png"
                                    alt="뉴로피드백 원리"
                                    fill
                                    className="object-contain"
                                    unoptimized
                                />
                            </div>
                            <p className="text-center text-gray-500 mt-4 text-sm">
                                뇌파 측정 → 분석 → 피드백(보상) → 뇌기능 최적화 (자가학습 원리)
                            </p>
                        </div>

                        {/* Self Check List (Simple Version) */}
                        <div className="mt-16">
                            <h3 className="text-2xl font-bold text-center mb-10 text-gray-800">뉴로피드백 자가 진단</h3>
                            <div className="grid md:grid-cols-3 gap-8">
                                <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100">
                                    <h4 className="text-xl font-bold text-blue-800 mb-6 flex items-center">
                                        학습 (Learning)
                                    </h4>
                                    <ul className="space-y-3 text-gray-700 list-disc pl-5">
                                        {["주의가 산만하고 집중이 안된다", "기억력이 떨어진다", "공부해도 성적이 오르지 않는다", "학습 능력이 떨어진다", "시험볼 때 불안하다", "항상 피곤하고 졸립다"].map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="bg-green-50 p-8 rounded-2xl border border-green-100">
                                    <h4 className="text-xl font-bold text-green-800 mb-6 flex items-center">
                                        뇌건강 (Health)
                                    </h4>
                                    <ul className="space-y-3 text-gray-700 list-disc pl-5">
                                        {["불면증이 있다", "언어 발달이 느리다", "말 표현을 잘 못한다", "두통이나 편두통이 심하다", "치매를 예방하고 싶다", "항상 피곤하고 졸립다"].map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="bg-red-50 p-8 rounded-2xl border border-red-100">
                                    <h4 className="text-xl font-bold text-red-800 mb-6 flex items-center">
                                        심리 (Emotion)
                                    </h4>
                                    <ul className="space-y-3 text-gray-700 list-disc pl-5">
                                        {["자주 우울하다", "감정 기복이 심하다", "심리적으로 불안하다", "안정이 안된다", "사람들과 어울리지 못한다", "강박관념이 있다"].map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tab 2: 뇌파훈련프로그램 (Program) */}
                {activeTab === '뇌파훈련프로그램' && (
                    <div className="animate-fadeIn">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold mb-4">체계적인 뇌파 훈련 시스템</h2>
                            <p className="text-gray-600">6단계 두뇌 활성화 프로그램과 개인 맞춤형 프로토콜을 제공합니다.</p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                { step: "1", title: "호흡 훈련 (Respiration)", desc: "몸과 마음을 이완시키고 뇌에 충분한 산소를 공급하여 훈련 준비 상태를 만듭니다." },
                                { step: "2", title: "기본 훈련 (Basic)", desc: "실시간 청각 피드백을 통해 뇌의 신경망을 발달시키는 기초 훈련 단계입니다." },
                                { step: "3", title: "집중력/순발력 (Focus)", desc: "활쏘기 등의 시각적 과제를 통해 전두엽 운동피질을 자극하고 주의력을 높입니다." },
                                { step: "4", title: "기억력 훈련 (Memory)", desc: "행성 배열 기억하기 등을 통해 작업 기억력과 단기 기억력을 집중적으로 향상시킵니다." },
                                { step: "5", title: "사고력 훈련 (Thinking)", desc: "7조각 퍼즐 맞추기 등으로 공간 지각력과 논리적 사고력을 배양합니다." },
                                { step: "6", title: "명상 훈련 (Meditation)", desc: "뇌를 깊은 휴식 상태로 유도하여 심신의 안정과 정서적 평온을 찾습니다." }
                            ].map((item, idx) => (
                                <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:-translate-y-1 transition-transform duration-300">
                                    <div className="flex items-center mb-4">
                                        <span className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-4">
                                            {item.step}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 text-gray-900">{item.title}</h3>
                                    <p className="text-gray-600 leading-relaxed text-sm">{item.desc}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-16 bg-blue-900 text-white p-10 rounded-3xl text-center">
                            <h3 className="text-2xl font-bold mb-6">대상별 맞춤형 프로그램</h3>
                            <div className="grid md:grid-cols-3 gap-8 text-left">
                                <div className="bg-blue-800 p-6 rounded-xl">
                                    <h4 className="font-bold text-lg mb-2 text-yellow-300">학생 프로그램</h4>
                                    <p className="text-blue-100 text-sm">주의 집중력 향상, 학습 능력 강화, 시험 불안 해소, 성적 향상 목표</p>
                                </div>
                                <div className="bg-blue-800 p-6 rounded-xl">
                                    <h4 className="font-bold text-lg mb-2 text-green-300">직장인 프로그램</h4>
                                    <p className="text-blue-100 text-sm">업무 스트레스 관리, 감정 노동 케어, 만성 피로 회복, 능률 향상</p>
                                </div>
                                <div className="bg-blue-800 p-6 rounded-xl">
                                    <h4 className="font-bold text-lg mb-2 text-pink-300">실버 프로그램</h4>
                                    <p className="text-blue-100 text-sm">치매 예방, 기억력 유지, 우울감 해소, 활기찬 노후 생활 지원</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tab 3: 뇌파훈련 누가할까요 (Target) */}
                {activeTab === '뇌파훈련 누가할까요' && (
                    <div className="animate-fadeIn space-y-12">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold mb-4">대상 및 효과</h2>
                            <p className="text-gray-600">다양한 증상과 목적에 맞춰 뇌기능을 최적화합니다.</p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                {
                                    category: "학습 및 집중력",
                                    items: ["주의산만, ADHD 의심", "집중력 저하, 시험 불안", "성적 향상 목적", "암기력/이해력 부족"],
                                    color: "blue"
                                },
                                {
                                    category: "정서 및 심리",
                                    items: ["우울, 불안, 강박증", "감정 기복이 심함", "대인기피, 사회성 부족", "분노 조절 장애"],
                                    color: "green"
                                },
                                {
                                    category: "뇌 건강 및 노화",
                                    items: ["불면증, 만성 피로", "두통, 어지럼증", "기억력 감퇴 (치매 예방)", "중풍/외상 후유증 재활"],
                                    color: "red"
                                }
                            ].map((card, idx) => (
                                <div key={idx} className={`bg-white rounded-2xl shadow-lg overflow-hidden border-t-4 border-${card.color}-500 flex flex-col h-full`}>
                                    <div className={`bg-${card.color}-50 p-6`}>
                                        <h3 className="text-xl font-bold text-gray-900">{card.category}</h3>
                                    </div>
                                    <div className="p-6 flex-1">
                                        <ul className="space-y-3">
                                            {card.items.map((item, i) => (
                                                <li key={i} className="flex items-center text-gray-600">
                                                    <span className={`w-2 h-2 rounded-full bg-${card.color}-400 mr-3 shrink-0`} />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Tab 4: 자가진단 (Self-Check) - INTERACTIVE DETAIL VIEW */}
                {activeTab === '자가진단(Self-Check)' && (
                    <div className="animate-fadeIn max-w-5xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold mb-4">자가 진단 체크리스트</h2>
                            <p className="text-gray-600">
                                아래 탭을 선택하여 각 항목별 자가진단을 진행해보세요.<br />
                                <span className="text-sm text-gray-400">* 본 테스트는 간이 검사이며, 정확한 진단은 센터 방문을 권장합니다.</span>
                            </p>
                        </div>

                        {/* Sub nav for Self-Check */}
                        <div className="flex justify-center gap-4 mb-10 overflow-x-auto pb-4">
                            {[
                                { id: 'PAT', label: '부모 양육 태도' },
                                { id: 'AdultChild', label: '성인아이 진단' },
                                { id: 'ADHD', label: '집중력(ADHD) 진단' }
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveSelfCheck(item.id)}
                                    className={`px-6 py-3 rounded-xl font-bold transition-all whitespace-nowrap ${activeSelfCheck === item.id
                                        ? 'bg-blue-600 text-white shadow-lg scale-105'
                                        : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'
                                        }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>

                        {/* Content Area for Active Self Check */}
                        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-blue-50">
                            {/* @ts-ignore - Dynamic key usage */}
                            <div className="mb-8">
                                {/* @ts-ignore */}
                                <h3 className="text-2xl font-bold text-blue-900 mb-2">{selfCheckData[activeSelfCheck].title}</h3>
                                {/* @ts-ignore */}
                                <p className="text-gray-600">{selfCheckData[activeSelfCheck].desc}</p>
                            </div>

                            <div className="space-y-4">
                                {/* @ts-ignore */}
                                {selfCheckData[activeSelfCheck].questions.map((q, idx) => (
                                    <div key={idx} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                                        <div className="w-6 h-6 rounded-full bg-white border-2 border-blue-200 flex flex-shrink-0 items-center justify-center text-xs font-bold text-blue-500 mt-0.5">
                                            {idx + 1}
                                        </div>
                                        <p className="text-gray-800 font-medium">{q}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-10 p-6 bg-blue-50 rounded-xl border border-blue-100 text-center">
                                {/* @ts-ignore */}
                                <p className="font-bold text-blue-800">{selfCheckData[activeSelfCheck].result}</p>
                            </div>
                        </div>

                    </div>
                )}

                {/* Tab 5: 뇌파훈련사례 (Cases) - Detailed View */}
                {activeTab === '뇌파훈련사례' && (
                    <div className="animate-fadeIn max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold mb-8 text-center">성공적인 변화 사례</h2>
                        <div className="grid gap-8">
                            {cases.map((story, idx) => (
                                <article key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                                    <header className="mb-6 border-b border-gray-100 pb-4">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="bg-[#EF9300] text-white text-xs px-2 py-1 rounded font-bold">CASE STUDY</span>
                                            <span className="text-sm text-gray-400">{story.date}</span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-[#00305B]">{story.title}</h3>
                                    </header>
                                    <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed whitespace-pre-wrap">
                                        {story.content}
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                )}

                {/* Tab 6: 뇌에서 답을 찾자 (Knowledge) - Detailed View */}
                {activeTab === '뇌에서 답을 찾자' && (
                    <div className="animate-fadeIn max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold mb-4">뇌에서 답을 찾자</h2>
                            <p className="text-center text-gray-600">뇌과학 전문가가 전하는 깊이 있는 칼럼</p>
                        </div>

                        <div className="grid gap-8">
                            {knowledges.map((post, idx) => (
                                <article key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded font-bold">COLUMN</span>
                                            <span className="text-sm text-gray-400">{post.date}</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-4">{post.title}</h3>
                                        <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{post.content}</p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
};

export default NeurofeedbackPage;
