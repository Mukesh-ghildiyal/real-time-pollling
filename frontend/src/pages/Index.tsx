import { PollProvider, usePoll } from '@/contexts/PollContext';
import RoleSelection from '@/components/RoleSelection';
import TeacherDashboard from '@/components/TeacherDashboard';
import StudentInterface from '@/components/StudentInterface';
import KickedOutScreen from '@/components/KickedOutScreen';

const PollApp = () => {
  const { role, students, studentName } = usePoll();

  // Check if student was kicked out
  const isKickedOut = role === 'student' && studentName && !students.some(s => s.name === studentName);

  if (isKickedOut) {
    return <KickedOutScreen />;
  }

  if (!role) {
    return <RoleSelection />;
  }

  if (role === 'teacher') {
    return <TeacherDashboard />;
  }

  if (role === 'student') {
    return <StudentInterface />;
  }

  return <RoleSelection />;
};

const Index = () => {
  return (
    <PollProvider>
      <PollApp />
    </PollProvider>
  );
};

export default Index;
