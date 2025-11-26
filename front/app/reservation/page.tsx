'use client';

import { useState, use, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { fetcher } from '@/lib/api';

export default function ReservationPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const branchId = searchParams.get('branch') || 'jinju-center'; // 기본값 진주센터

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        date: '',
        time: '',
        notes: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // 날짜와 시간을 합쳐서 ISO 형식으로 변환 (간단하게 처리)
            const dateTime = `${formData.date}T${formData.time}:00`;

            await fetcher('/reservations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    branchId,
                    name: formData.name,
                    phone: formData.phone,
                    dateTime: dateTime,
                    notes: formData.notes
                }),
            });

            alert('상담 예약이 완료되었습니다. 담당자가 확인 후 연락드리겠습니다.');
            router.push('/');
        } catch (error) {
            console.error('Reservation failed:', error);
            alert('예약 신청 중 오류가 발생했습니다. 다시 시도해주세요.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // 오늘 이후의 날짜만 선택 가능하도록 설정
    const today = new Date().toISOString().split('T')[0];

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

                <div className="rounded-2xl p-8 shadow-lg" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium mb-2" style={{ color: 'var(--text-main)' }}>
                                이름
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none"
                                style={{
                                    background: 'var(--bg-secondary)',
                                    borderColor: 'var(--border-color)',
                                    color: 'var(--text-main)',
                                    '--tw-ring-color': 'var(--color-accent)'
                                } as React.CSSProperties}
                                placeholder="홍길동"
                            />
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium mb-2" style={{ color: 'var(--text-main)' }}>
                                연락처
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                required
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none"
                                style={{
                                    background: 'var(--bg-secondary)',
                                    borderColor: 'var(--border-color)',
                                    color: 'var(--text-main)',
                                    '--tw-ring-color': 'var(--color-accent)'
                                } as React.CSSProperties}
                                placeholder="010-1234-5678"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="date" className="block text-sm font-medium mb-2" style={{ color: 'var(--text-main)' }}>
                                    예약 날짜
                                </label>
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    required
                                    min={today}
                                    value={formData.date}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none"
                                    style={{
                                        background: 'var(--bg-secondary)',
                                        borderColor: 'var(--border-color)',
                                        color: 'var(--text-main)',
                                        '--tw-ring-color': 'var(--color-accent)'
                                    } as React.CSSProperties}
                                />
                            </div>
                            <div>
                                <label htmlFor="time" className="block text-sm font-medium mb-2" style={{ color: 'var(--text-main)' }}>
                                    예약 시간
                                </label>
                                <select
                                    id="time"
                                    name="time"
                                    required
                                    value={formData.time}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none"
                                    style={{
                                        background: 'var(--bg-secondary)',
                                        borderColor: 'var(--border-color)',
                                        color: 'var(--text-main)',
                                        '--tw-ring-color': 'var(--color-accent)'
                                    } as React.CSSProperties}
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
                        </div>

                        <div>
                            <label htmlFor="notes" className="block text-sm font-medium mb-2" style={{ color: 'var(--text-main)' }}>
                                상담 내용 / 문의사항 (선택)
                            </label>
                            <textarea
                                id="notes"
                                name="notes"
                                rows={4}
                                value={formData.notes}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none resize-none"
                                style={{
                                    background: 'var(--bg-secondary)',
                                    borderColor: 'var(--border-color)',
                                    color: 'var(--text-main)',
                                    '--tw-ring-color': 'var(--color-accent)'
                                } as React.CSSProperties}
                                placeholder="궁금하신 점이나 상담받고 싶은 내용을 간단히 적어주세요."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-4 rounded-lg text-lg font-bold transition-all hover:opacity-90 disabled:opacity-50"
                            style={{ background: 'var(--color-accent)', color: 'var(--text-invert)' }}
                        >
                            {isSubmitting ? '처리 중...' : '예약 신청하기'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}