import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from 'react-hot-toast';
import AllRoutes from './routes';
import Navbar from './pages/ijhesm/guest/navbar';
import Footer from './pages/ijhesm/guest/footer';
export default function App() {
  return (
    <TooltipProvider>
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar/>
      <AllRoutes />
      <Footer />
    </TooltipProvider>
  );
}
