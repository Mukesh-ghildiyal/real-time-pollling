import { useState } from 'react';
import { usePoll } from '@/contexts/PollContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { X, Send } from 'lucide-react';

interface ChatPopupProps {
  onClose: () => void;
}

const ChatPopup: React.FC<ChatPopupProps> = ({ onClose }) => {
  const { chatMessages, sendChatMessage, role, studentName } = usePoll();
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      const sender = role === 'teacher' ? 'Teacher' : studentName;
      sendChatMessage(message.trim(), sender);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md h-96 flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="font-semibold">Chat</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X size={16} />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {chatMessages.length === 0 ? (
            <div className="text-center text-poll-gray">
              <p>No messages yet</p>
            </div>
          ) : (
            chatMessages.map((msg) => (
              <div key={msg.id} className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge 
                    className={`text-xs px-2 py-0.5 ${
                      msg.isTeacher 
                        ? 'bg-poll-primary text-white' 
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    {msg.sender}
                  </Badge>
                  <span className="text-xs text-poll-gray">
                    {msg.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-sm bg-gray-50 p-2 rounded">{msg.message}</p>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button
              onClick={handleSend}
              disabled={!message.trim()}
              size="sm"
              className="bg-poll-primary hover:bg-poll-primary-dark text-white"
            >
              <Send size={16} />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ChatPopup;