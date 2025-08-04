import React, { Component, ErrorInfo, ReactNode } from "react";
import { motion } from "framer-motion";

/**
 * Error Boundary Props Interface
 * 
 * Defines the props accepted by the ErrorBoundary component
 * Supports custom fallback UI and error reporting callbacks
 */
interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

/**
 * Error Boundary State Interface
 * 
 * Manages the error state and provides error details
 * for debugging and user feedback
 */
interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

/**
 * Production-Ready Error Boundary Component
 * 
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI instead of crashing.
 * 
 * Features:
 * - Graceful error handling with animated fallback UI
 * - Error reporting callback for logging services
 * - Development mode error details
 * - Production mode user-friendly messages
 * - Automatic retry functionality
 * - Responsive design with dark mode support
 */
class ErrorBoundary extends Component<Props, State> {
  private retryTimeoutId: number | null = null;

  constructor(props: Props) {
    super(props);

    this.state = {
      hasError: false,
      error: undefined,
      errorInfo: undefined
    };
  }

  /**
   * Static method called when an error occurs
   * Updates state to trigger fallback UI rendering
   */
  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    };
  }

  /**
   * Called when an error occurs, provides error details
   * Handles error reporting and logging
   */
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    this.setState({
      error,
      errorInfo
    });

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // In production, you would send this to an error reporting service
    if (process.env.NODE_ENV === 'production') {
      // Example: Sentry.captureException(error, { extra: errorInfo });
    }
  }

  /**
   * Cleanup timeout on unmount
   */
  public componentWillUnmount() {
    if (this.retryTimeoutId) {
      clearTimeout(this.retryTimeoutId);
    }
  }

  /**
   * Retry functionality - resets error state
   * Includes a small delay to prevent immediate re-errors
   */
  private handleRetry = () => {
    this.retryTimeoutId = window.setTimeout(() => {
      this.setState({
        hasError: false,
        error: undefined,
        errorInfo: undefined
      });
    }, 100);
  };

  /**
   * Reload page functionality for severe errors
   */
  private handleReload = () => {
    window.location.reload();
  };

  /**
   * Render fallback UI when error occurs
   * Provides user-friendly error message with recovery options
   */
  private renderFallback() {
    const isDevelopment = process.env.NODE_ENV === 'development';

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-orange-50 dark:from-slate-900 dark:via-slate-800 dark:to-red-900 px-4"
      >
        <div className="max-w-lg w-full text-center">
          {/* Error Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-8"
          >
            <div className="w-24 h-24 mx-auto bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-red-600 dark:text-red-400"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Oops! Something went wrong
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
              We encountered an unexpected error. Don't worry - your data is safe, 
              and we're working to fix this issue.
            </p>
          </motion.div>

          {/* Development Error Details */}
          {isDevelopment && this.state.error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ delay: 0.6 }}
              className="mb-8 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800"
            >
              <h3 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-2">
                Development Error Details:
              </h3>
              <pre className="text-sm text-red-700 dark:text-red-400 text-left overflow-auto max-h-40">
                {this.state.error.toString()}
                {this.state.errorInfo?.componentStack}
              </pre>
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={this.handleRetry}
              className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Try Again
            </button>
            
            <button
              onClick={this.handleReload}
              className="inline-flex items-center px-6 py-3 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg font-medium transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reload Page
            </button>
          </motion.div>

          {/* Contact Information */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 text-sm text-slate-500 dark:text-slate-400"
          >
            If the problem persists, please contact support or try refreshing the page.
          </motion.p>
        </div>
      </motion.div>
    );
  }

  /**
   * Main render method
   * Returns children if no error, fallback UI if error occurred
   */
  public render() {
    if (this.state.hasError) {
      // Use custom fallback if provided, otherwise use default
      return this.props.fallback || this.renderFallback();
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

/**
 * Higher-Order Component for wrapping components with error boundary
 * 
 * @param Component - The component to wrap
 * @param fallback - Optional custom fallback UI
 * @returns Wrapped component with error boundary
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary fallback={fallback}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
}

/**
 * Hook for triggering error boundaries in functional components
 * 
 * @returns Function to trigger error boundary
 */
export function useErrorHandler() {
  return (error: Error) => {
    throw error;
  };
}