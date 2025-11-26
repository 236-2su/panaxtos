'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function AdminDashboard() {
    const router = useRouter();
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login'); // 로그인 페이지 필요 (현재는 없으므로 임시로직)
            return;
        }
        setIsLoggedIn(true);
        fetchReservations(token);
    }, [router]);

    const fetchReservations = async (token: string) => {
        try {
            const res = await axios.get('/api/reservations', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setReservations(res.data);
        } catch (err) {
            console.error(err);
            alert('데이터를 불러오는데 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    if (!isLoggedIn) return null;

    return (
        <div className="default-container py-10">
            <h1 className="text-3xl font-bold mb-8">관리자 대시보드</h1>

            <div className="flex gap-4 mb-8">
                <button
                    onClick={() => router.push('/admin/reviews/write')}
                    className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 font-bold"
                >
                    + 훈련 후기 작성하기
                </button>
            </div>

            <h2 className="text-2xl font-bold mb-4">예약 현황</h2>
            {loading ? (
                <p>로딩 중...</p>
            ) : (
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <ul className="divide-y divide-gray-200">
                        {reservations.length === 0 ? (
                            <li className="p-4 text-center text-gray-500">예약 내역이 없습니다.</li>
                        ) : (
                            reservations.map((res: any) => (
                                <li key={res.id} className="p-4 hover:bg-gray-50">
                                    <div className="flex justify-between">
                                        <div>
                                            <p className="text-lg font-bold">{res.name}</p>
                                            <p className="text-gray-600">{res.phone}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-blue-600 font-bold">{new Date(res.dateTime).toLocaleString()}</p>
                                            <p className="text-gray-500">{res.programId || '상담 예약'}</p>
                                        </div>
                                    </div>
                                    {res.notes && (
                                        <div className="mt-2 text-gray-700 bg-gray-100 p-2 rounded">
                                            {res.notes}
                                        </div>
                                    )}
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}
