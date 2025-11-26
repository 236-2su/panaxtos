import Link from "next/link"
import Image from "next/image"

export default function Footer() {
    return (
        <div className="bg-black p-10">
            <div className="default-container text-white/80 flex flex-col gap-5">
                <div className="flex justify-between items-center pb-5 border-b border-[#333]">
                    <ul className="flex items-center gap-7">
                        <li><Link href="#">이용약관</Link></li>
                        <li><Link href="#">개인정보처리방침</Link></li>
                    </ul>

                    {/* 사이트 연결 */}
                    <ul>
                        <li><Link href="#">네이버블로그</Link></li>
                    </ul>
                </div>
                <div className="flex justify-between items-end">
                    <Link href="/"><Image src="/logo.png" alt="logo" width={154} height={34} /></Link>
                    <Link href="/admin" className="text-xs text-white/40 hover:text-white transition-colors">관리자 페이지</Link>
                </div>
            </div>
        </div>
    )
}