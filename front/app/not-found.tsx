import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <h2 className="text-4xl font-bold mb-4 text-[#00305B]">페이지를 찾을 수 없습니다</h2>
            <p className="text-gray-600 mb-8">요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.</p>
            <Link
                href="/"
                className="px-6 py-3 bg-[#EF9300] text-white rounded-lg font-bold hover:bg-[#d68400] transition-colors"
            >
                홈으로 돌아가기
            </Link>
        </div>
    )
}
