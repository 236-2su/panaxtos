'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function WriteReview() {
    const router = useRouter();
    const [form, setForm] = useState({
        title: '',
        author: '',
        content: '',
        rating: 5
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 관리자 페이지에서 접근하므로 토큰 확인 (선택사항이지만 권장)
        const token = localStorage.getItem('token');

        try {
            await axios.post('/api/reviews', {
                title: form.title,
                author: form.author,
                comment: form.content,
                rating: form.rating,
                branchId: 'jinju-center'
            });
            alert('후기가 등록되었습니다.');
            router.push('/about'); // 후기 목록이 있는 페이지로 이동
        } catch (err) {
            console.error(err);
            alert('등록 실패: ' + (err as any).message);
        }
    };

    return (
        <div className="default-container py-10 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">훈련 후기 작성</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-bold mb-2">제목</label>
                    <input
                        type="text"
                        className="w-full p-3 border rounded focus:outline-none focus:border-[#EF9300]"
                        value={form.title}
                        onChange={e => setForm({ ...form, title: e.target.value })}
                        placeholder="예: ADHD 아동 6개월 훈련 후기"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold mb-2">작성자 (표시용)</label>
                    <input
                        type="text"
                        className="w-full p-3 border rounded focus:outline-none focus:border-[#EF9300]"
                        value={form.author}
                        onChange={e => setForm({ ...form, author: e.target.value })}
                        placeholder="예: 김OO 회원님 어머니"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold mb-2">내용</label>
                    <textarea
                        className="w-full p-3 border rounded h-64 focus:outline-none focus:border-[#EF9300]"
                        value={form.content}
                        onChange={e => setForm({ ...form, content: e.target.value })}
                        placeholder="상세한 훈련 과정과 변화 내용을 적어주세요."
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-4 bg-[#EF9300] text-white font-bold rounded hover:bg-[#d68400] transition-colors"
                >
                    등록하기
                </button>
            </form>
        </div>
    );
}
