'use client';

import Image from "next/image";
import Link from "next/link";

interface BrandLogoProps {
    variant?: 'light' | 'dark'; // 'light' for white background (Header), 'dark' for dark background (Footer)
}

export default function BrandLogo({ variant = 'light' }: BrandLogoProps) {
    const isDark = variant === 'dark';

    // Theme configuration based on variant
    const mainTextColor = isDark ? 'text-white' : 'text-[#1a1a1a]';
    const subTextColor = isDark ? 'text-[#4d9fff]' : 'text-[#0066cc]';
    const subTextOpacity = isDark ? 'text-opacity-90' : '';
    const imageShadow = isDark ? 'shadow-md shadow-black/20' : 'shadow-sm';

    return (
        <Link href="/" className="flex items-center gap-3 group">
            {/* Symbol Image */}
            <div className={`relative overflow-hidden rounded-lg ${imageShadow} bg-white flex-shrink-0`}>
                <Image
                    src="/logo-symbol.jpg"
                    alt="다온통합뇌심리센터 심볼"
                    width={48}
                    height={48}
                    className="object-cover"
                    style={{ width: '48px', height: '48px' }}
                    priority
                />
            </div>

            {/* Text Content */}
            <div className="flex flex-col justify-center">
                <span className={`text-[19px] font-bold tracking-tight leading-tight transition-colors group-hover:text-[#1E7BC8] ${mainTextColor}`}>
                    다온통합 뇌심리센터
                </span>
                <span className={`text-[13px] font-medium tracking-wide ${subTextColor} ${subTextOpacity}`}>
                    마음과 뇌의 균형을 키우다
                </span>
            </div>
        </Link>
    );
}
