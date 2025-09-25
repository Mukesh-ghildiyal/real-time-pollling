import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { usePoll } from '@/contexts/PollContext';
import { Home, Users, MessageCircle, BarChart3, Info } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  const { role, studentName } = usePoll();

  const isActive = (path: string) => location.pathname === path;

  const navigationItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/about', label: 'About', icon: Info },
    { path: '/features', label: 'Features', icon: BarChart3 },
  ];

  return (
    <nav className="bg-white border-b border-poll-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Badge className="bg-poll-primary text-white px-3 py-1">
                Intervue Poll
              </Badge>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive(item.path) ? "default" : "ghost"}
                    size="sm"
                    className={`flex items-center space-x-2 ${
                      isActive(item.path) 
                        ? 'bg-poll-primary text-white' 
                        : 'text-poll-gray hover:text-poll-primary'
                    }`}
                  >
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* User Status */}
          <div className="flex items-center space-x-4">
            {role && (
              <div className="flex items-center space-x-2">
                <Badge 
                  className={`px-3 py-1 ${
                    role === 'teacher' 
                      ? 'bg-poll-primary text-white' 
                      : 'bg-gray-600 text-white'
                  }`}
                >
                  {role === 'teacher' ? 'Teacher' : studentName || 'Student'}
                </Badge>
                {role === 'teacher' && (
                  <Link to="/teacher">
                    <Button size="sm" variant="outline">
                      Dashboard
                    </Button>
                  </Link>
                )}
                {role === 'student' && (
                  <Link to="/student">
                    <Button size="sm" variant="outline">
                      Student View
                    </Button>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-poll-border">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive(item.path) ? "default" : "ghost"}
                  size="sm"
                  className={`w-full justify-start ${
                    isActive(item.path) 
                      ? 'bg-poll-primary text-white' 
                      : 'text-poll-gray hover:text-poll-primary'
                  }`}
                >
                  <Icon size={16} className="mr-2" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
