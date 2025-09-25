import { useState } from 'react';
import { usePoll } from '@/contexts/PollContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Trash2, Plus, MessageCircle, History } from 'lucide-react';
import PollResults from './PollResults';
import ChatPopup from './ChatPopup';
import PollHistory from './PollHistory';

const TeacherDashboard = () => {
  const { 
    currentPoll, 
    students, 
    createPoll, 
    endCurrentPoll, 
    removeStudent,
    canCreateNewPoll 
  } = usePoll();
  
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [timeLimit, setTimeLimit] = useState(60);
  const [showChat, setShowChat] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const addOption = () => {
    setOptions([...options, '']);
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleCreatePoll = () => {
    if (question.trim() && options.every(opt => opt.trim())) {
      createPoll(question, options.filter(opt => opt.trim()), timeLimit);
      setQuestion('');
      setOptions(['', '']);
    }
  };

  const handleAskNewQuestion = () => {
    endCurrentPoll();
  };

  if (showHistory) {
    return <PollHistory onBack={() => setShowHistory(false)} />;
  }

  return (
    <div className="min-h-screen bg-poll-accent p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Badge className="bg-poll-primary text-white px-3 py-1">
              Intervue Poll
            </Badge>
            <h1 className="text-2xl font-bold">Let's Get Started</h1>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowHistory(true)}
              className="flex items-center gap-2"
            >
              <History size={16} />
              View Poll History
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowChat(true)}
              className="flex items-center gap-2"
            >
              <MessageCircle size={16} />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Question Creation */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">
              {currentPoll?.isActive ? 'Question' : 'Enter your question'}
            </h2>
            
            {currentPoll?.isActive ? (
              <div className="space-y-4">
                <div className="bg-gray-600 text-white p-3 rounded-lg">
                  {currentPoll.question}
                </div>
                
                <div className="space-y-2">
                  {currentPoll.options.map((option, index) => (
                    <div key={option.id} className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-poll-primary"></div>
                      <span>{option.text}</span>
                    </div>
                  ))}
                </div>

                {canCreateNewPoll() && (
                  <Button 
                    onClick={handleAskNewQuestion}
                    className="w-full bg-poll-primary hover:bg-poll-primary-dark text-white"
                  >
                    + Ask a new question
                  </Button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-poll-gray">
                    {question.length}/100
                  </span>
                  <Select value={timeLimit.toString()} onValueChange={(value) => setTimeLimit(parseInt(value))}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 seconds</SelectItem>
                      <SelectItem value="60">60 seconds</SelectItem>
                      <SelectItem value="90">90 seconds</SelectItem>
                      <SelectItem value="120">120 seconds</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Input
                  placeholder="Enter your question"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  maxLength={100}
                  className="bg-gray-50"
                />

                <div className="space-y-2">
                  <h3 className="font-medium">Edit Options</h3>
                  
                  {options.map((option, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-poll-primary"></div>
                      <Input
                        placeholder={`Option ${index + 1}`}
                        value={option}
                        onChange={(e) => updateOption(index, e.target.value)}
                        className="flex-1"
                      />
                      {options.length > 2 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeOption(index)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      )}
                    </div>
                  ))}
                  
                  {options.length < 6 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={addOption}
                      className="w-full"
                    >
                      <Plus size={16} className="mr-2" />
                      Add More option
                    </Button>
                  )}
                </div>

                <Button 
                  onClick={handleCreatePoll}
                  disabled={!question.trim() || !options.every(opt => opt.trim())}
                  className="w-full bg-poll-primary hover:bg-poll-primary-dark text-white"
                >
                  Start Poll
                </Button>
              </div>
            )}
          </Card>

          {/* Participants or Results */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Participants</h3>
              <span className="text-sm text-poll-gray">{students.length} online</span>
            </div>
            
            {currentPoll?.isActive ? (
              <PollResults />
            ) : students.length > 0 ? (
              <div className="space-y-2">
                {students.map((student) => (
                  <div key={student.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span>{student.name}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeStudent(student.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Kick out
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-poll-gray py-8">
                <p>No students connected yet</p>
              </div>
            )}
          </Card>
        </div>
      </div>

      {showChat && <ChatPopup onClose={() => setShowChat(false)} />}
    </div>
  );
};

export default TeacherDashboard;