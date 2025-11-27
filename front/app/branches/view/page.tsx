'use client';

import { useBranch } from '@/hooks/useBranches';
import { useReviews } from '@/hooks/useReviews';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function BranchDetailContent() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    const { branch, isLoading: branchLoading, isError: branchError } = useBranch(id || '');
    const { reviews, isLoading: reviewsLoading } = useReviews(id || '');

    if (!id) return <div className="text-center py-20">잘못된 접근입니다.</div>;

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
                    <h1 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-main)' }}>지사를 찾을 수 없습니다</h1>
                    <Link href="/branches" className="text-blue-500 hover:underline">
                        지사 목록으로 돌아가기
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-16 px-4" style={{ background: 'var(--bg-main)' }}>
            <div className="max-w-5xl mx-auto">
                {/* 헤더 */}
                <div className="mb-8">
                    <Link href="/branches" className="inline-block mb-4 hover:opacity-70" style={{ color: 'var(--color-accent)' }}>
                        ← 지사 목록으로
                    </Link>
                    <div className="rounded-2xl p-8" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            {branch.directorImg && (
                                <img
                                    src={branch.directorImg}
                                    alt={branch.directorName}
                                    className="w-32 h-32 rounded-full object-cover"
                                    style={{ border: '4px solid var(--color-accent)' }}
                                />
                            )}
                            <div className="flex-1 text-center md:text-left">
                                <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--text-main)' }}>
                                    {branch.name}
                                </h1>
                                <p className="text-xl font-semibold mb-2" style={{ color: 'var(--color-accent)' }}>
                                    {branch.directorName} 원장
                                </p>
                                <p style={{ color: 'var(--text-secondary)' }}>
                                    {branch.directorDesc}
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 pt-6" style={{ borderTop: '1px solid var(--border-color)' }}>
                            <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                                📍 {branch.address}
                            </p>
                            <div className="flex gap-4">
                                <a
                                    href={`/reservation?branch=${branch.id}`}
                                    className="px-6 py-3 rounded-lg font-semibold transition-all hover:opacity-90"
                                    style={{ background: 'var(--color-accent)', color: 'var(--text-invert)' }}
                                >
                                    상담 예약하기
                                </a>
                                {branch.mapSrc && (
                                    <a
                                        href={branch.mapSrc}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-6 py-3 rounded-lg font-semibold transition-all hover:opacity-90"
                                        style={{ background: 'var(--bg-secondary)', color: 'var(--text-main)', border: '1px solid var(--border-color)' }}
                                    >
                                        지도 보기
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 리뷰 섹션 */}
                <div className="rounded-2xl p-8" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                    <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--text-main)' }}>
                        고객 후기
                    </h2>

                    {reviewsLoading ? (
                        <p style={{ color: 'var(--text-secondary)' }}>로딩 중...</p>
                    ) : !reviews || reviews.length === 0 ? (
                        <p style={{ color: 'var(--text-secondary)' }}>아직 등록된 후기가 없습니다.</p>
                    ) : (
                        <div className="space-y-4">
                            {reviews.map((review) => (
                                <div
                                    key={review.id}
                                    className="p-6 rounded-xl"
                                    style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <p className="font-semibold" style={{ color: 'var(--text-main)' }}>
                                            {review.author}
                                        </p>
                                        <div className="flex gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i} style={{ color: i < review.rating ? 'var(--color-accent)' : 'var(--border-color)' }}>
                                                    ★
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <p style={{ color: 'var(--text-secondary)' }}>
                                        {review.comment}
                                    </p>
                                    <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)', opacity: 0.7 }}>
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

export default function BranchDetailPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <BranchDetailContent />
        </Suspense>
    );
}
