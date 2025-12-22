'use client';

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="border-b border-[#eee] bg-white sticky top-0 z-50">
            <div className="default-container h-20 flex justify-between items-center relative">
                <div className="">
                    <Link href="/">
                        <Image src="/logo-black.png" alt="logo" width={154} height={34} priority />
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link href="/about" className="text-[16px] font-medium transition-colors hover:text-[#EF9300] text-[#555]">센터 소개</Link>
                    <Link href="/neurofeedback" className="text-[16px] font-medium transition-colors hover:text-[#EF9300] text-[#555]">뉴로피드백</Link>
                    <Link href="/assessment" className="text-[16px] font-medium transition-colors hover:text-[#EF9300] text-[#555]">검사·기업 프로그램</Link>
                    <Link href="/reviews" className="text-[16px] font-medium transition-colors hover:text-[#EF9300] text-[#555]">훈련 후기</Link>
                    <Link href="/location" className="text-[16px] font-medium transition-colors hover:text-[#EF9300] text-[#555]">오시는 길</Link>
                    <Link
                        href="/reservation"
                        className="px-6 py-2.5 rounded-full text-[15px] font-bold transition-all hover:opacity-90 hover:scale-105"
                        style={{
                            background: '#EF9300',
                            color: '#fff',
                            boxShadow: '0 4px 12px rgba(239, 147, 0, 0.3)'
                        }}
                    >
                        상담 예약
                    </Link>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-2xl"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? '✕' : '☰'}
                </button>
            </div>

            {/* Mobile Navigation Dropdown */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-100 shadow-xl py-4 flex flex-col items-center gap-6 animate-fade-in-down z-40">
                    <Link href="/about" className="text-lg font-medium w-full text-center py-2 hover:bg-gray-50 text-[#333]" onClick={() => setIsMenuOpen(false)}>센터 소개</Link>
                    <Link href="/neurofeedback" className="text-lg font-medium w-full text-center py-2 hover:bg-gray-50 text-[#333]" onClick={() => setIsMenuOpen(false)}>뉴로피드백</Link>
                    <Link href="/assessment" className="text-lg font-medium w-full text-center py-2 hover:bg-gray-50 text-[#333]" onClick={() => setIsMenuOpen(false)}>검사·기업 프로그램</Link>
                    <Link href="/reviews" className="text-lg font-medium w-full text-center py-2 hover:bg-gray-50 text-[#333]" onClick={() => setIsMenuOpen(false)}>훈련 후기</Link>
                    <Link href="/location" className="text-lg font-medium w-full text-center py-2 hover:bg-gray-50 text-[#333]" onClick={() => setIsMenuOpen(false)}>오시는 길</Link>
                    <Link
                        href="/reservation"
                        className="px-8 py-3 rounded-full text-lg font-bold bg-[#EF9300] text-white shadow-md my-2"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        상담 예약
                    </Link>
                </div>
            )}
        </header>
    )
}