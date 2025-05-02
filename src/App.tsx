import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from 'react-hot-toast';
import AllRoutes from './routes';
import Navbar from './pages/Journal/guest/navbar';
import Footer from './pages/Journal/guest/footer';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function App() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  useEffect(() => {
    // Watch for route changes and update login status
    const status = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(status);
  }, [location]);
  
  const shouldShowNavAndFooter = !isLoggedIn;

  return (
    <TooltipProvider>
      <Toaster position="top-center" reverseOrder={false} />
      {shouldShowNavAndFooter && <Navbar />}
      <AllRoutes />
      {shouldShowNavAndFooter && <Footer />}
    </TooltipProvider>
  );
}

