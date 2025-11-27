'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function AdminDashboard() {
    const router = useRouter();
    const [reservations, setReservations] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }
        setIsLoggedIn(true);
        fetchData(token);
    }, [router]);

    const fetchData = async (token: string) => {
        try {
            const [resReservations, resReviews] = await Promise.all([
                axios.get('/api/reservations?admin=true', {
                    headers: { Authorization: `Bearer ${token}` }
                }),
                axios.get('/api/reviews')
            ]);
            setReservations(resReservations.data);
            setReviews(resReviews.data);
        } catch (err) {
            console.error(err);
            alert('데이터를 불러오는데 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    // 삭제 모달 상태
    const [deleteModal, setDeleteModal] = useState<{
        isOpen: boolean;
        type: 'review' | 'reservation' | null;
        id: number | null;
    }>({
        isOpen: false,
        type: null,
        id: null
    });

    const openDeleteModal = (type: 'review' | 'reservation', id: number) => {
        setDeleteModal({ isOpen: true, type, id });
    };

    const closeDeleteModal = () => {
        setDeleteModal({ isOpen: false, type: null, id: null });
    };

    const confirmDelete = async () => {
        if (!deleteModal.id || !deleteModal.type) return;

        const { type, id } = deleteModal;
        const token = localStorage.getItem('token');

        try {
            const endpoint = type === 'review' ? `/api/reviews/${id}` : `/api/reservations/${id}`;
            await axios.delete(endpoint, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: {}
            });

            alert(type === 'review' ? '후기가 삭제되었습니다.' : '예약이 삭제되었습니다.');

            // 상태 업데이트
            if (type === 'review') {
                setReviews(reviews.filter((r: any) => r.id !== id));
            } else {
                setReservations(reservations.filter((r: any) => r.id !== id));
            }
        } catch (err: any) {
            console.error('Delete error:', err);
            alert(`삭제 실패: ${err.response?.data?.error || err.message || '알 수 없는 오류'}`);
        } finally {
            closeDeleteModal();
        }
    };

    if (!isLoggedIn) return null;

    return (
        <div className="default-container py-10">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">관리자 대시보드</h1>
                <button
                    onClick={() => {
                        localStorage.removeItem('token');
                        router.push('/login');
                    }}
                    className="text-red-500 hover:underline"
                >
                    로그아웃
                </button>
            </div>

            <div className="flex gap-4 mb-8">
                <button
                    onClick={() => router.push('/admin/reviews/write')}
                    className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 font-bold"
                >
                    + 훈련 후기 작성하기
                </button>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* 예약 현황 */}
                <div>
                    <h2 className="text-2xl font-bold mb-4">예약 현황 (전체)</h2>
                    {loading ? (
                        <p>로딩 중...</p>
                    ) : (
                        <div className="bg-white shadow overflow-hidden sm:rounded-md max-h-[600px] overflow-y-auto">
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
                                                    <p className="text-gray-500 mb-1">{res.programId || '상담 예약'}</p>
                                                    <button
                                                        onClick={() => openDeleteModal('reservation', res.id)}
                                                        className="text-red-500 text-sm hover:underline"
                                                    >
                                                        삭제
                                                    </button>
                                                </div>
                                            </div>
                                            {res.notes && (
                                                <div className="mt-2 text-gray-700 bg-gray-100 p-2 rounded text-sm">
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

                {/* 후기 관리 */}
                <div>
                    <h2 className="text-2xl font-bold mb-4">후기 관리</h2>
                    {loading ? (
                        <p>로딩 중...</p>
                    ) : (
                        <div className="bg-white shadow overflow-hidden sm:rounded-md max-h-[600px] overflow-y-auto">
                            <ul className="divide-y divide-gray-200">
                                {reviews.length === 0 ? (
                                    <li className="p-4 text-center text-gray-500">등록된 후기가 없습니다.</li>
                                ) : (
                                    reviews.map((review: any) => (
                                        <li key={review.id} className="p-4 hover:bg-gray-50">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="font-bold text-lg line-clamp-1">{review.title}</h3>
                                                <button
                                                    onClick={() => openDeleteModal('review', review.id)}
                                                    className="text-red-500 text-sm hover:underline shrink-0 ml-2"
                                                >
                                                    삭제
                                                </button>
                                            </div>
                                            <p className="text-sm text-gray-600 mb-2">
                                                {review.author} | {new Date(review.createdAt).toLocaleDateString()} | ★{review.rating}
                                            </p>
                                            <p className="text-gray-700 text-sm line-clamp-2">{review.comment}</p>
                                        </li>
                                    ))
                                )}
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/* 삭제 확인 모달 */}
            {deleteModal.isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-xl">
                        <h3 className="text-lg font-bold mb-4">삭제 확인</h3>
                        <p className="text-gray-600 mb-6">
                            정말 이 {deleteModal.type === 'review' ? '후기를' : '예약을'} 삭제하시겠습니까?
                            <br />
                            <span className="text-sm text-red-500">이 작업은 되돌릴 수 없습니다.</span>
                        </p>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={closeDeleteModal}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                            >
                                취소
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                삭제하기
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
