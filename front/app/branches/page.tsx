'use client';

import { useBranches } from '@/hooks/useBranches';
import Link from 'next/link';

export default function BranchesPage() {
    const { branches, isLoading, isError } = useBranches();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-main)' }}>
                <div className="text-xl" style={{ color: 'var(--text-secondary)' }}>로딩 중...</div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-main)' }}>
                <div className="text-xl text-red-500">데이터를 불러오는데 실패했습니다.</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-16 px-4" style={{ background: 'var(--bg-main)' }}>
            <div className="max-w-7xl mx-auto">
                <h1 className="text-5xl font-bold mb-4 text-center" style={{ color: 'var(--text-main)' }}>
                    파낙토스 지사 찾기
                </h1>
                <p className="text-center mb-12" style={{ color: 'var(--text-secondary)' }}>
                    가까운 파낙토스 센터를 찾아보세요
                </p>

                {!branches || branches.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-xl" style={{ color: 'var(--text-secondary)' }}>
                            등록된 지사가 없습니다.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {branches.map((branch) => (
                            <div
                                key={branch.id}
                                className="rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                                style={{
                                    background: 'var(--bg-card)',
                                    border: '1px solid var(--border-color)',
                                }}
                            >
                                <div className="mb-4">
                                    {branch.directorImg && (
                                        <img
                                            src={branch.directorImg}
                                            alt={branch.directorName}
                                            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                                            style={{ border: '3px solid var(--color-accent)' }}
                                        />
                                    )}
                                    <h2 className="text-2xl font-bold text-center mb-2" style={{ color: 'var(--text-main)' }}>
                                        {branch.name}
                                    </h2>
                                    <p className="text-center font-semibold" style={{ color: 'var(--color-accent)' }}>
                                        {branch.directorName} 원장
                                    </p>
                                    <p className="text-center text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                                        {branch.directorDesc}
                                    </p>
                                </div>

                                <div className="mt-4 pt-4" style={{ borderTop: '1px solid var(--border-color)' }}>
                                    <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
                                        📍 {branch.address}
                                    </p>

                                    <div className="flex gap-2">
                                        <Link
                                            href={`/branches/view?id=${branch.id}`}
                                            className="flex-1 py-2 px-4 rounded-lg text-center font-semibold transition-all hover:opacity-90"
                                            style={{ background: 'var(--color-accent)', color: 'var(--text-invert)' }}
                                        >
                                            상세보기
                                        </Link>
                                        {branch.mapSrc && (
                                            <a
                                                href={branch.mapSrc}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="py-2 px-4 rounded-lg font-semibold transition-all hover:opacity-90"
                                                style={{ background: 'var(--bg-secondary)', color: 'var(--text-main)', border: '1px solid var(--border-color)' }}
                                            >
                                                지도
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
