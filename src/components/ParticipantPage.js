import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';

const ParticipantPage = () => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 실시간으로 현재 메시지 상태를 감시
    const unsubscribe = onSnapshot(doc(db, 'game', 'current'), (doc) => {
      setIsLoading(false);
      if (doc.exists()) {
        setCurrentMessage(doc.data().message || '');
      } else {
        setCurrentMessage('');
      }
    }, (error) => {
      console.error('메시지 수신 중 오류 발생:', error);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <div className="container">
        <div className="loading">연결 중...</div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="title">엔지니어 교육 게임</h1>
      <p className="subtitle">관리자가 제시문을 보내면 여기에 표시됩니다</p>
      
      <div className="message-display">
        {currentMessage ? currentMessage : '대기 중...'}
      </div>
      
      {!currentMessage && (
        <p className="subtitle">
          관리자가 "랜덤 메시지 표시" 버튼을 누르면 제시문이 나타납니다
        </p>
      )}
    </div>
  );
};

export default ParticipantPage; 