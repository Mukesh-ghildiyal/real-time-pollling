import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const KickedOutScreen = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-poll-accent p-6">
      <Card className="w-full max-w-md p-8 text-center">
        <Badge className="bg-poll-primary text-white px-3 py-1 mb-4">
          Intervue Poll
        </Badge>
        
        <h1 className="text-2xl font-bold mb-4">You've been Kicked out !</h1>
        <p className="text-poll-gray mb-6">
          Looks like the teacher has removed you from the poll system. Please try again later or contact your instructor.
        </p>
        
        <button 
          onClick={() => window.location.reload()} 
          className="text-poll-primary font-medium hover:underline"
        >
          Return to Home
        </button>
      </Card>
    </div>
  );
};

export default KickedOutScreen;