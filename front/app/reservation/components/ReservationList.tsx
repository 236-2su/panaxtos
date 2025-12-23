'use client';

import React, { useState } from 'react';
import useSWR, { mutate } from 'swr';
import { fetcher } from '@/lib/api';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ReservationList() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const branchId = searchParams.get('branch') || 'jinju';

    const { data: reservations = [] } = useSWR<any[]>(`/api/reservations?branchId=${branchId}`, fetcher);

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

    return (
        <div className="min-h-screen py-16 px-4" style={{ background: 'var(--bg-main)' }}>
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-main)' }}>
                        상담 예약 현황
                    </h1>
                    <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
                        현재 예약된 상담 일정을 확인하세요.
                    </p>
                </div>

                <div className="rounded-2xl p-8 shadow-lg h-fit bg-white" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">예약 리스트</h2>
                        <button
                            onClick={() => router.push('/reservation/create')}
                            className="px-6 py-2 rounded-full font-bold text-white transition-all hover:opacity-90 shadow-md"
                            style={{ background: 'var(--color-accent)' }}
                        >
                            상담 예약하기
                        </button>
                    </div>

                    {reservations.length === 0 ? (
                        <div className="text-center py-16 text-gray-500">
                            <p className="mb-4">현재 예약된 일정이 없습니다.</p>
                            <p className="text-sm">가장 먼저 상담을 예약해보세요!</p>
                        </div>
                    ) : (
                        <ul className="space-y-4">
                            {reservations.map((res: any) => (
                                <li key={res.id} className="p-6 rounded-xl border border-gray-100 hover:shadow-md transition-shadow bg-white flex justify-between items-center gap-4">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="font-bold text-lg" style={{ color: 'var(--text-main)' }}>
                                                {new Date(res.dateTime).toLocaleDateString()}
                                            </span>
                                            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-700">
                                                {new Date(res.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <span>예약자: {res.name && res.name.length > 1 ? res.name[0] + '*'.repeat(res.name.length - 1) : res.name}</span>
                                            {res.programId && (
                                                <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                                    {res.programId}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDeleteClick(res.id)}
                                        className="text-sm text-gray-400 hover:text-red-500 underline transition-colors whitespace-nowrap px-2 py-1"
                                    >
                                        예약 취소
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
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
                                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
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
