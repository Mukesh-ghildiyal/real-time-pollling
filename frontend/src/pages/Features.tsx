import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, Zap, Shield, Smartphone, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Features = () => {
  const features = [
    {
      icon: <Zap className="text-poll-primary" size={24} />,
      title: "Real-time Updates",
      description: "Instant poll results and live updates using WebSocket technology"
    },
    {
      icon: <Shield className="text-poll-primary" size={24} />,
      title: "Secure & Reliable",
      description: "Built with modern security practices and reliable infrastructure"
    },
    {
      icon: <Smartphone className="text-poll-primary" size={24} />,
      title: "Mobile Responsive",
      description: "Works perfectly on all devices - desktop, tablet, and mobile"
    },
    {
      icon: <Globe className="text-poll-primary" size={24} />,
      title: "Cross-platform",
      description: "Compatible with all modern browsers and operating systems"
    }
  ];

  const teacherFeatures = [
    "Create unlimited polls with custom questions",
    "Set flexible time limits (30-120 seconds)",
    "View live participation and results",
    "Remove disruptive students",
    "Access complete polling history",
    "Real-time chat with students",
    "Export poll results",
    "Manage multiple poll sessions"
  ];

  const studentFeatures = [
    "Join sessions with unique names",
    "Submit answers in real-time",
    "View live poll results",
    "Chat with teacher and peers",
    "Automatic session management",
    "Mobile-optimized interface",
    "Instant feedback and results",
    "No registration required"
  ];

  return (
    <div className="min-h-screen bg-poll-accent p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Features</h1>
        </div>

        {/* Core Features */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">Core Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-poll-gray">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Teacher vs Student Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Badge className="bg-poll-primary text-white px-3 py-1">Teacher</Badge>
              <h2 className="text-xl font-semibold">Teacher Features</h2>
            </div>
            <div className="space-y-3">
              {teacherFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 mt-0.5" size={16} />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Badge className="bg-gray-600 text-white px-3 py-1">Student</Badge>
              <h2 className="text-xl font-semibold">Student Features</h2>
            </div>
            <div className="space-y-3">
              {studentFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 mt-0.5" size={16} />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Technical Specifications */}
        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Technical Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Frontend Technology</h3>
              <ul className="space-y-2 text-sm text-poll-gray">
                <li>• React 18 with TypeScript</li>
                <li>• Tailwind CSS for styling</li>
                <li>• Radix UI components</li>
                <li>• Socket.io for real-time communication</li>
                <li>• Vite for fast development</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Backend Technology</h3>
              <ul className="space-y-2 text-sm text-poll-gray">
                <li>• Node.js with Express.js</li>
                <li>• Socket.io for WebSocket connections</li>
                <li>• CORS enabled for cross-origin requests</li>
                <li>• RESTful API endpoints</li>
                <li>• Docker containerization ready</li>
              </ul>
            </div>
          </div>
        </Card>

        <div className="text-center">
          <Link to="/">
            <Button className="bg-poll-primary hover:bg-poll-primary-dark text-white px-8 py-3">
              Start Using Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Features;
