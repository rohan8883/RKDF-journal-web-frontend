import 'react-lazy-load-image-component/src/effects/blur.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { HelmetProvider } from 'react-helmet-async';
import { ErrorBoundary } from 'react-error-boundary';
import { StateMachineProvider } from 'little-state-machine';
import App from './App.tsx';
import { ThemeProvider } from '@/components/theme-provider';
import { littleMachineStore } from '@/lib/littleMachine.tsx';
import CustomErrorBoundary from './components/error-boundary/CustomErrorBoundary.tsx';
import './index.css';

const queryClient = new QueryClient();
const errorHandler = (error: Error, stackTrace: React.ErrorInfo) => {
  console.error(error, stackTrace);
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary
    FallbackComponent={({ error }) => <CustomErrorBoundary error={error} />}
    onError={(error, stackTrace) => errorHandler(error, stackTrace)}
  >
    {/* @ts-ignore */}
    <StateMachineProvider createStore={littleMachineStore}>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
              <App />
            </ThemeProvider>
          </BrowserRouter>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </HelmetProvider>
    </StateMachineProvider>
  </ErrorBoundary>
);
