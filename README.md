# 엔지니어 교육 웹게임앱 (Firebase 기반)

엔지니어 교육을 위한 실시간 웹게임앱입니다. Firebase Firestore를 사용하여 관리자가 15개의 제시문 중 하나를 랜덤으로 선택하여 참가자들에게 실시간으로 전송할 수 있습니다.

## ✨ 주요 기능

- **실시간 동기화**: Firebase Firestore를 통한 진짜 실시간 데이터 동기화
- **팀 기반 메시지 할당**: 같은 팀 내에서는 서로 다른 메시지, 다른 팀끼리는 같은 메시지 가능
- **참가자 관리**: 팀명과 사번을 통한 참가자 식별 및 관리
- **반응형 디자인**: 모바일과 데스크톱에서 모두 사용 가능
- **보안 분리**: 관리자와 참가자 페이지가 완전히 분리

## 🚀 배포 방법

### 1. GitHub Pages 배포

```bash
# GitHub 저장소 생성 후 파일 업로드
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Firebase Hosting 배포 (선택사항)

```bash
# Firebase CLI 설치
npm install -g firebase-tools

# Firebase 로그인
firebase login

# Firebase 초기화
firebase init hosting

# 배포
firebase deploy
```

## 🔧 설정

### Firebase 설정

1. [Firebase Console](https://console.firebase.google.com/)에서 새 프로젝트 생성
2. Firestore Database 활성화
3. `index.html`과 `admin.html` 파일의 Firebase 설정 정보를 업데이트:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id",
  measurementId: "your-measurement-id"
};
```

### Firestore 보안 규칙

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true; // 개발용 (프로덕션에서는 더 엄격하게 설정)
    }
  }
}
```

## 📱 사용법

### 관리자 페이지 (`admin.html`)
1. 15개의 제시문 목록을 확인
2. "🎲 랜덤 메시지 표시" 버튼을 클릭하여 참가자에게 팀별 메시지 전송
3. "🔄 화면 리셋" 버튼을 클릭하여 모든 참가자 화면을 빈 화면으로 초기화
4. 실시간으로 활성 참가자 수와 목록 확인

### 참가자 페이지 (`index.html`)
1. 팀명과 사번을 입력하여 참가
2. 관리자가 제시문을 전송할 때까지 대기
3. 제시문이 전송되면 실시간으로 화면에 표시
4. 관리자가 리셋하면 빈 화면으로 돌아감

## 🔥 Firebase 실시간 기능

- **onSnapshot**: 실시간 데이터 변경 감지
- **setDoc**: 실시간 데이터 업데이트
- **deleteDoc**: 실시간 데이터 삭제
- **collection**: 실시간 컬렉션 모니터링

## 📊 데이터 구조

### Firestore Collections

```
participants/
  ├── {team}_{employee}/
  │   ├── id: string
  │   ├── team: string
  │   ├── employee: string
  │   └── timestamp: string

messages/
  └── current/
      ├── assignedMessages: object
      └── timestamp: string
```

## 🛠️ 기술 스택

- **Frontend**: 순수 HTML5, CSS3, JavaScript
- **Backend**: Firebase Firestore
- **Hosting**: GitHub Pages / Firebase Hosting
- **실시간 통신**: Firebase Firestore onSnapshot

## 📝 제시문 목록

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

## 🚀 배포 URL

- **GitHub Pages**: `https://your-username.github.io/your-repo-name`
- **Firebase Hosting**: `https://your-project-id.web.app`

## 📄 라이선스

MIT License 