'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { fetcher } from '@/lib/api';
import useSWR from 'swr';

export default function EditReviewPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id;

    const { data: review, error } = useSWR<any>(id ? `/api/reviews/${id}` : null, fetcher);

    const [formData, setFormData] = useState({
        title: '',
        author: '',
        password: '',
        content: '',
        rating: 5,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (review) {
            setFormData({
                title: review.title || '',
                author: review.author || '',
                password: '', // 비밀번호는 비워둠
                content: review.comment || '',
                rating: review.rating || 5,
            });
        }
    }, [review]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await fetcher(`/api/reviews/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    comment: formData.content // API expects 'comment'
                })
            });

            alert('후기가 수정되었습니다.');
            router.push(`/reviews/${id}`);
        } catch (error: any) {
            alert(error.response?.data?.error || '후기 수정에 실패했습니다. 비밀번호를 확인해주세요.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (error) return <div className="text-center py-20">후기를 불러오는데 실패했습니다.</div>;
    if (!review) return <div className="text-center py-20">로딩 중...</div>;

    return (
        <div className="min-h-screen py-16 px-4" style={{ background: 'var(--bg-main)' }}>
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-center">훈련 후기 수정</h1>

                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">제목</label>
                            <input
                                type="text"
                                name="title"
                                required
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">작성자</label>
                                <input
                                    type="text"
                                    name="author"
                                    required
                                    value={formData.author}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none"
                                    readOnly // 작성자는 수정 불가하게 할 수도 있음
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">비밀번호 (확인용)</label>
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none"
                                    placeholder="작성 시 비밀번호 입력"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">평점</label>
                            <select
                                name="rating"
                                value={formData.rating}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none"
                            >
                                <option value="5">⭐⭐⭐⭐⭐ (5점)</option>
                                <option value="4">⭐⭐⭐⭐ (4점)</option>
                                <option value="3">⭐⭐⭐ (3점)</option>
                                <option value="2">⭐⭐ (2점)</option>
                                <option value="1">⭐ (1점)</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">내용</label>
                            <textarea
                                name="content"
                                required
                                rows={6}
                                value={formData.content}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none resize-none"
                            />
                        </div>

                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={() => router.back()}
                                className="w-1/3 py-4 rounded-lg font-bold border border-gray-300 hover:bg-gray-50 transition-colors"
                            >
                                취소
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-2/3 py-4 rounded-lg font-bold text-white transition-all hover:opacity-90 disabled:opacity-50"
                                style={{ background: 'var(--color-accent)' }}
                            >
                                {isSubmitting ? '수정 완료' : '후기 수정하기'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
