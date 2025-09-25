import { usePoll } from '@/contexts/PollContext';
import { Badge } from '@/components/ui/badge';

const Timer = () => {
  const { timeRemaining, currentPoll } = usePoll();

  if (!currentPoll?.isActive) return null;

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return (
    <div className="flex justify-center mb-4">
      <Badge 
        className={`px-4 py-2 text-lg font-mono ${
          timeRemaining <= 10 ? 'bg-poll-timer text-white' : 'bg-gray-600 text-white'
        }`}
      >
        {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
      </Badge>
    </div>
  );
};

export default Timer;