import { usePoll } from '@/contexts/PollContext';
import StudentInterface from '@/components/StudentInterface';
import { Navigate } from 'react-router-dom';

const Student = () => {
  const { role } = usePoll();

  if (role !== 'student') {
    return <Navigate to="/" replace />;
  }

  return <StudentInterface />;
};

export default Student;
