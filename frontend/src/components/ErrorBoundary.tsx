import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-poll-accent p-6">
          <Card className="w-full max-w-md p-8 text-center">
            <Badge className="bg-poll-primary text-white px-3 py-1 mb-4">
              Intervue Poll
            </Badge>
            
            <div className="flex justify-center mb-4">
              <AlertTriangle className="text-red-500" size={48} />
            </div>
            
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <p className="text-poll-gray mb-6">
              We're sorry, but something unexpected happened. Please try refreshing the page.
            </p>
            
            {this.state.error && (
              <details className="mb-6 text-left">
                <summary className="cursor-pointer text-sm font-medium mb-2">
                  Error Details
                </summary>
                <pre className="text-xs bg-gray-100 p-3 rounded overflow-auto">
                  {this.state.error.message}
                </pre>
              </details>
            )}
            
            <Button 
              onClick={this.handleReload}
              className="w-full bg-poll-primary hover:bg-poll-primary-dark text-white"
            >
              <RefreshCw size={16} className="mr-2" />
              Reload Page
            </Button>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
