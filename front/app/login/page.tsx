'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/auth/login', {
                username,
                password
            });
            localStorage.setItem('token', res.data.token);
            router.push('/admin');
        } catch (err) {
            setError('로그인 실패: 아이디 또는 비밀번호를 확인하세요.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-center">관리자 로그인</h1>
                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">아이디</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-[#1E7BC8] focus:border-[#1E7BC8] outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">비밀번호</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-[#1E7BC8] focus:border-[#1E7BC8] outline-none"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1E7BC8] hover:bg-[#1666A6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1E7BC8]"
                    >
                        로그인
                    </button>
                </form>
                <div className="mt-4 text-center text-sm text-gray-500">
                    <p className="text-xs">관리자 전용 페이지입니다.</p>
                </div>
            </div>
        </div>
    );
}
