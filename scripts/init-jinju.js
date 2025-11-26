const axios = require('axios');

const API_BASE = 'http://localhost:8787/api';

async function initJinjuData() {
    try {
        // 1. 로그인
        console.log('로그인 중...');
        const loginRes = await axios.post(`${API_BASE}/auth/login`, {
            username: 'admin',
            password: 'PanaxtosJinju2024!'
        });

        const token = loginRes.data.token;
        console.log('✅ 로그인 성공');

        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };

        // 2. 진주 지사 정보 설정
        const jinjuBranch = {
            id: 'jinju-center',
            name: '파낙토스 진주센터',
            directorName: '홍길동', // 실제 원장님 성함으로 변경 필요
            directorDesc: '국가공인 브레인트레이너 / 뇌파 분석 전문가',
            directorImg: 'https://www.panaxtos.com/img/logo.png', // 기본 로고 사용
            address: '경상남도 진주시 충무공동 123-45', // 임시 주소
            mapSrc: 'https://map.kakao.com/'
        };

        console.log('\n진주 지사 데이터 설정 중...');
        try {
            await axios.post(`${API_BASE}/branches`, jinjuBranch, { headers });
            console.log(`✅ ${jinjuBranch.name} 설정 완료`);
        } catch (error) {
            // 이미 존재하면 업데이트 (PUT) 시도
            try {
                await axios.put(`${API_BASE}/branches/${jinjuBranch.id}`, jinjuBranch, { headers });
                console.log(`✅ ${jinjuBranch.name} 업데이트 완료`);
            } catch (updateError) {
                console.log(`❌ 설정 실패:`, updateError.response?.data || updateError.message);
            }
        }

        // 리뷰 데이터는 사용자가 직접 추가하므로 생성하지 않음

    } catch (error) {
        console.error('❌ 오류 발생:', error.response?.data || error.message);
    }
}

initJinjuData();
