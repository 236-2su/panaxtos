'use client';

import { useParams, useRouter } from 'next/navigation';
import useSWR from 'swr';
import { fetcher } from '@/lib/api';
import Link from 'next/link';



interface Review {
    id: number;
    branchId: string;
    author: string;
    title?: string;
    rating: number;
    comment: string;
    createdAt: string;
}

export default function ReviewDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { data: review, isLoading, error } = useSWR<Review>(
        `/api/reviews/${params.id}`,
        fetcher
    );

    const handleDelete = async () => {
        const password = prompt('후기 작성 시 설정한 비밀번호를 입력해주세요.');
        if (!password) return;

        try {
            await fetcher(`/api/reviews/${params.id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            });
            alert('후기가 삭제되었습니다.');
            router.push('/reviews');
        } catch (error: any) {
            alert(error.response?.data?.error || '삭제에 실패했습니다. 비밀번호를 확인해주세요.');
        }
    };

    const handleEdit = () => {
        router.push(`/reviews/${params.id}/edit`);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen py-16 px-4 flex items-center justify-center" style={{ background: 'var(--bg-main)' }}>
                <p style={{ color: 'var(--text-secondary)' }}>로딩 중...</p>
            </div>
        );
    }

    if (error || !review) {
        return (
            <div className="min-h-screen py-16 px-4 flex items-center justify-center" style={{ background: 'var(--bg-main)' }}>
                <div className="text-center">
                    <p className="text-xl mb-4" style={{ color: 'var(--text-main)' }}>후기를 찾을 수 없습니다.</p>
                    <Link href="/reviews" className="text-[#EF9300] hover:underline">
                        목록으로 돌아가기
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-16 px-4" style={{ background: 'var(--bg-main)' }}>
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <span>←</span> 목록으로
                    </button>
                    <div className="flex gap-2">
                        <button
                            onClick={handleEdit}
                            className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
                        >
                            수정
                        </button>
                        <button
                            onClick={handleDelete}
                            className="px-3 py-1 text-sm border border-red-200 text-red-600 rounded hover:bg-red-50"
                        >
                            삭제
                        </button>
                    </div>
                </div>

                <article className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
                    <header className="mb-8 pb-6 border-b border-gray-200">
                        {review.title && (
                            <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--text-main)' }}>
                                {review.title}
                            </h1>
                        )}

                        <div className="flex flex-wrap items-center gap-4 text-sm">
                            <div className="flex items-center gap-2">
                                <span className="font-semibold" style={{ color: 'var(--text-secondary)' }}>
                                    {review.author}
                                </span>
                            </div>

                            <div className="flex gap-1">
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

                            <span className="text-gray-400">
                                {new Date(review.createdAt).toLocaleDateString('ko-KR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </span>
                        </div>
                    </header>

                    <div className="prose max-w-none">
                        <p
                            className="whitespace-pre-wrap leading-relaxed text-lg"
                            style={{ color: 'var(--text-secondary)' }}
                        >
                            {review.comment}
                        </p>
                    </div>
                </article>

                <div className="mt-12 text-center p-8 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl">
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
