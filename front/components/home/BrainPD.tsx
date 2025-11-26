"use client";

import Image from "next/image";
import { useState } from "react";

const brainDescriptions = [
  {
    title: "어린이 성장 컨설팅",
    description: "정서 및 언어 등이 발달하는 시기에 발생할 수 있는<br> ADHD/ADD, 난독증, 정서불안, 언어장애, 틱장애, 발달장애 등<br> 두뇌 문제와 관련해 맞춤 컨설팅을 진행합니다.",
    imageUrl: "/brainPD/brainPD-1.png",
  },
  {
    title: "청소년 학습 컨설팅",
    description:
      "공부에 집중하는 시기인 초/중/고등학생을 위한 학습 컨설팅을 진행합니다. 고객의 두뇌 상태를 측정하고 집중력, 주의력, 휴식 등 개인에게 필요한 학습 방향을 설정해 관리합니다. 더불어 학습은 물론 학업 과정에서 얻는 스트레스 등 정서적인 부분도 함께 상담 진행합니다.",
    imageUrl: "/brainPD/brainPD-2.png",
  },
  {
    title: "청년 건강 컨설팅",
    description:
      "현대인이라면 누구나 가지고 있는 스트레스, 만성피로, 우울증 등의 완화를 위해 개별 맞춤 컨설팅을 진행합니다. 직장인 특성 상 센터 방문이 어려운 분들을 위해 원격 지원도 가능.",
    imageUrl: "/brainPD/brainPD-3.png",
  },
  {
    title: "중장년 노후 컨설팅",
    description:
      "100세 시대에 치매, 우울, 기억력 저하 예방을 위한 컨설팅을 진행합니다. 뉴로피드백 훈련으로 두뇌 활력과 삶의 질 향상을 돕습니다.",
    imageUrl: "/brainPD/brainPD-4.png",
  },
];

export default function BrainPD() {
  const [active, setActive] = useState(0);
  const current = brainDescriptions[active];

  return (
    <section className="">
        <h1>파낙토스 브레인 PD</h1>
        <div className="grid grid-cols-2 gap-16 mt-10">
            {/* 리스트 */}
            <div className="space-y-10 pr-10 pt-6">
            {brainDescriptions.map((item, i) => (
                <div
                    key={item.title}
                    className="group cursor-pointer"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    tabIndex={0}
                >
                    <div className="relative pb-2 w-full">
                        <h2 className={`font-extrabold tracking-tight transition-colors ${
                            active === i ? "text-[#EF9300]" : "hover:text-[#EF9300]"
                        }`}
                        >
                        {item.title}
                        </h2>
                        <span className={`absolute left-0 -bottom-1.5 h-[1px] bg-[#FEBE10] transition-all duration-500 ease-out ${
                            active === i ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                        />
                    </div>

                    <div className={`overflow-hidden transition-[padding] duration-400 ease-out ${
                        active === i ? "px-4 py-5" : "p-0"
                        }`}
                    >
                        {active === i && (
                        <p className=""
                            dangerouslySetInnerHTML={{ __html: item.description }}
                        />
                        )}
                    </div>
                </div>
            ))}
            </div>

            {/* 이미지 */}
            <div className="flex items-start justify-center">
                <div className="relative w-full aspect-[4/3] overflow-hidden rounded-md shadow-lg">
                    <Image
                        key={current.imageUrl}
                        src={current.imageUrl}
                        alt={`${current.title} 이미지`}
                        fill
                        className="object-cover transition-all duration-700 ease-in-out"
                        priority
                    />
                </div>
            </div>
        </div>
    </section>
  );
}
