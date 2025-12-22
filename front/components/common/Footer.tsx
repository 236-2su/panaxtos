import Link from "next/link"
import Image from "next/image"

export default function Footer() {
    return (
        <footer className="py-16 text-white" style={{ background: '#111111' }}>
            <div className="default-container">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand Section */}
                    <div className="md:col-span-1">
                        <Link href="/" className="inline-block mb-6">
                            <Image src="/logo.png" alt="파낙토스" width={180} height={40} className="brightness-0 invert" style={{ opacity: 0.9 }} />
                        </Link>
                        <p className="text-white/60 text-sm leading-relaxed">
                            뇌과학 기반의 전문적인 두뇌 훈련으로<br />
                            여러분의 건강과 행복을 지켜드립니다.
                        </p>
                    </div>

                    {/* Contact Info */}
                    <div className="md:col-span-2">
                        <h4 className="font-bold text-lg mb-4 text-[#EF9300]">CONTACT</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8 text-sm text-white/80">
                            <div>
                                <span className="opacity-50 inline-block w-16">센터명</span>
                                <div>
                                    <span>다온통합뇌심리센터</span><br />
                                    <span className="text-xs opacity-70">(파낙토스 통합뇌센터 진주점)</span>
                                </div>
                            </div>
                            <div>
                                <span className="opacity-50 inline-block w-16">대표자</span>
                                <span>김희영</span>
                            </div>
                            <div>
                                <span className="opacity-50 inline-block w-16">전화</span>
                                <span>055-920-2937</span>
                            </div>
                            <div>
                                <span className="opacity-50 inline-block w-16">팩스</span>
                                <span>055-746-0152</span>
                            </div>
                            <div>
                                <span className="opacity-50 inline-block w-16">이메일</span>
                                <span>bada811@hanmail.net</span>
                            </div>
                            <div className="col-span-2 mt-2">
                                <span className="opacity-50 inline-block w-16">운영시간</span>
                                <span>평일 10:00~19:00 (점심 12:00~13:30)</span><br />
                                <span className="opacity-50 inline-block w-16"></span>
                                <span className="text-[#EF9300]">※ 일요일, 월요일, 공휴일 휴무</span>
                            </div>
                            <div className="col-span-2">
                                <span className="opacity-50 inline-block w-16">주소</span>
                                <span>경남 진주시 순환로 529, 영성빌딩 501호</span>
                            </div>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-bold text-lg mb-4 text-[#EF9300]">LINKS</h4>
                        <ul className="space-y-2 text-sm text-white/70">
                            <li><Link href="/about" className="hover:text-white transition-colors">센터 소개</Link></li>
                            <li><Link href="/neurofeedback" className="hover:text-white transition-colors">뉴로피드백</Link></li>
                            <li><Link href="/assessment" className="hover:text-white transition-colors">검사·기업 프로그램</Link></li>
                            <li><Link href="/reviews" className="hover:text-white transition-colors">훈련 후기</Link></li>
                            <li><Link href="/location" className="hover:text-white transition-colors">오시는 길</Link></li>
                            <li><Link href="/reservation" className="hover:text-white transition-colors">상담 예약</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
                    <div className="flex gap-6">
                        <span>사업자등록번호: 563-19-01477</span>
                        <span>Copyright © Panaxtos Jinju. All rights reserved.</span>
                    </div>
                    <div className="flex gap-6 items-center">
                        <a href="https://blog.naver.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white/80 transition-colors">
                            네이버 블로그
                        </a>
                        <Link href="/admin" className="hover:text-white/80 transition-colors">
                            관리자 페이지
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}