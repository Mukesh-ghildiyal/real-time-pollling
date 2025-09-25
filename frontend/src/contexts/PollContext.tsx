import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  timeLimit: number;
  isActive: boolean;
  createdAt: Date;
}

export interface Student {
  id: string;
  name: string;
  hasAnswered: boolean;
  answer?: string;
}

export interface PollContextType {
  role: 'teacher' | 'student' | null;
  currentPoll: Poll | null;
  polls: Poll[];
  students: Student[];
  studentName: string;
  timeRemaining: number;
  isPolling: boolean;
  chatMessages: ChatMessage[];
  
  setRole: (role: 'teacher' | 'student') => void;
  setStudentName: (name: string) => void;
  createPoll: (question: string, options: string[], timeLimit: number) => void;
  submitAnswer: (optionId: string) => void;
  endCurrentPoll: () => void;
  removeStudent: (studentId: string) => void;
  sendChatMessage: (message: string, sender: string) => void;
  canCreateNewPoll: () => boolean;
}

export interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: Date;
  isTeacher: boolean;
}

const PollContext = createContext<PollContextType | undefined>(undefined);

export const usePoll = () => {
  const context = useContext(PollContext);
  if (!context) {
    throw new Error('usePoll must be used within a PollProvider');
  }
  return context;
};

export const PollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<'teacher' | 'student' | null>(null);
  const [currentPoll, setCurrentPoll] = useState<Poll | null>(null);
  const [polls, setPolls] = useState<Poll[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [studentName, setStudentNameState] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isPolling, setIsPolling] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isKickedOut, setIsKickedOut] = useState(false);
  
  const socketRef = useRef<Socket | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize Socket.io connection
  useEffect(() => {
    const socketUrl = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001';
    const socket = io(socketUrl);
    socketRef.current = socket;

    // Socket event listeners
    socket.on('teacher-connected', (data) => {
      setPolls(data.polls || []);
      setStudents(data.students || []);
      setCurrentPoll(data.currentPoll || null);
      setChatMessages(data.chatMessages || []);
    });

    socket.on('student-connected', (data) => {
      setCurrentPoll(data.currentPoll || null);
      setStudents(data.students || []);
    });

    socket.on('poll-started', (poll) => {
      console.log('New poll started:', poll);
      setCurrentPoll(poll);
      setTimeRemaining(poll.timeLimit);
      setIsPolling(true);
      
      // Reset student answers for new poll
      setStudents(prev => prev.map(student => ({
        ...student,
        hasAnswered: false,
        answer: undefined,
      })));
      
      // Start timer
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    });

    socket.on('poll-updated', (poll) => {
      setCurrentPoll(poll);
    });

    socket.on('poll-ended', (poll) => {
      setCurrentPoll(prev => prev ? { ...prev, isActive: false } : null);
      setPolls(prev => [...prev, poll]);
      setIsPolling(false);
      setTimeRemaining(0);
      if (timerRef.current) clearInterval(timerRef.current);
    });

    socket.on('student-joined', (student) => {
      setStudents(prev => [...prev.filter(s => s.id !== student.id), student]);
    });

    socket.on('student-left', (data) => {
      setStudents(prev => prev.filter(s => s.id !== data.studentId));
    });

    socket.on('student-removed', (data) => {
      setStudents(prev => prev.filter(s => s.id !== data.studentId));
    });

    socket.on('student-answered', (data) => {
      setStudents(prev => prev.map(student => 
        student.id === data.studentId 
          ? { ...student, hasAnswered: true }
          : student
      ));
    });

    socket.on('students-updated', (updatedStudents) => {
      setStudents(updatedStudents);
    });

    socket.on('chat-message', (message) => {
      setChatMessages(prev => [...prev, message]);
    });

    socket.on('kicked-out', () => {
      setIsKickedOut(true);
      // Redirect to kicked out page
      window.location.href = '/kicked-out';
    });

    socket.on('name-exists', () => {
      alert('Name already taken. Please choose a different name.');
    });

    return () => {
      socket.disconnect();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const setStudentName = (name: string) => {
    setStudentNameState(name);
    if (socketRef.current) {
      socketRef.current.emit('student-name', { name });
    }
  };

  const createPoll = (question: string, options: string[], timeLimit: number) => {
    if (socketRef.current) {
      socketRef.current.emit('create-poll', { question, options, timeLimit });
    }
  };

  const submitAnswer = (optionId: string) => {
    if (socketRef.current) {
      socketRef.current.emit('submit-answer', { optionId });
    }
  };

  const endCurrentPoll = () => {
    if (socketRef.current) {
      socketRef.current.emit('end-poll');
    }
  };

  const removeStudent = (studentId: string) => {
    if (socketRef.current) {
      socketRef.current.emit('remove-student', { studentId });
    }
  };

  const sendChatMessage = (message: string, sender: string) => {
    if (socketRef.current) {
      socketRef.current.emit('chat-message', { message });
    }
  };

  const canCreateNewPoll = () => {
    if (!currentPoll) return true;
    if (!currentPoll.isActive) return true;
    
    // All students have answered
    const studentsWithAnswers = students.filter(s => s.hasAnswered);
    return studentsWithAnswers.length === students.length && students.length > 0;
  };

  // Handle role selection
  const handleSetRole = (newRole: 'teacher' | 'student') => {
    setRole(newRole);
    if (socketRef.current) {
      socketRef.current.emit('select-role', { role: newRole });
    }
  };

  const value: PollContextType = {
    role,
    currentPoll,
    polls,
    students,
    studentName,
    timeRemaining,
    isPolling,
    chatMessages,
    setRole: handleSetRole,
    setStudentName,
    createPoll,
    submitAnswer,
    endCurrentPoll,
    removeStudent,
    sendChatMessage,
    canCreateNewPoll,
  };

  return <PollContext.Provider value={value}>{children}</PollContext.Provider>;
};