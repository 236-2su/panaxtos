import Image from "next/image"

interface ReviewItem { sub: string; description: string; imageUrl: string; }

const data: ReviewItem[] = [
    // {
    //     sub:"집중력",
    //     description:"원장님 덕택에 우리 00 이가 완전히 달라졌어요 믿고 신뢰하고 따라오길 정말 잘했어요 정말 감사드립니다. 우리 00 이 같이 학교 적응과 숙제과제를 못하는 학생들이 센터를 찾아와서 다시 의욕을 찾고 활기찬 생활을 하길 바래요 다시금 원장님 감사해요",
    //     imageUrl:"/noimage.png",
    // }
]

export default function Review() {
    return(
        <div>
            <h1>사용 후기</h1>
            {data && data.length > 0 ? (
                <div className="grid grid-cols-2 gap-5 mt-10">
                    {data.map((item, index) => (
                    <div
                        key={index}
                        className="flex gap-8 border border-[#eee] rounded-md py-4 px-6"
                    >
                        <div className="border border-[#eee] rounded-lg overflow-hidden min-w-[120px] h-[120px] relative">
                        <Image
                            src={item.imageUrl}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="120px"
                        />
                        </div>
                        <div className="py-3">
                        <h3>[{item.sub}]</h3>
                        <p className="text-sm mt-2">
                            {item.description.length > 110
                            ? `${item.description.slice(0, 110)}...`
                            : item.description}
                        </p>
                        </div>
                    </div>
                    ))}
                </div>
                ) : (
                <div className="text-center py-10 text-gray-800 mt-10">
                    회원 후기가 없습니다.
                </div>
                )}
        </div>
    )
}