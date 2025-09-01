import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';

const AdminPage = () => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messages] = useState([
    "효율적인 코드 리뷰 프로세스를 설계해보세요",
    "마이크로서비스 아키텍처의 장단점을 분석해보세요",
    "데이터베이스 성능 최적화 전략을 제시해보세요",
    "보안 취약점을 찾아내는 방법을 설명해보세요",
    "사용자 경험을 개선하는 UI/UX 설계 원칙을 설명해보세요",
    "클라우드 네이티브 애플리케이션 개발 방법론을 설명해보세요",
    "DevOps 파이프라인을 구축하는 단계별 방법을 제시해보세요",
    "대용량 데이터 처리 시스템을 설계해보세요",
    "모바일 앱 성능 최적화 기법을 설명해보세요",
    "API 설계의 베스트 프랙티스를 제시해보세요",
    "테스트 자동화 전략을 수립해보세요",
    "모니터링 및 로깅 시스템을 설계해보세요",
    "스케일러블한 웹 애플리케이션 아키텍처를 제안해보세요",
    "데이터 마이그레이션 전략을 수립해보세요",
    "실시간 데이터 처리 시스템을 설계해보세요"
  ]);

  useEffect(() => {
    // 실시간으로 현재 메시지 상태를 감시
    const unsubscribe = onSnapshot(doc(db, 'game', 'current'), (doc) => {
      if (doc.exists()) {
        setCurrentMessage(doc.data().message || '');
      }
    });

    return () => unsubscribe();
  }, []);

  const showRandomMessage = async () => {
    const randomIndex = Math.floor(Math.random() * messages.length);
    const selectedMessage = messages[randomIndex];
    
    try {
      await setDoc(doc(db, 'game', 'current'), {
        message: selectedMessage,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('메시지 전송 중 오류 발생:', error);
      alert('메시지 전송에 실패했습니다.');
    }
  };

  const resetMessage = async () => {
    try {
      await setDoc(doc(db, 'game', 'current'), {
        message: '',
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('리셋 중 오류 발생:', error);
      alert('리셋에 실패했습니다.');
    }
  };

  return (
    <div className="container">
      <h1 className="title">관리자 페이지</h1>
      
      <div className="admin-controls">
        <div className="message-list">
          <h3>제시문 목록 (총 {messages.length}개)</h3>
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`message-item ${currentMessage === message ? 'active' : ''}`}
            >
              <strong>{index + 1}.</strong> {message}
            </div>
          ))}
        </div>

        <div>
          <button className="button" onClick={showRandomMessage}>
            랜덤 메시지 표시
          </button>
          <button className="button reset-button" onClick={resetMessage}>
            화면 리셋
          </button>
        </div>

        {currentMessage && (
          <div>
            <h3>현재 표시 중인 메시지:</h3>
            <div className="message-display">
              {currentMessage}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage; 