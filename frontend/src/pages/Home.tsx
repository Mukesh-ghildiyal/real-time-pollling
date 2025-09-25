import { usePoll } from '@/contexts/PollContext';
import RoleSelection from '@/components/RoleSelection';

const Home = () => {
  const { role } = usePoll();

  if (role) {
    // Redirect to appropriate dashboard
    window.location.href = role === 'teacher' ? '/teacher' : '/student';
    return null;
  }

  return <RoleSelection />;
};

export default Home;
