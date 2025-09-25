import { usePoll } from '@/contexts/PollContext';
import TeacherDashboard from '@/components/TeacherDashboard';
import { Navigate } from 'react-router-dom';

const Teacher = () => {
  const { role } = usePoll();

  if (role !== 'teacher') {
    return <Navigate to="/" replace />;
  }

  return <TeacherDashboard />;
};

export default Teacher;
