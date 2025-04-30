import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from 'react-hot-toast';
import { useLocation } from 'react-router-dom'; // <-- Import useLocation
import AllRoutes from './routes';
import Navbar from './pages/Journal/guest/navbar';
import Footer from './pages/Journal/guest/footer';

export default function App() {
  const location = useLocation(); // <-- Get current location

  // Check if URL matches 'Journal/admin-home'
  const isAdminHome = location.pathname === '/Journal/admin-home';

  return (
    <TooltipProvider>
      <Toaster position="top-center" reverseOrder={false} />
      {!isAdminHome && <Navbar />}
      <AllRoutes />
      {!isAdminHome && <Footer />}
    </TooltipProvider>
  );
}
