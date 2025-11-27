'use client';

import { useBranch } from '@/hooks/useBranches';
import { useReviews } from '@/hooks/useReviews';
import Link from 'next/link';

export default function AboutPage() {
    // 진주 지사 ID 고정
    const BRANCH_ID = 'jinju';

    const { branch, isLoading: branchLoading, isError: branchError } = useBranch(BRANCH_ID);
    const { reviews, isLoading: reviewsLoading } = useReviews(BRANCH_ID);

    if (branchLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-main)' }}>
                <div className="text-xl" style={{ color: 'var(--text-secondary)' }}>로딩 중...</div>
            </div>
        );
    }

    if (branchError || !branch) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-main)' }}>
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-main)' }}>센터 정보를 불러올 수 없습니다</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>잠시 후 다시 시도해주세요.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-16 px-4" style={{ background: 'var(--bg-main)' }}>
            <div className="max-w-5xl mx-auto">
                {/* 센터 소개 헤더 */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-main)' }}>
                        파낙토스 진주센터 소개
                    </h1>
                    <p className="text-xl" style={{ color: 'var(--text-secondary)' }}>
                        과학적인 뇌파 검사와 맞춤형 훈련으로 여러분의 뇌 건강을 책임집니다.
                    </p>
                </div>

                {/* 원장님 소개 */}
                <div className="rounded-2xl p-8 mb-12" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        {branch.directorImg && (
                            <img
                                src={branch.directorImg}
                                alt={branch.directorName}
                                className="w-48 h-48 rounded-full object-cover"
                                style={{ border: '4px solid var(--color-accent)' }}
                            />
                        )}
                        <div className="flex-1 text-center md:text-left">
                            <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-main)' }}>
                                {branch.directorName} 원장
                            </h2>
                            <p className="text-xl font-semibold mb-4" style={{ color: 'var(--color-accent)' }}>
                                {branch.directorDesc}
                            </p>
                            <div className="space-y-2" style={{ color: 'var(--text-secondary)' }}>
                                <p>• 국가공인 브레인트레이너</p>
                                <p>• 뇌파 분석 전문가</p>
                                <p>• 아동/청소년 학습 능력 향상 전문</p>
                                <p>• 성인/노인 치매 예방 및 뇌 건강 관리</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 위치 및 연락처 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div className="rounded-2xl p-8" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                        <h3 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-main)' }}>
                            오시는 길
                        </h3>
                        <p className="mb-4 text-lg" style={{ color: 'var(--text-secondary)' }}>
                            📍 {branch.address}
                        </p>
                        <div className="flex gap-4">
                            {branch.mapSrc && (
                                <a
                                    href={branch.mapSrc}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 py-3 rounded-lg text-center font-semibold transition-all hover:opacity-90"
                                    style={{ background: 'var(--bg-secondary)', color: 'var(--text-main)', border: '1px solid var(--border-color)' }}
                                >
                                    지도 보기
                                </a>
                            )}
                        </div>
                    </div>

                    <div className="rounded-2xl p-8" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                        <h3 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-main)' }}>
                            상담 문의
                        </h3>
                        <p className="mb-2 text-lg" style={{ color: 'var(--text-secondary)' }}>
                            📞 전화: 055-123-4567
                        </p>
                        <p className="mb-6 text-lg" style={{ color: 'var(--text-secondary)' }}>
                            ⏰ 운영시간: 평일 10:00 - 19:00 (주말 예약제)
                        </p>
                        <Link
                            href={`/reservation?branch=${BRANCH_ID}`}
                            className="block w-full py-3 rounded-lg text-center font-semibold transition-all hover:opacity-90"
                            style={{ background: 'var(--color-accent)', color: 'var(--text-invert)' }}
                        >
                            온라인 상담 예약
                        </Link>
                    </div>
                </div>

                {/* 리뷰 섹션 */}
                <div className="rounded-2xl p-8" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-3xl font-bold" style={{ color: 'var(--text-main)' }}>
                            회원 후기
                        </h2>
                        <Link
                            href="/reviews"
                            className="text-sm font-semibold hover:underline"
                            style={{ color: 'var(--color-accent)' }}
                        >
                            전체 보기 →
                        </Link>
                    </div>

                    {reviewsLoading ? (
                        <p style={{ color: 'var(--text-secondary)' }}>로딩 중...</p>
                    ) : !reviews || reviews.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-lg mb-4" style={{ color: 'var(--text-secondary)' }}>아직 등록된 후기가 없습니다.</p>
                            <p className="text-sm" style={{ color: 'var(--text-secondary)', opacity: 0.7 }}>첫 번째 후기의 주인공이 되어보세요!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {reviews.map((review) => (
                                <div
                                    key={review.id}
                                    className="p-6 rounded-xl hover:shadow-md transition-shadow"
                                    style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <div>
                                            {review.title && (
                                                <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--text-main)' }}>
                                                    {review.title}
                                                </h3>
                                            )}
                                            <p className="font-semibold text-sm" style={{ color: 'var(--text-secondary)' }}>
                                                {review.author}
                                            </p>
                                        </div>
                                        <div className="flex gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i} style={{ color: i < review.rating ? 'var(--color-accent)' : 'var(--border-color)' }}>
                                                    ★
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <p className="whitespace-pre-wrap leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                        {review.comment}
                                    </p>
                                    <p className="text-sm mt-4 text-right" style={{ color: 'var(--text-secondary)', opacity: 0.7 }}>
                                        {new Date(review.createdAt).toLocaleDateString('ko-KR')}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
