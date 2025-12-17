'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* 1. Hero Section: Full Width & Immersive */}
      <section className="relative h-[90vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 w-full h-full">
          <Image
            src="/images/center/living_room.png"
            alt="센터 메인 전경"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center text-white px-4">
          <div className="inline-block px-4 py-1 border border-white/30 rounded-full bg-white/10 backdrop-blur-sm mb-6 animate-fade-in-up">
            <span className="text-sm md:text-base font-medium">뇌과학이 여는 새로운 변화</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in-up delay-100 shadow-text">
            파낙토스 <span className="text-[#EF9300]">진주센터</span>
          </h1>
          <p className="text-lg md:text-2xl mb-12 text-gray-100 animate-fade-in-up delay-200 max-w-2xl mx-auto leading-relaxed font-light">
            당신의 뇌가 가진 무한한 잠재력,<br className="hidden md:block" />
            체계적인 <strong>뉴로피드백 훈련</strong>으로 깨워드립니다.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center animate-fade-in-up delay-300">
            <Link
              href="/about"
              className="px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-full font-semibold hover:bg-white hover:text-[#00305B] transition-all border border-white/50 w-full md:w-auto"
            >
              센터 소개
            </Link>
            <Link
              href="/reservation"
              className="px-8 py-4 bg-[#EF9300] text-white rounded-full font-semibold hover:bg-[#d88400] transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-[#EF9300]/50 hover:-translate-y-1 w-full md:w-auto"
            >
              상담 예약하기 →
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/70">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
        </div>
      </section>

      {/* 2. Features Section (Clickable Cards) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-[#EF9300] font-bold tracking-widest text-xs uppercase mb-3 block">Why Panaxtos</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#00305B]">
              왜 파낙토스일까요?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: '과학적인 뇌파 검사', desc: '최신 측정 장비를 통해 두뇌 상태를 정밀 분석합니다.', img: '/images/center/analyze_room.png' },
              { title: '맞춤형 훈련 프로그램', desc: '개인별 뇌 특성에 맞는 최적의 솔루션을 설계합니다.', img: '/images/center/play_room.png' },
              { title: '전문적인 심리 상담', desc: '풍부한 임상 경험의 센터장이 직접 케어합니다.', img: '/images/center/counsel_room.png' }
            ].map((item, idx) => (
              <div key={idx} className="block">
                <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-lg transition-all">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#00305B]/90 via-[#00305B]/40 to-transparent opacity-90"></div>
                  <div className="absolute bottom-0 left-0 p-8 text-white">
                    <div className="w-12 h-1 bg-[#EF9300] mb-4"></div>
                    <h3 className="text-2xl font-bold mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-200 text-sm line-clamp-2">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Programs Section - Carousel with Arrows (Above) & Hidden Scrollbar */}
      <section className="py-24 bg-[#F5F8FA] overflow-hidden relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <span className="text-[#EF9300] font-bold tracking-widest text-xs uppercase mb-3 block">Our Programs</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#00305B]">
                맞춤형 뇌 훈련 프로그램
              </h2>
              <p className="mt-4 text-gray-500">증상별 맞춤 프로그램을 확인해보세요.</p>
            </div>

            {/* Navigation Buttons (Positioned Top Right) */}
            <div className="flex gap-2 mt-6 md:mt-0 z-10">
              <button
                onClick={scrollLeft}
                className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#00305B] hover:text-white hover:border-transparent transition-all bg-white shadow-sm active:scale-95"
                aria-label="이전 프로그램"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
              </button>
              <button
                onClick={scrollRight}
                className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#00305B] hover:text-white hover:border-transparent transition-all bg-white shadow-sm active:scale-95"
                aria-label="다음 프로그램"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </button>
            </div>
          </div>

          {/* Scroll Container (Scrollbar Hidden) */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 scroll-smooth"
          >
            {/* 1. ADHD */}
            <div className="flex-none w-[85vw] md:w-[350px] snap-center">
              <div className="relative w-full h-[450px] rounded-[2rem] overflow-hidden shadow-md transition-all">
                <Image
                  src="/images/programs/adhd_focus_child.png"
                  alt="ADHD 집중력 훈련"
                  fill
                  className="object-cover transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 text-white">
                  <h3 className="text-2xl font-bold mb-3">ADHD / 집중력</h3>
                  <p className="text-gray-300 leading-relaxed text-sm">
                    산만함을 줄이고 자기조절능력을 키워 학습 효율을 높입니다.
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Insomnia/Emotion */}
            <div className="flex-none w-[85vw] md:w-[350px] snap-center">
              <div className="relative w-full h-[450px] rounded-[2rem] overflow-hidden shadow-md transition-all">
                <Image
                  src="/images/programs/sleep_calm_woman.png"
                  alt="불면증 및 정서조절"
                  fill
                  className="object-cover transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 text-white">
                  <h3 className="text-2xl font-bold mb-3">불면 / 우울 / 불안</h3>
                  <p className="text-gray-300 leading-relaxed text-sm">
                    뇌파 안정을 통해 정서적 편안함과 깊은 수면을 되찾습니다.
                  </p>
                </div>
              </div>
            </div>

            {/* 3. Brain Development */}
            <div className="flex-none w-[85vw] md:w-[350px] snap-center">
              <div className="relative w-full h-[450px] rounded-[2rem] overflow-hidden shadow-md transition-all">
                <Image
                  src="/images/programs/brain_development_student.png"
                  alt="뇌기능 발달"
                  fill
                  className="object-cover transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 text-white">
                  <h3 className="text-2xl font-bold mb-3">뇌기능 발달</h3>
                  <p className="text-gray-300 leading-relaxed text-sm">
                    두뇌의 정보처리 속도와 기억력을 향상시켜 학습 능력을 극대화합니다.
                  </p>
                </div>
              </div>
            </div>

            {/* 4. Dementia Prevention */}
            <div className="flex-none w-[85vw] md:w-[350px] snap-center">
              <div className="relative w-full h-[450px] rounded-[2rem] overflow-hidden shadow-md transition-all">
                <Image
                  src="/images/programs/dementia_prevention_senior.png"
                  alt="치매 예방"
                  fill
                  className="object-cover transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 text-white">
                  <h3 className="text-2xl font-bold mb-3">치매 예방</h3>
                  <p className="text-gray-300 leading-relaxed text-sm">
                    전두엽 기능을 활성화하여 인지 기능 저하를 막고 뇌 건강을 지킵니다.
                  </p>
                </div>
              </div>
            </div>

            {/* 5. Stress Relief */}
            <div className="flex-none w-[85vw] md:w-[350px] snap-center">
              <div className="relative w-full h-[450px] rounded-[2rem] overflow-hidden shadow-md transition-all">
                <Image
                  src="/images/programs/office_stress_relief.png"
                  alt="스트레스 케어"
                  fill
                  className="object-cover transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 text-white">
                  <h3 className="text-2xl font-bold mb-3">스트레스 케어</h3>
                  <p className="text-gray-300 leading-relaxed text-sm">
                    만성 피로와 번아웃을 해소하고 활기찬 일상을 회복합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Support Links & Footer Gap */}
      <div className="container mx-auto px-4 mb-32 mt-12">
        <div className="bg-white rounded-3xl p-8 border border-gray-100 flex flex-col lg:flex-row justify-between items-center gap-8 shadow-xl">
          <div className="flex flex-col md:flex-row items-center gap-4 w-full lg:w-auto">
            <div className="text-center md:text-left mb-2 md:mb-0 mr-4">
              <h3 className="text-lg font-bold text-[#00305B] mb-1">고객 서비스</h3>
              <p className="text-sm text-gray-500">본사 소개 및 자료실</p>
            </div>
            <a
              href="https://www.panaxtos.com/m_inc.php?mk=corp_info"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-gray-50 text-gray-700 rounded-xl hover:bg-[#00305B] hover:text-white transition-all font-bold text-sm w-full md:w-auto justify-center"
            >
              파낙토스 본사 소개
            </a>
            <a
              href="https://www.panaxtos.com/m_board.php?mk=cust_download&ps_db=&"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-gray-50 text-gray-700 rounded-xl hover:bg-[#00305B] hover:text-white transition-all font-bold text-sm w-full md:w-auto justify-center"
            >
              자료실 (다운로드)
            </a>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6 w-full lg:w-auto">
            <div className="text-center md:text-right">
              <p className="text-[#EF9300] text-xs mb-1 uppercase font-bold tracking-wider">Contact Us</p>
              <p className="text-3xl font-bold text-[#00305B] leading-none mb-1">055-920-2937</p>
              <p className="text-xs text-gray-400">평일 10:00 - 19:00 (공휴일 휴무)</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="bg-[#00305B] text-white py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/images/center/play_room.png')] bg-cover bg-center bg-fixed"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">변화는 뇌에서 시작됩니다</h2>
          <Link
            href="/reservation"
            className="inline-block px-12 py-5 bg-[#EF9300] text-white rounded-full font-bold text-xl hover:bg-[#d88400] transition-all shadow-xl hover:-translate-y-1"
          >
            상담 예약하기
          </Link>
        </div>
      </section>
    </main>
  )
}
