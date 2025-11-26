'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function BannerCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            image: '/banner/slide_1.png',
            title: '뇌를 알면 미래가 보입니다',
            subtitle: '과학적인 뇌 훈련으로 잠재력을 깨워보세요'
        },
        {
            image: '/banner/slide_2.png',
            title: '파낙토스 진주센터',
            subtitle: '전문가와 함께하는 맞춤형 두뇌 훈련'
        },
        {
            image: '/banner/slide_3.png',
            title: '체계적인 3단계 프로세스',
            subtitle: '검사 → 상담 → 맞춤 훈련'
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [slides.length]);

    return (
        <div className="relative h-[500px] w-full overflow-hidden bg-gray-900">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    {/* 배경 이미지 */}
                    <div className="relative w-full h-full">
                        <Image
                            src={slide.image}
                            alt={slide.title}
                            fill
                            className="object-cover opacity-80"
                            priority={index === 0}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
                    </div>

                    {/* 텍스트 */}
                    <div className="absolute inset-0 flex flex-col justify-center text-white px-10 md:px-20 max-w-4xl">
                        <h2 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg transform transition-all duration-700 translate-y-0 leading-tight">
                            {slide.title}
                        </h2>
                        <p className="text-xl md:text-3xl font-light drop-shadow-md opacity-90">
                            {slide.subtitle}
                        </p>
                    </div>
                </div>
            ))}

            {/* 인디케이터 */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white w-8' : 'bg-white/50 w-2'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
