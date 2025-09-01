import React, { useState, useEffect } from 'react';
import { db, participantsCollection, messagesCollection } from '../firebase';
import { doc, setDoc, onSnapshot, deleteDoc, collection } from 'firebase/firestore';

const AdminPage = () => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [activeParticipants, setActiveParticipants] = useState([]);
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
    // Firebase 실시간 리스너 시작
    startRealtimeListeners();
  }, []);

  // Firebase 실시간 리스너 시작
  const startRealtimeListeners = () => {
    // 활성 참가자 실시간 리스너
    const participantsUnsubscribe = onSnapshot(
      collection(db, participantsCollection),
      (snapshot) => {
        const participants = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          // 5분 이내에 접속한 참가자만 활성으로 간주
          const timestamp = new Date(data.timestamp);
          const now = new Date();
          if ((now - timestamp) < 300000) { // 5분
            participants.push(data);
          }
        });
        setActiveParticipants(participants);
      },
      (error) => {
        console.error('참가자 리스너 오류:', error);
      }
    );

    // 현재 메시지 실시간 리스너
    const messageUnsubscribe = onSnapshot(
      doc(db, messagesCollection, 'current'),
      (doc) => {
        if (doc.exists()) {
          setCurrentMessage('팀별로 다른 메시지가 할당되었습니다.');
        } else {
          setCurrentMessage('');
        }
      },
      (error) => {
        console.error('메시지 리스너 오류:', error);
      }
    );

    return () => {
      participantsUnsubscribe();
      messageUnsubscribe();
    };
  };

  // 랜덤 메시지 표시 (팀별로 다른 메시지, 같은 팀 내에서는 서로 다른 메시지)
  const showRandomMessage = async () => {
    if (activeParticipants.length === 0) {
      alert('⚠️ 현재 활성 참가자가 없습니다. 참가자들이 페이지를 열어주세요.');
      return;
    }
    
    // 팀별로 그룹화
    const teamGroups = {};
    activeParticipants.forEach(participant => {
      if (!teamGroups[participant.team]) {
        teamGroups[participant.team] = [];
      }
      teamGroups[participant.team].push(participant);
    });
    
    // 각 팀별로 메시지 할당
    const assignedMessages = {};
    
    Object.keys(teamGroups).forEach(teamName => {
      const teamMembers = teamGroups[teamName];
      const usedMessages = new Set();
      
      teamMembers.forEach(participant => {
        let randomIndex;
        let attempts = 0;
        
        // 같은 팀 내에서 중복되지 않는 메시지 찾기
        do {
          randomIndex = Math.floor(Math.random() * messages.length);
          attempts++;
        } while (usedMessages.has(randomIndex) && attempts < 50);
        
        usedMessages.add(randomIndex);
        assignedMessages[participant.id] = messages[randomIndex];
      });
    });
    
    try {
      // Firebase에 메시지 저장
      await setDoc(doc(db, messagesCollection, 'current'), {
        assignedMessages: assignedMessages,
        timestamp: new Date().toISOString()
      });
      
      // 성공 메시지 표시
      const teamCount = Object.keys(teamGroups).length;
      alert(`✅ ${activeParticipants.length}명의 참가자 (${teamCount}개 팀)에게 메시지가 전송되었습니다!\n\n같은 팀 내에서는 서로 다른 메시지가, 다른 팀끼리는 같은 메시지가 할당될 수 있습니다.`);
    } catch (error) {
      console.error('메시지 전송 오류:', error);
      alert('❌ 메시지 전송에 실패했습니다.');
    }
  };

  // 메시지 리셋
  const resetMessage = async () => {
    try {
      await deleteDoc(doc(db, messagesCollection, 'current'));
      alert('🔄 모든 참가자 화면이 리셋되었습니다!');
    } catch (error) {
      console.error('메시지 리셋 오류:', error);
      alert('❌ 메시지 리셋에 실패했습니다.');
    }
  };

  // 팀별 참가자 목록 렌더링
  const renderParticipantsList = () => {
    if (activeParticipants.length === 0) {
      return <p style={{ color: '#666' }}>현재 활성 참가자가 없습니다.</p>;
    }

    const teamGroups = {};
    activeParticipants.forEach(participant => {
      if (!teamGroups[participant.team]) {
        teamGroups[participant.team] = [];
      }
      teamGroups[participant.team].push(participant);
    });

    return (
      <div>
        <h4>📋 참가자 목록:</h4>
        {Object.keys(teamGroups).map(teamName => (
          <div key={teamName} className="team-group">
            <strong>{teamName}</strong>: {teamGroups[teamName].map(p => p.employee).join(', ')} ({teamGroups[teamName].length}명)
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container">
      <h1 className="title">관리자 페이지</h1>
      
      <div className="status-info">
        <h3>📊 현재 상태</h3>
        <p>참가자 화면: <a href="/" target="_blank">홈페이지</a></p>
        <p>참가자들이 위 링크로 접속하여 팀명과 사번을 입력한 후 제시문을 확인합니다.</p>
        <p>현재 활성 참가자 수: {activeParticipants.length}명</p>
        <div className="participants-list">
          {renderParticipantsList()}
        </div>
      </div>
      
      <div className="admin-controls">
        <div className="message-list">
          <h3>📋 제시문 목록 (총 {messages.length}개)</h3>
          {messages.map((message, index) => (
            <div key={index} className="message-item">
              <strong>{index + 1}.</strong> {message}
            </div>
          ))}
        </div>

        <div className="button-group">
          <button className="button" onClick={showRandomMessage}>
            🎲 랜덤 메시지 표시
          </button>
          <button className="button reset-button" onClick={resetMessage}>
            🔄 화면 리셋
          </button>
        </div>

        {currentMessage && (
          <div id="current-message-display">
            <h3>📺 현재 표시 중인 메시지:</h3>
            <div className="message-display">{currentMessage}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage; 