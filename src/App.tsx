import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from 'react-hot-toast';
import { useLocation } from 'react-router-dom'; // <-- Import useLocation
import AllRoutes from './routes';
import Navbar from './pages/ijhesm/guest/navbar';
import Footer from './pages/ijhesm/guest/footer';

export default function App() {
  const location = useLocation(); // <-- Get current location

  // Check if URL matches 'ijhesm/admin-home'
  const isAdminHome = location.pathname === '/ijhesm/admin-home';

  return (
    <TooltipProvider>
      <Toaster position="top-center" reverseOrder={false} />
      {!isAdminHome && <Navbar />}
      <AllRoutes />
      {!isAdminHome && <Footer />}
    </TooltipProvider>
  );
}
