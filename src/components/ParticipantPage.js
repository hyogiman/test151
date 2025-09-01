import React, { useState, useEffect } from 'react';
import { db, participantsCollection, messagesCollection } from '../firebase';
import { doc, setDoc, onSnapshot, deleteDoc } from 'firebase/firestore';

const ParticipantPage = () => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [participantId, setParticipantId] = useState('');
  const [teamName, setTeamName] = useState('');
  const [employeeNumber, setEmployeeNumber] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 저장된 참가자 정보 확인
    const savedTeam = localStorage.getItem('participantTeam');
    const savedEmployee = localStorage.getItem('participantEmployee');
    
    if (savedTeam && savedEmployee) {
      // 이미 로그인된 경우
      setTeamName(savedTeam);
      setEmployeeNumber(savedEmployee);
      setParticipantId(`${savedTeam}_${savedEmployee}`);
      setIsLoggedIn(true);
      addToActiveParticipants(savedTeam, savedEmployee);
    }
    
    setIsLoading(false);
  }, []);

  // Firebase 실시간 리스너 시작
  useEffect(() => {
    if (!participantId) return;

    // 메시지 실시간 리스너
    const messageUnsubscribe = onSnapshot(
      doc(db, messagesCollection, 'current'),
      (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          if (data.assignedMessages && data.assignedMessages[participantId]) {
            setCurrentMessage(data.assignedMessages[participantId]);
          } else {
            setCurrentMessage('');
          }
        } else {
          setCurrentMessage('');
        }
      },
      (error) => {
        console.error('메시지 리스너 오류:', error);
      }
    );

    return () => {
      messageUnsubscribe();
    };
  }, [participantId]);

  // 활성 참가자 목록에 추가
  const addToActiveParticipants = async (team, employee) => {
    const id = `${team}_${employee}`;
    try {
      await setDoc(doc(db, participantsCollection, id), {
        id: id,
        team: team,
        employee: employee,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('참가자 추가 오류:', error);
    }
  };

  // 활성 참가자 목록에서 제거
  const removeFromActiveParticipants = async () => {
    if (!participantId) return;
    
    try {
      await deleteDoc(doc(db, participantsCollection, participantId));
    } catch (error) {
      console.error('참가자 제거 오류:', error);
    }
  };

  // 로그인
  const login = async () => {
    const teamInput = document.getElementById('team-input').value.trim();
    const employeeInput = document.getElementById('employee-input').value.trim();
    
    if (!teamInput || !employeeInput) {
      alert('팀명과 사번을 모두 입력해주세요.');
      return;
    }
    
    const id = `${teamInput}_${employeeInput}`;
    
    setTeamName(teamInput);
    setEmployeeNumber(employeeInput);
    setParticipantId(id);
    setIsLoggedIn(true);
    
    // 로컬 스토리지에 저장
    localStorage.setItem('participantTeam', teamInput);
    localStorage.setItem('participantEmployee', employeeInput);
    
    // Firebase에 참가자 추가
    await addToActiveParticipants(teamInput, employeeInput);
  };

  // 로그아웃
  const logout = async () => {
    await removeFromActiveParticipants();
    
    // 로컬 스토리지에서 제거
    localStorage.removeItem('participantTeam');
    localStorage.removeItem('participantEmployee');
    
    setTeamName('');
    setEmployeeNumber('');
    setParticipantId('');
    setIsLoggedIn(false);
    setCurrentMessage('');
  };

  // 페이지 언로드 시 참가자 제거
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (participantId) {
        removeFromActiveParticipants();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [participantId]);

  if (isLoading) {
    return (
      <div className="container">
        <div className="loading">로딩 중...</div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="container">
        <h1 className="title">엔지니어 교육 게임</h1>
        
        <div id="login-form">
          <h2 className="subtitle">참가자 정보 입력</h2>
          <div style={{ margin: '20px 0' }}>
            <input 
              type="text" 
              id="team-input" 
              placeholder="팀명을 입력하세요" 
              className="input-field"
            />
            <input 
              type="text" 
              id="employee-input" 
              placeholder="사번을 입력하세요" 
              className="input-field"
            />
          </div>
          <button className="button" onClick={login}>참가하기</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="title">엔지니어 교육 게임</h1>
      <p className="subtitle">관리자가 제시문을 보내면 여기에 표시됩니다</p>
      
      <div className="participant-info">
        <div>팀: {teamName}</div>
        <div>사번: {employeeNumber}</div>
        <div>ID: {participantId}</div>
      </div>
      
      <div className="message-display">
        {currentMessage ? currentMessage : '대기 중...'}
      </div>
      
      {!currentMessage && (
        <p className="info-text">
          관리자가 "랜덤 메시지 표시" 버튼을 누르면 제시문이 나타납니다
        </p>
      )}
      
      <button className="button reset-button" onClick={logout}>
        다른 계정으로 참가
      </button>
    </div>
  );
};

export default ParticipantPage; 