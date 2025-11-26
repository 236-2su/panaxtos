import Image from "next/image"
import Link from "next/link"

export default function Header() {
    return (
        <div className="border-b border-[#eee] bg-white sticky top-0 z-50">
            <div className="default-container h-20 flex justify-between items-center">
                <div className="">
                    <Link href="/">
                        <Image src="/logo-black.png" alt="logo" width={154} height={34} priority />
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link
                        href="/about"
                        className="text-[16px] font-medium transition-colors hover:text-[#EF9300]"
                        style={{ color: 'var(--text-secondary)' }}
                    >
                        센터 소개
                    </Link>
                    <Link
                        href="/programs"
                        className="text-[16px] font-medium transition-colors hover:text-[#EF9300]"
                        style={{ color: 'var(--text-secondary)' }}
                    >
                        프로그램
                    </Link>
                    <Link
                        href="/reviews"
                        className="text-[16px] font-medium transition-colors hover:text-[#EF9300]"
                        style={{ color: 'var(--text-secondary)' }}
                    >
                        훈련 후기
                    </Link>
                    <Link
                        href="/location"
                        className="text-[16px] font-medium transition-colors hover:text-[#EF9300]"
                        style={{ color: 'var(--text-secondary)' }}
                    >
                        오시는 길
                    </Link>
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

                {/* Mobile Menu Button (Placeholder) */}
                <button className="md:hidden p-2">
                    <span className="text-2xl">☰</span>
                </button>
            </div>
        </div>
    )
}