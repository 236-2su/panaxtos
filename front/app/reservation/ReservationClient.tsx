// 'use client' directive for client-side component
'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import { mutate } from 'swr';
import { fetcher } from '@/lib/api';

export default function ReservationClient() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const branchId = searchParams.get('branch') || 'jinju';

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        password: '',
        date: '',
        time: '',
        notes: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch reservation list (SWR)
    const { data: reservations = [], error } = useSWR<any[]>(`/api/reservations?branchId=${branchId}`, fetcher);

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
            // 강제로 데이터 재검증
            await mutate(`/api/reservations?branchId=${branchId}`, undefined, { revalidate: true });
        } catch (error: any) {
            console.error('Reservation failed:', error);
            alert(error.response?.data?.error || '예약 신청 중 오류가 발생했습니다.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: number) => {
        const password = prompt('예약 시 설정한 비밀번호를 입력해주세요.');
        if (!password) return;
        try {
            await fetcher(`/api/reservations/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });
            alert('예약이 취소되었습니다.');
            // 강제로 데이터 재검증
            await mutate(`/api/reservations?branchId=${branchId}`, undefined, { revalidate: true });
        } catch (error: any) {
            alert(error.response?.data?.error || '예약 취소에 실패했습니다. 비밀번호를 확인해주세요.');
        }
    };

    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="min-h-screen py-16 px-4" style={{ background: 'var(--bg-main)' }}>
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-main)' }}>
                        상담 예약 신청
                    </h1>
                    <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
                        편하신 시간에 전문가와 상담하세요.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    {/* 예약 폼 */}
                    <div className="rounded-2xl p-8 shadow-lg h-fit" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                        <h2 className="text-xl font-bold mb-6">예약하기</h2>
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
                                    placeholder="홍길동"
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
                                <label className="block text-sm font-medium mb-1">비밀번호 (수정/취소용)</label>
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:outline-none"
                                    placeholder="4자리 이상"
                                    minLength={4}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="block text-sm font-medium mb-1">날짜</label>
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
                                    <label className="block text-sm font-medium mb-1">시간</label>
                                    <select
                                        name="time"
                                        required
                                        value={formData.time}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:outline-none"
                                    >
                                        <option value="">선택</option>
                                        {[10, 11, 13, 14, 15, 16, 17, 18].map((hour) => (
                                            <option key={hour} value={`${hour}:00`}>{`${hour}:00`}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">문의사항 (선택)</label>
                                <textarea
                                    name="notes"
                                    rows={3}
                                    value={formData.notes}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:outline-none resize-none"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-3 rounded-lg font-bold text-white transition-all hover:opacity-90 disabled:opacity-50"
                                style={{ background: 'var(--color-accent)' }}
                            >
                                {isSubmitting ? '처리 중...' : '예약 신청하기'}
                            </button>
                        </form>
                    </div>
                    {/* 예약 현황 리스트 */}
                    <div className="rounded-2xl p-8 shadow-lg h-fit" style={{ background: 'white', border: '1px solid var(--border-color)' }}>
                        <h2 className="text-xl font-bold mb-6">예약 현황</h2>
                        <p className="text-sm text-gray-500 mb-4">* 개인정보 보호를 위해 이름 일부가 가려집니다.</p>
                        {!reservations ? (
                            <p>로딩 중...</p>
                        ) : reservations.length === 0 ? (
                            <p className="text-gray-500 text-center py-8">현재 예약된 일정이 없습니다.</p>
                        ) : (
                            <ul className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                                {reservations.map((res: any) => (
                                    <li key={res.id} className="p-4 rounded-lg border border-gray-100 hover:shadow-md transition-shadow bg-gray-50">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <span className="font-bold text-lg mr-2">{res.name}</span>
                                                <span className="text-sm px-2 py-1 rounded bg-blue-100 text-blue-800">예약중</span>
                                            </div>
                                            <button
                                                onClick={() => handleDelete(res.id)}
                                                className="text-xs text-red-500 hover:underline"
                                            >
                                                예약 취소
                                            </button>
                                        </div>
                                        <div className="text-gray-600">
                                            <p className="flex items-center gap-2">📅 {new Date(res.dateTime).toLocaleDateString()}</p>
                                            <p className="flex items-center gap-2">⏰ {new Date(res.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
