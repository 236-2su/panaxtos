import LinkButtons from "@/components/home/LinkButtons";
import BrainPD from "@/components/home/BrainPD";
import BannerCarousel from "@/components/home/BannerCarousel";
import Link from "next/link";

export default function Home() {
  const trainingSteps = [
    {
      step: "STEP 1",
      title: "뇌기능 검사와 분석",
      desc: "뉴로하모니S로 뇌파 테스트 진행",
      features: ["심리·성격·인적성 분석", "뇌발달 분석", "건강상태 분석", "인지능력 분석"]
    },
    {
      step: "STEP 2",
      title: "심층 상담 진행",
      desc: "검사 결과 기반 맞춤 상담",
      features: ["현재 문제점 파악", "증상 분석", "효과적 훈련 방법 제안", "목표 설정"]
    },
    {
      step: "STEP 3",
      title: "개인별 맞춤 훈련",
      desc: "맞춤형 프로그램 설정 및 진행",
      features: ["개별 맞춤 설정", "지속적 모니터링", "주기적 재검사", "효과 확인"]
    }
  ];

  const programCategories = [
    {
      icon: "🧠",
      title: "스마트 브레인 만들기",
      desc: "뇌 신경망 발달에 초점을 맞춘 훈련프로그램"
    },
    {
      icon: "📚",
      title: "학습 능력 업그레이드",
      desc: "주의집중력과 기억력, 연합능력 향상에 최적화"
    },
    {
      icon: "💚",
      title: "두뇌 건강",
      desc: "정서안정, 스트레스 해소, 숙면 및 치매 예방"
    },
    {
      icon: "🌿",
      title: "두뇌 힐링",
      desc: "휴식이 필요한 분들을 위한 뇌 힐링 프로그램"
    }
  ];

  return (
    <div className="flex flex-col gap-20">
      {/* 배너 카루셀 */}
      <BannerCarousel />

      {/* 버튼들 */}
      <LinkButtons />

      {/* 파낙토스 PD */}
      <BrainPD />

      {/* 훈련 프로세스 */}
      <section className="default-container py-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">훈련 프로세스</h2>
          <p className="text-xl text-gray-600">과학적이고 체계적인 3단계 훈련 과정</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trainingSteps.map((item, index) => (
            <div
              key={index}
              className="relative p-8 bg-white border-2 border-gray-200 hover:border-[#EF9300] transition-all duration-300 hover:shadow-xl"
            >
              <div className="text-[#EF9300] font-bold text-sm mb-2">{item.step}</div>
              <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
              <p className="text-gray-600 mb-6">{item.desc}</p>
              <ul className="space-y-2">
                {item.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700">
                    <span className="text-[#EF9300] mt-1">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {index < trainingSteps.length - 1 && (
                <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 text-3xl text-gray-300">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 프로그램 카테고리 */}
      <section className="py-10 bg-gray-50">
        <div className="default-container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">맞춤형 훈련 프로그램</h2>
            <p className="text-xl text-gray-600">목적에 맞는 최적의 프로그램을 선택하세요</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programCategories.map((program, index) => (
              <div
                key={index}
                className="bg-white p-8 border border-gray-200 hover:border-[#EF9300] transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
              >
                <div className="text-5xl mb-4">{program.icon}</div>
                <h3 className="text-xl font-bold mb-3">{program.title}</h3>
                <p className="text-gray-600 leading-relaxed">{program.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/programs"
              className="inline-block px-10 py-4 bg-[#EF9300] text-white text-lg font-bold rounded hover:bg-[#d68400] transition-all shadow-lg hover:shadow-xl"
            >
              전체 프로그램 보기 →
            </Link>
          </div>
        </div>
      </section>

      {/* 진주 지사 소개 섹션 */}
      <div className="default-container text-center py-20">
        <h2 className="text-5xl font-bold mb-6" style={{ color: 'var(--text-main)' }}>
          파낙토스 진주센터
        </h2>
        <p className="text-xl mb-12 max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          뇌과학 기반의 전문적인 두뇌 훈련으로<br />
          여러분의 뇌 건강과 잠재력을 깨워드립니다.
        </p>
        <div className="flex justify-center gap-6">
          <Link
            href="/about"
            className="px-10 py-4 rounded text-lg font-semibold transition-all hover:opacity-80 border-2"
            style={{
              background: 'transparent',
              color: 'var(--text-main)',
              borderColor: 'var(--text-main)'
            }}
          >
            센터 소개
          </Link>
          <Link
            href="/reservation?branch=jinju-center"
            className="px-10 py-4 rounded text-lg font-semibold transition-all hover:opacity-90 hover:shadow-lg"
            style={{ background: 'var(--color-accent)', color: 'var(--text-invert)' }}
          >
            상담 예약하기 →
          </Link>
        </div>
      </div>
    </div>
  );
}
