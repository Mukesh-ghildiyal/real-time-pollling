import { usePoll } from '@/contexts/PollContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';

interface PollHistoryProps {
  onBack: () => void;
}

const PollHistory: React.FC<PollHistoryProps> = ({ onBack }) => {
  const { polls } = usePoll();

  const completedPolls = polls.filter(poll => !poll.isActive);

  return (
    <div className="min-h-screen bg-poll-accent p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-2xl font-bold">View Poll History</h1>
        </div>

        {completedPolls.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-poll-gray">No completed polls yet</p>
          </Card>
        ) : (
          <div className="space-y-6">
            {completedPolls.map((poll, index) => {
              const totalVotes = poll.options.reduce((sum, option) => sum + option.votes, 0);

              return (
                <Card key={poll.id} className="p-6">
                  <div className="mb-4">
                    <Badge className="bg-poll-primary text-white px-3 py-1 mb-2">
                      Question {index + 1}
                    </Badge>
                    <div className="bg-gray-600 text-white p-3 rounded-lg">
                      {poll.question}
                    </div>
                  </div>

                  <div className="space-y-3">
                    {poll.options.map((option) => {
                      const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
                      
                      return (
                        <div key={option.id} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-4 h-4 rounded-full bg-poll-primary"></div>
                              <span className="font-medium">{option.text}</span>
                            </div>
                            <span className="font-semibold">{percentage}%</span>
                          </div>
                          
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className="bg-poll-primary h-3 rounded-full"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-4 text-sm text-poll-gray">
                    <p>Total responses: {totalVotes}</p>
                    <p>Created: {poll.createdAt.toLocaleString()}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default PollHistory;