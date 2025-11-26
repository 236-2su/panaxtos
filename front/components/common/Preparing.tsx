// 준비중 페이지
export default function Preparing(){
    return(
        <div className="text-center py-40 flex flex-col items-center">
            <div className="w-35 h-35 text-[100px] text-[#084EA6] rounded-full border-6 border-[#084EA6] p-5 flex justify-center items-center">!</div>
            <p className="text-[32px] mt-6 mb-2">페이지 준비중입니다.</p>
            <p className="text-md">현재 페이지를 준비하고 있으니 조금만 기다려주세요<br/>감사합니다.</p>
        </div>
    )
}