import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from 'react-hot-toast';
import AllRoutes from './routes';
export default function App() {
  return (
    <TooltipProvider>
      <Toaster position="top-center" reverseOrder={false} />
      <AllRoutes />
    </TooltipProvider>
  );
}
