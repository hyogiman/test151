import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyB2NNdceq5AGojaGgQ-i9t4dxPU-ccecDc",
  authDomain: "tst1121-6983e.firebaseapp.com",
  projectId: "tst1121-6983e",
  storageBucket: "tst1121-6983e.firebasestorage.app",
  messagingSenderId: "84052633103",
  appId: "1:84052633103:web:deb08e91dfa199a524e57a",
  measurementId: "G-8Q971YBLLE"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Analytics 초기화 (선택사항)
try {
  const analytics = getAnalytics(app);
} catch (error) {
  console.log('Analytics 초기화 실패:', error);
}

// Firestore 설정
export const gameCollection = 'game';
export const participantsCollection = 'participants';
export const messagesCollection = 'messages'; 