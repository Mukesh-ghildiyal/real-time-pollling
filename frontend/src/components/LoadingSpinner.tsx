import { Badge } from '@/components/ui/badge';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

const LoadingSpinner = ({ message = "Loading...", size = 'md' }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-poll-accent">
      <Badge className="bg-poll-primary text-white px-3 py-1 mb-4">
        Intervue Poll
      </Badge>
      <div className={`${sizeClasses[size]} border-4 border-poll-primary border-t-transparent rounded-full animate-spin mb-4`}></div>
      <p className="text-poll-gray">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
