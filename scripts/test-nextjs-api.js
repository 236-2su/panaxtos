const axios = require('axios');

const API_BASE = 'http://localhost:3001/api';
let adminToken = '';

console.log('='.repeat(60));
console.log('🧪 Next.js API Routes 테스트');
console.log('='.repeat(60));

async function testAPI() {
    try {
        // 1. 로그인 테스트
        console.log('\n[1/6] 🔐 관리자 로그인 테스트');
        try {
            const loginRes = await axios.post(`${API_BASE}/auth/login`, {
                username: 'admin',
                password: 'PanaxtosJinju2024!'
            });
            adminToken = loginRes.data.token;
            console.log('✅ 로그인 성공');
            console.log(`   토큰: ${adminToken.substring(0, 20)}...`);
        } catch (err) {
            console.log('❌ 로그인 실패:', err.response?.data || err.message);
            return;
        }

        // 2. 지사 목록 조회 테스트
        console.log('\n[2/6] 🏢 지사 목록 조회 테스트');
        try {
            const branchesRes = await axios.get(`${API_BASE}/branches`);
            console.log(`✅ 지사 목록 조회 성공 (${branchesRes.data.length}개)`);
            if (branchesRes.data.length > 0) {
                console.log(`   첫 번째 지사: ${branchesRes.data[0].name}`);
            }
        } catch (err) {
            console.log('❌ 지사 목록 조회 실패:', err.response?.data || err.message);
        }

        // 3. 후기 목록 조회 테스트 (공개)
        console.log('\n[3/6] 📝 후기 목록 조회 테스트');
        try {
            const reviewsRes = await axios.get(`${API_BASE}/reviews?branchId=jinju-center`);
            console.log(`✅ 후기 목록 조회 성공 (${reviewsRes.data.length}개)`);
        } catch (err) {
            console.log('❌ 후기 목록 조회 실패:', err.response?.data || err.message);
        }

        // 4. 후기 작성 테스트
        console.log('\n[4/6] ✍️  후기 작성 테스트');
        try {
            const newReview = {
                branchId: 'jinju-center',
                author: 'Next.js 테스터',
                title: 'Next.js API Routes 테스트 후기',
                rating: 5,
                comment: '통합 API로 정상 작동 확인!'
            };
            const reviewRes = await axios.post(`${API_BASE}/reviews`, newReview);
            console.log('✅ 후기 작성 성공');
            console.log(`   작성된 후기 ID: ${reviewRes.data.id}`);
        } catch (err) {
            console.log('❌ 후기 작성 실패:', err.response?.data || err.message);
        }

        // 5. 예약 생성 테스트 (공개)
        console.log('\n[5/6] 📅 예약 생성 테스트');
        try {
            const newReservation = {
                branchId: 'jinju-center',
                name: 'Next.js 테스터',
                phone: '010-1234-5678',
                dateTime: new Date().toISOString(),
                notes: 'Next.js API Routes 테스트 예약입니다.'
            };
            const reservationRes = await axios.post(`${API_BASE}/reservations`, newReservation);
            console.log('✅ 예약 생성 성공');
            console.log(`   예약 ID: ${reservationRes.data.id}`);
        } catch (err) {
            console.log('❌ 예약 생성 실패:', err.response?.data || err.message);
        }

        // 6. 예약 목록 조회 테스트 (관리자 전용)
        console.log('\n[6/6] 🔒 예약 목록 조회 테스트 (관리자)');
        try {
            const reservationsRes = await axios.get(`${API_BASE}/reservations`, {
                headers: { Authorization: `Bearer ${adminToken}` }
            });
            console.log(`✅ 예약 목록 조회 성공 (${reservationsRes.data.length}개)`);
        } catch (err) {
            console.log('❌ 예약 목록 조회 실패:', err.response?.data || err.message);
        }

        console.log('\n' + '='.repeat(60));
        console.log('✅ 전체 Next.js API 테스트 완료');
        console.log('='.repeat(60));

    } catch (error) {
        console.error('테스트 중 오류 발생:', error.message);
    }
}

testAPI();
