import { usePoll } from '@/contexts/PollContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const RoleSelection = () => {
  const { setRole } = usePoll();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-poll-accent p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to the Live Polling System
          </h1>
          <p className="text-poll-gray">
            Please select the role that best describes you to begin using the live polling system
          </p>
        </div>

        <div className="space-y-4">
          <Card 
            className="p-6 border-2 border-poll-border hover:border-poll-primary transition-colors cursor-pointer group"
            onClick={() => {
              setRole('student');
              navigate('/student');
            }}
          >
            <div className="flex flex-col">
              <h3 className="font-semibold text-lg mb-2 group-hover:text-poll-primary transition-colors">
                I'm a Student
              </h3>
              <p className="text-sm text-poll-gray">
                Join live polls, submit answers, and view real-time results with your classmates
              </p>
            </div>
          </Card>

          <Card 
            className="p-6 border-2 border-poll-border hover:border-poll-primary transition-colors cursor-pointer group"
            onClick={() => {
              setRole('teacher');
              navigate('/teacher');
            }}
          >
            <div className="flex flex-col">
              <h3 className="font-semibold text-lg mb-2 group-hover:text-poll-primary transition-colors">
                I'm a Teacher
              </h3>
              <p className="text-sm text-poll-gray">
                Create polls, manage students, and view live results and analytics
              </p>
            </div>
          </Card>
        </div>

        <div className="mt-6">
          <Button 
            variant="poll"
            className="w-full py-3"
            disabled
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;