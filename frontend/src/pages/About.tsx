import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Users, Clock, MessageCircle, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-poll-accent p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">About Live Polling System</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Users className="text-poll-primary" size={24} />
              <h2 className="text-xl font-semibold">Real-time Interaction</h2>
            </div>
            <p className="text-poll-gray">
              Teachers and students can interact in real-time with instant poll results, 
              live chat, and immediate feedback. Perfect for engaging classroom sessions.
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="text-poll-primary" size={24} />
              <h2 className="text-xl font-semibold">Flexible Timing</h2>
            </div>
            <p className="text-poll-gray">
              Configurable time limits from 30 to 120 seconds. Polls automatically end 
              when time expires or all students have answered.
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <MessageCircle className="text-poll-primary" size={24} />
              <h2 className="text-xl font-semibold">Built-in Chat</h2>
            </div>
            <p className="text-poll-gray">
              Integrated chat system allows seamless communication between teachers 
              and students during polling sessions.
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <BarChart3 className="text-poll-primary" size={24} />
              <h2 className="text-xl font-semibold">Analytics & History</h2>
            </div>
            <p className="text-poll-gray">
              View detailed poll results, participation rates, and access complete 
              polling history for better insights.
            </p>
          </Card>
        </div>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <Badge className="bg-poll-primary text-white px-3 py-1 mt-1">1</Badge>
              <div>
                <h3 className="font-semibold mb-2">Choose Your Role</h3>
                <p className="text-poll-gray">Teachers create polls, students participate in real-time voting.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Badge className="bg-poll-primary text-white px-3 py-1 mt-1">2</Badge>
              <div>
                <h3 className="font-semibold mb-2">Create & Share</h3>
                <p className="text-poll-gray">Teachers create polls with custom questions and time limits.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Badge className="bg-poll-primary text-white px-3 py-1 mt-1">3</Badge>
              <div>
                <h3 className="font-semibold mb-2">Vote & Interact</h3>
                <p className="text-poll-gray">Students submit answers and view live results with chat functionality.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Badge className="bg-poll-primary text-white px-3 py-1 mt-1">4</Badge>
              <div>
                <h3 className="font-semibold mb-2">Analyze Results</h3>
                <p className="text-poll-gray">Review detailed analytics and maintain complete polling history.</p>
              </div>
            </div>
          </div>
        </Card>

        <div className="text-center mt-8">
          <Link to="/">
            <Button className="bg-poll-primary hover:bg-poll-primary-dark text-white px-8 py-3">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
