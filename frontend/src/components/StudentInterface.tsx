import { useState, useEffect } from 'react';
import { usePoll } from '@/contexts/PollContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MessageCircle } from 'lucide-react';
import Timer from './Timer';
import PollResults from './PollResults';
import ChatPopup from './ChatPopup';

const StudentInterface = () => {
  const { 
    studentName, 
    setStudentName, 
    currentPoll, 
    submitAnswer, 
    students 
  } = usePoll();
  
  const [nameInput, setNameInput] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showChat, setShowChat] = useState(false);

  // Reset submission state when new poll starts
  useEffect(() => {
    if (currentPoll?.isActive) {
      console.log('Resetting student state for new poll:', currentPoll.id);
      setHasSubmitted(false);
      setSelectedAnswer(null);
    }
  }, [currentPoll?.id, currentPoll?.isActive]);

  const handleNameSubmit = () => {
    if (nameInput.trim()) {
      setStudentName(nameInput.trim());
    }
  };

  const handleAnswerSubmit = () => {
    if (selectedAnswer) {
      submitAnswer(selectedAnswer);
      setHasSubmitted(true);
    }
  };

  const currentStudent = students.find(s => s.name === studentName);

  if (!studentName) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-poll-accent p-6">
        <Card className="w-full max-w-md p-6">
          <div className="text-center mb-6">
            <Badge className="bg-poll-primary text-white px-3 py-1 mb-4">
              Intervue Poll
            </Badge>
            <h1 className="text-2xl font-bold mb-2">Let's Get Started</h1>
            <p className="text-poll-gray">
              If you're a student, you'll be able to <span className="font-semibold">submit your answers</span>, participate in live polls, and see how your responses compare with your classmates
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Enter your Name</label>
              <Input
                placeholder="Rahul Bajaj"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleNameSubmit()}
              />
            </div>

            <Button 
              onClick={handleNameSubmit}
              disabled={!nameInput.trim()}
              className="w-full bg-poll-primary hover:bg-poll-primary-dark text-white py-3 rounded-xl"
            >
              Continue
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (!currentPoll) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-poll-accent p-6">
        <div className="text-center">
          <Badge className="bg-poll-primary text-white px-3 py-1 mb-4">
            Intervue Poll
          </Badge>
          <div className="w-16 h-16 border-4 border-poll-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold mb-2">Wait for the teacher to ask questions..</h2>
        </div>
        
        <Button
          className="fixed bottom-6 right-6 rounded-full w-12 h-12 bg-poll-primary hover:bg-poll-primary-dark"
          onClick={() => setShowChat(true)}
        >
          <MessageCircle size={20} />
        </Button>

        {showChat && <ChatPopup onClose={() => setShowChat(false)} />}
      </div>
    );
  }

  if (!currentPoll.isActive || (currentStudent?.hasAnswered && currentPoll.isActive)) {
    return (
      <div className="min-h-screen bg-poll-accent p-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <Badge className="bg-poll-primary text-white px-3 py-1 mb-4">
              Intervue Poll
            </Badge>
          </div>
          
          <PollResults />
          
          <div className="text-center mt-6">
            <p className="text-poll-gray">Wait for the teacher to ask a new question.</p>
          </div>
        </div>

        <Button
          className="fixed bottom-6 right-6 rounded-full w-12 h-12 bg-poll-primary hover:bg-poll-primary-dark"
          onClick={() => setShowChat(true)}
        >
          <MessageCircle size={20} />
        </Button>

        {showChat && <ChatPopup onClose={() => setShowChat(false)} />}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-poll-accent p-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <Badge className="bg-poll-primary text-white px-3 py-1 mb-4">
            Intervue Poll
          </Badge>
          <Timer />
        </div>

        <Card className="p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Question 1</h2>
            <div className="bg-gray-600 text-white p-4 rounded-lg">
              {currentPoll.question}
            </div>
          </div>

          <div className="space-y-3 mb-6">
            {currentPoll.options.map((option) => (
              <div
                key={option.id}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedAnswer === option.id
                    ? 'border-poll-primary bg-poll-secondary'
                    : 'border-poll-border hover:border-poll-primary'
                }`}
                onClick={() => setSelectedAnswer(option.id)}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full ${
                    selectedAnswer === option.id ? 'bg-poll-primary' : 'bg-gray-300'
                  }`}></div>
                  <span>{option.text}</span>
                </div>
              </div>
            ))}
          </div>

          <Button
            onClick={handleAnswerSubmit}
            disabled={!selectedAnswer}
            className="w-full bg-poll-primary hover:bg-poll-primary-dark text-white py-3 rounded-xl"
          >
            Submit
          </Button>
        </Card>
      </div>

      <Button
        className="fixed bottom-6 right-6 rounded-full w-12 h-12 bg-poll-primary hover:bg-poll-primary-dark"
        onClick={() => setShowChat(true)}
      >
        <MessageCircle size={20} />
      </Button>

      {showChat && <ChatPopup onClose={() => setShowChat(false)} />}
    </div>
  );
};

export default StudentInterface;