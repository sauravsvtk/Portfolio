import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import ErrorBoundary from "./components/ui/error-boundary";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

/**
 * Main Application Component
 * 
 * Sets up the application providers and routing:
 * - ErrorBoundary: Catches and handles runtime errors gracefully
 * - QueryClientProvider: Provides TanStack Query for server state management
 * - ThemeProvider: Manages dark/light theme switching with system preference detection
 * - TooltipProvider: Provides tooltip functionality across the app
 * - Router: Handles client-side routing with wouter
 * 
 * The component hierarchy ensures proper error handling and context provision
 * for all child components throughout the application.
 */
function App() {
  return (
    <ErrorBoundary
      onError={(error, errorInfo) => {
        // In production, send to error reporting service
        console.error('Application Error:', error, errorInfo);
      }}
    >
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
