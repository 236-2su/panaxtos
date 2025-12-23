'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { fetcher } from '@/lib/api';
import { mutate } from 'swr';

export default function ReservationForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const branchId = searchParams.get('branch') || 'jinju';
    const [isSubmitting, setIsSubmitting] = useState(false);

    const today = new Date().toISOString().split('T')[0];

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        password: '',
        date: '',
        time: '',
        notes: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const dateTime = `${formData.date}T${formData.time}:00`;
            await fetcher('/api/reservations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    branchId,
                    name: formData.name,
                    phone: formData.phone,
                    password: formData.password,
                    dateTime,
                    notes: formData.notes,
                }),
            });
            alert('상담 예약이 완료되었습니다.');
            setFormData({ name: '', phone: '', password: '', date: '', time: '', notes: '' });
            // Revalidate the list
            await mutate(`/api/reservations?branchId=${branchId}`, undefined, { revalidate: true });
            router.push('/reservation');
        } catch (error: any) {
            console.error('Reservation failed:', error);
            alert(error.response?.data?.error || '예약 신청 중 오류가 발생했습니다.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen py-16 px-4" style={{ background: 'var(--bg-main)' }}>
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-main)' }}>
                        상담 예약 신청
                    </h1>
                    <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
                        편하신 시간에 전문가와 상담하세요.
                    </p>
                </div>

                <div className="rounded-2xl p-8 shadow-lg h-fit bg-white" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">이름</label>
                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:outline-none"
                                placeholder="예약자 성함"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">연락처</label>
                            <input
                                type="tel"
                                name="phone"
                                required
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:outline-none"
                                placeholder="010-1234-5678"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">비밀번호 (확인/취소용)</label>
                            <input
                                type="password"
                                name="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:outline-none"
                                placeholder="비밀번호 4자리 이상"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">예약 날짜</label>
                            <input
                                type="date"
                                name="date"
                                required
                                min={today}
                                value={formData.date}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">예약 시간</label>
                            <select
                                name="time"
                                required
                                value={formData.time}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:outline-none"
                            >
                                <option value="">시간 선택</option>
                                <option value="10:00">10:00</option>
                                <option value="11:00">11:00</option>
                                <option value="13:00">13:00</option>
                                <option value="14:00">14:00</option>
                                <option value="15:00">15:00</option>
                                <option value="16:00">16:00</option>
                                <option value="17:00">17:00</option>
                                <option value="18:00">18:00</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">비고</label>
                            <textarea
                                name="notes"
                                rows={3}
                                value={formData.notes}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:outline-none resize-none"
                                placeholder="문의사항이 있으시면 남겨주세요."
                            />
                        </div>
                        <div className="flex gap-4 mt-6">
                            <button
                                type="button"
                                onClick={() => router.back()}
                                className="flex-1 py-3 rounded-lg font-bold border border-gray-300 hover:bg-gray-50 transition-all text-gray-700"
                            >
                                취소
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 py-3 rounded-lg font-bold text-white transition-all hover:opacity-90 disabled:opacity-50"
                                style={{ background: 'var(--color-accent)' }}
                            >
                                {isSubmitting ? '처리중...' : '예약 신청하기'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
