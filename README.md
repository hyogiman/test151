# 엔지니어 교육 웹게임앱

엔지니어 교육을 위한 실시간 웹게임앱입니다. 관리자가 15개의 제시문 중 하나를 랜덤으로 선택하여 참가자들에게 실시간으로 전송할 수 있습니다.

## 기능

- **관리자 페이지** (`/admin`): 15개의 제시문을 확인하고 랜덤 선택하여 전송
- **참가자 페이지** (`/`): 관리자가 전송한 제시문을 실시간으로 수신하여 표시
- **실시간 동기화**: Firebase Firestore를 통한 실시간 데이터 동기화
- **반응형 디자인**: 모바일과 데스크톱에서 모두 사용 가능

## 설치 및 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. Firebase 설정
1. [Firebase Console](https://console.firebase.google.com/)에서 새 프로젝트 생성
2. Firestore Database 활성화
3. `src/firebase.js` 파일의 설정 정보를 업데이트:
   ```javascript
   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-auth-domain",
     projectId: "your-project-id",
     storageBucket: "your-storage-bucket",
     messagingSenderId: "your-messaging-sender-id",
     appId: "your-app-id"
   };
   ```

### 3. 앱 실행
```bash
npm start
```

## 사용법

### 관리자 페이지 (`http://localhost:3000/admin`)
1. 15개의 제시문 목록을 확인
2. "랜덤 메시지 표시" 버튼을 클릭하여 참가자에게 랜덤 제시문 전송
3. "화면 리셋" 버튼을 클릭하여 참가자 화면을 빈 화면으로 초기화

### 참가자 페이지 (`http://localhost:3000/`)
1. 관리자가 제시문을 전송할 때까지 대기
2. 제시문이 전송되면 실시간으로 화면에 표시
3. 관리자가 리셋하면 빈 화면으로 돌아감

## 제시문 목록

1. 효율적인 코드 리뷰 프로세스를 설계해보세요
2. 마이크로서비스 아키텍처의 장단점을 분석해보세요
3. 데이터베이스 성능 최적화 전략을 제시해보세요
4. 보안 취약점을 찾아내는 방법을 설명해보세요
5. 사용자 경험을 개선하는 UI/UX 설계 원칙을 설명해보세요
6. 클라우드 네이티브 애플리케이션 개발 방법론을 설명해보세요
7. DevOps 파이프라인을 구축하는 단계별 방법을 제시해보세요
8. 대용량 데이터 처리 시스템을 설계해보세요
9. 모바일 앱 성능 최적화 기법을 설명해보세요
10. API 설계의 베스트 프랙티스를 제시해보세요
11. 테스트 자동화 전략을 수립해보세요
12. 모니터링 및 로깅 시스템을 설계해보세요
13. 스케일러블한 웹 애플리케이션 아키텍처를 제안해보세요
14. 데이터 마이그레이션 전략을 수립해보세요
15. 실시간 데이터 처리 시스템을 설계해보세요

## 기술 스택

- React 18
- Firebase Firestore
- React Router
- CSS3

## 라이선스

MIT License 