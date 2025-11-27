'use client';

import { useReviews } from '@/hooks/useReviews';
import Link from 'next/link';

export default function ReviewsPage() {
    const BRANCH_ID = 'jinju';
    const { reviews, isLoading } = useReviews(BRANCH_ID);

    return (
        <div className="min-h-screen py-16 px-4" style={{ background: 'var(--bg-main)' }}>
            <div className="max-w-5xl mx-auto">
                {/* 헤더 */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-main)' }}>
                        훈련 후기
                    </h1>
                    <p className="text-xl mb-8" style={{ color: 'var(--text-secondary)' }}>
                        파낙토스 진주센터에서 훈련받으신 회원분들의 생생한 후기입니다.
                    </p>
                    <Link
                        href="/reviews/write"
                        className="inline-block px-6 py-3 rounded-lg font-bold text-white transition-all hover:opacity-90 shadow-md"
                        style={{ background: 'var(--color-accent)' }}
                    >
                        📝 후기 작성하기
                    </Link>
                </div>

                {/* 후기 목록 */}
                {isLoading ? (
                    <div className="text-center py-12">
                        <p style={{ color: 'var(--text-secondary)' }}>로딩 중...</p>
                    </div>
                ) : !reviews || reviews.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                        <p className="text-lg mb-4" style={{ color: 'var(--text-secondary)' }}>
                            아직 등록된 후기가 없습니다.
                        </p>
                        <p className="text-sm" style={{ color: 'var(--text-secondary)', opacity: 0.7 }}>
                            첫 번째 후기의 주인공이 되어보세요!
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {reviews.map((review) => (
                            <Link
                                key={review.id}
                                href={`/reviews/view?id=${review.id}`}
                                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer"
                            >
                                {/* 별점 */}
                                <div className="flex gap-1 mb-3">
                                    {[...Array(5)].map((_, i) => (
                                        <span
                                            key={i}
                                            className="text-xl"
                                            style={{ color: i < review.rating ? 'var(--color-accent)' : '#e5e7eb' }}
                                        >
                                            ★
                                        </span>
                                    ))}
                                </div>

                                {/* 제목 */}
                                {review.title && (
                                    <h3 className="text-lg font-bold mb-2 line-clamp-2" style={{ color: 'var(--text-main)' }}>
                                        {review.title}
                                    </h3>
                                )}

                                {/* 내용 미리보기 */}
                                <p className="text-sm mb-4 line-clamp-3" style={{ color: 'var(--text-secondary)' }}>
                                    {review.comment}
                                </p>

                                {/* 작성자 & 날짜 */}
                                <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
                                    <span className="font-medium">{review.author}</span>
                                    <span>{new Date(review.createdAt).toLocaleDateString('ko-KR')}</span>
                                </div>

                                {/* 더보기 힌트 */}
                                <div className="mt-3 text-sm text-[#EF9300] font-medium flex items-center gap-1">
                                    자세히 보기 <span>→</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {/* CTA */}
                <div className="mt-16 text-center p-8 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl">
                    <h3 className="text-2xl font-bold mb-4">무료 상담을 받아보세요</h3>
                    <p className="text-gray-600 mb-6">
                        전문가와의 1:1 상담으로 여러분에게 맞는 최적의 훈련 프로그램을 찾아드립니다.
                    </p>
                    <Link
                        href="/reservation"
                        className="inline-block px-8 py-4 rounded-lg font-bold text-white transition-all hover:scale-105 shadow-lg"
                        style={{ background: 'var(--color-accent)' }}
                    >
                        상담 예약하기 →
                    </Link>
                </div>
            </div>
        </div>
    );
}
