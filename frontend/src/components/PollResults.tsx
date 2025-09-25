import { usePoll } from '@/contexts/PollContext';

const PollResults = () => {
  const { currentPoll, students } = usePoll();

  if (!currentPoll) return null;

  const totalVotes = currentPoll.options.reduce((sum, option) => sum + option.votes, 0);
  const totalStudents = students.length;

  return (
    <div className="space-y-4">
      <div className="bg-gray-600 text-white p-4 rounded-lg mb-4">
        {currentPoll.question}
      </div>

      <div className="space-y-3">
        {currentPoll.options.map((option) => {
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
                  className="bg-poll-primary h-3 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      {!currentPoll.isActive && totalStudents > 0 && (
        <div className="text-center text-sm text-poll-gray mt-4">
          <p>Total responses: {totalVotes} / {totalStudents}</p>
        </div>
      )}
    </div>
  );
};

export default PollResults;