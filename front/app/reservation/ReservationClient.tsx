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

    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [password, setPassword] = useState('');
    const [selectedReservationId, setSelectedReservationId] = useState<number | null>(null);

    const handleDeleteClick = (id: number) => {
        setSelectedReservationId(id);
        setShowPasswordModal(true);
    };

    const handleDeleteConfirm = async () => {
        if (!password || !selectedReservationId) return;

        try {
            await fetcher(`/api/reservations/${selectedReservationId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });
            alert('예약이 취소되었습니다.');
            // 강제로 데이터 재검증
            await mutate(`/api/reservations?branchId=${branchId}`, undefined, { revalidate: true });
            setShowPasswordModal(false);
            setPassword('');
            setSelectedReservationId(null);
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
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-3 rounded-lg font-bold text-white transition-all hover:opacity-90 disabled:opacity-50 mt-4"
                                style={{ background: 'var(--color-accent)' }}
                            >
                                {isSubmitting ? '처리중...' : '예약 신청하기'}
                            </button>
                        </form>
                    </div>

                    {/* 예약 현황 리스트 */}
                    <div className="rounded-2xl p-8 shadow-lg h-fit" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                        <h2 className="text-xl font-bold mb-6">예약 현황</h2>
                        {reservations.length === 0 ? (
                            <p className="text-gray-500 text-center py-8">현재 예약된 일정이 없습니다.</p>
                        ) : (
                            <ul className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                                {reservations.map((res: any) => (
                                    <li key={res.id} className="p-4 rounded-lg border border-gray-100 hover:shadow-md transition-shadow bg-white">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <div className="font-bold text-lg mb-1" style={{ color: 'var(--text-main)' }}>
                                                    {new Date(res.dateTime).toLocaleDateString()} {new Date(res.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    예약자: {res.name}
                                                </div>
                                                {res.programId && (
                                                    <div className="text-xs text-blue-600 mt-1 bg-blue-50 inline-block px-2 py-1 rounded">
                                                        {res.programId}
                                                    </div>
                                                )}
                                            </div>
                                            <button
                                                onClick={() => handleDeleteClick(res.id)}
                                                className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                                title="예약 취소"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                {/* 비밀번호 확인 모달 */}
                {showPasswordModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-xl">
                            <h3 className="text-lg font-bold mb-4">예약 취소</h3>
                            <p className="text-gray-600 mb-4 text-sm">예약 취소를 위해 설정한 비밀번호를 입력해주세요.</p>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full border p-2 rounded mb-4"
                                placeholder="비밀번호 입력"
                                autoFocus
                            />
                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => {
                                        setShowPasswordModal(false);
                                        setPassword('');
                                        setSelectedReservationId(null);
                                    }}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                                >
                                    닫기
                                </button>
                                <button
                                    onClick={handleDeleteConfirm}
                                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                >
                                    취소하기
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
