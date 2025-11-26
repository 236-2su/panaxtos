'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function ProgramsPage() {
    const programs = [
        {
            id: 'child',
            title: '아동/청소년 집중력 & 학습 클리닉',
            desc: '산만한 우리 아이, 학습 효율이 오르지 않는 학생을 위한 맞춤형 두뇌 훈련입니다.',
            details: [
                '주의력결핍 과잉행동(ADHD) 및 충동성 조절',
                '학습 부진, 시험 불안, 집중력 저하 개선',
                '게임/스마트폰 중독 및 틱장애 케어',
                '정서 불안 및 사회성 발달 훈련'
            ],
            img: '/img/program_child.png'
        },
        {
            id: 'adult',
            title: '성인 스트레스 & 정서 클리닉',
            desc: '복잡한 현대 사회 속 지친 뇌를 쉬게 하고, 마음의 평화를 되찾아 드립니다.',
            details: [
                '우울증, 불안장애, 공황장애, 강박증 개선',
                '불면증 및 수면 장애, 만성 피로 회복',
                '화병, 분노 조절 장애, 감정 기복 완화',
                '브레인포그(머리가 멍한 증상) 및 기억력 감퇴 예방'
            ],
            img: '/img/program_adult.png'
        },
        {
            id: 'brain-edu',
            title: '뇌 건강 & 부모 교육',
            desc: '과학적인 뇌파 분석을 통해 나를 이해하고, 자녀를 올바르게 양육하는 방법을 제시합니다.',
            details: [
                '정량화 뇌파 검사(QEEG) 및 심층 상담',
                '부모 교육: 자녀의 뇌 기질 및 성향 파악',
                '뇌교육사 자격증 과정 및 전문가 양성',
                '치매 예방 및 노인 인지 기능 강화 훈련'
            ],
            img: '/img/program_analysis.png'
        }
    ];

    const trainingSteps = [
        {
            step: "STEP 1",
            title: "뇌기능 검사와 분석",
            items: ["심리·성격·인적성 분석", "뇌발달 분석", "건강상태 분석", "인지능력 분석"]
        },
        {
            step: "STEP 2",
            title: "심층 상담 진행",
            items: ["현재 문제점 파악", "증상 분석", "효과적 훈련 방법 제안", "목표 설정"]
        },
        {
            step: "STEP 3",
            title: "개인별 맞춤 훈련",
            items: ["개별 맞춤 설정", "지속적 모니터링", "주기적 재검사", "효과 확인"]
        }
    ];

    const programTypes = [
        { icon: "🧠", title: "스마트 브레인", desc: "뇌 신경망 발달 훈련" },
        { icon: "📚", title: "학습 능력", desc: "집중력·기억력 향상" },
        { icon: "💚", title: "두뇌 건강", desc: "스트레스 해소·치매 예방" },
        { icon: "🌿", title: "두뇌 힐링", desc: "정서 안정·휴식" }
    ];

    return (
        <div className="min-h-screen py-16 px-4" style={{ background: 'var(--bg-main)' }}>
            <div className="max-w-6xl mx-auto">
                {/* 헤더 */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-main)' }}>
                        파낙토스 진주센터 프로그램
                    </h1>
                    <p className="text-xl" style={{ color: 'var(--text-secondary)' }}>
                        뇌과학 기반의 전문적인 솔루션으로 여러분의 뇌 건강을 책임집니다.
                    </p>
                </div>

                {/* 프로그램 상세 */}
                <div className="space-y-16 mb-20">
                    {programs.map((program, index) => (
                        <div
                            key={program.id}
                            className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-center`}
                        >
                            {/* 이미지 영역 */}
                            <div className="w-full md:w-1/2 h-80 rounded-2xl overflow-hidden relative shadow-lg">
                                <Image
                                    src={program.img}
                                    alt={program.title}
                                    fill
                                    className="object-cover transition-transform duration-500 hover:scale-105"
                                />
                            </div>

                            {/* 텍스트 영역 */}
                            <div className="w-full md:w-1/2">
                                <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-main)' }}>
                                    {program.title}
                                </h2>
                                <p className="text-xl mb-6 font-medium" style={{ color: 'var(--color-accent)' }}>
                                    {program.desc}
                                </p>
                                <ul className="space-y-3 mb-8">
                                    {program.details.map((detail, i) => (
                                        <li key={i} className="flex items-start gap-3" style={{ color: 'var(--text-secondary)' }}>
                                            <span className="mt-1.5 w-2 h-2 rounded-full bg-[#EF9300] flex-shrink-0"></span>
                                            <span className="text-lg">{detail}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href={`/reservation?program=${program.id}`}
                                    className="inline-block px-6 py-3 rounded-lg font-semibold transition-all hover:opacity-90 shadow-md"
                                    style={{ background: 'var(--bg-secondary)', color: 'var(--text-main)', border: '1px solid var(--border-color)' }}
                                >
                                    상담 신청하기
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 훈련 프로세스 */}
                <section className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">훈련 프로세스</h2>
                        <p className="text-lg text-gray-600">과학적이고 체계적인 3단계 훈련 과정</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {trainingSteps.map((step, index) => (
                            <div
                                key={index}
                                className="relative p-6 bg-white border-2 border-gray-200 hover:border-[#EF9300] transition-all"
                            >
                                <div className="text-[#EF9300] font-bold text-sm mb-2">{step.step}</div>
                                <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                                <ul className="space-y-2">
                                    {step.items.map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-gray-700 text-sm">
                                            <span className="text-[#EF9300]">✓</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                {index < trainingSteps.length - 1 && (
                                    <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-2xl text-gray-300">
                                        →
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* 프로그램 타입 */}
                <section className="mb-20 p-10 rounded-2xl bg-gray-50">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">프로그램 유형</h2>
                        <p className="text-lg text-gray-600">목적에 맞는 최적의 프로그램</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {programTypes.map((type, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 border border-gray-200 hover:border-[#EF9300] transition-all hover:shadow-lg text-center"
                            >
                                <div className="text-4xl mb-3">{type.icon}</div>
                                <h3 className="text-lg font-bold mb-2">{type.title}</h3>
                                <p className="text-gray-600 text-sm">{type.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <div className="text-center p-12 rounded-3xl shadow-xl" style={{ background: 'linear-gradient(135deg, #fff 0%, #f9f9f9 100%)', border: '1px solid var(--border-color)' }}>
                    <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-main)' }}>
                        나에게 맞는 훈련이 궁금하신가요?
                    </h2>
                    <p className="text-lg mb-8" style={{ color: 'var(--text-secondary)' }}>
                        전문가와의 1:1 상담을 통해 정확한 상태를 파악하고 최적의 훈련 계획을 세워보세요.
                    </p>
                    <Link
                        href="/reservation"
                        className="inline-block px-10 py-4 rounded-xl text-xl font-bold transition-all hover:scale-105 shadow-lg"
                        style={{ background: 'var(--color-accent)', color: 'var(--text-invert)' }}
                    >
                        무료 상담 예약하기
                    </Link>
                </div>
            </div>
        </div>
    );
}
