import { Outlet } from 'react-router-dom';
import Navbar from '../navbar';
import Footer from '../footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-sans">
      {/* Fixed Navbar */}
      <Navbar />
      <div>
        {/* Main section where different pages will render */}
        <main>
          <Outlet />
          <div>
            jhghjgjjg
          </div>
        </main>
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
