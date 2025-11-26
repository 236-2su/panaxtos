import Link from "next/link";

export default function LinkButtons() {
  return (
    <div className="default-container">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 파낙토스 소개 */}
        <div className="flex flex-col items-center text-center p-8 border border-gray-200 rounded-lg bg-[#FEBD0C] hover:shadow-lg transition-all">
          <h2 className="text-2xl font-bold mb-3">파낙토스란?</h2>
          <p className="text-sm mb-6 opacity-90">
            두뇌 건강과 활성화를 위한<br />뉴로피드백 시스템 전문 기업
          </p>
          <Link
            className="inline-block px-6 py-2 text-sm font-bold bg-white/20 border-2 border-black/10 rounded hover:bg-white/40 transition"
            href="https://www.panaxtos.com/m_inc.php?mk=corp_info"
            target="_blank"
            rel="noopener noreferrer">
            자세히보기
          </Link>
        </div>

        {/* 프로그램 설치 */}
        <div className="flex flex-col items-center text-center p-8 border border-gray-200 rounded-lg bg-white hover:shadow-lg transition-all">
          <h2 className="text-2xl font-bold mb-3">프로그램 설치</h2>
          <p className="text-sm mb-6 text-gray-600">
            뉴로피드백 훈련을 위한<br />필수 프로그램 다운로드
          </p>
          <Link
            className="inline-block px-6 py-2 text-sm font-bold bg-gray-100 border-2 border-gray-200 rounded hover:bg-gray-200 transition"
            href="https://www.panaxtos.com/m_board.php?mk=cust_download&ps_db=&"
            target="_blank"
            rel="noopener noreferrer">
            다운로드 바로가기
          </Link>
        </div>
      </div>
    </div>
  );
}
