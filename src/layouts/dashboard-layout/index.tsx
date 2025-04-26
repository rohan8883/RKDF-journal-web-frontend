import SideBarMenu from '@/components/sidebar';
import { Sheet } from '@/components/ui/sheet';
import { Home, List, ReceiptIndianRupee } from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router-dom';
export default function StudentLayout() {
  const { pathname } = useLocation();
  const path = pathname.split('/').pop();

  return (
    <SideBarMenu>
      <div className="mb-16">
        <Outlet />
      </div>
      {['tech-home', 'profile', 'notification', 'library-home'].includes(
        `${path}`
      ) && (
        <footer className="fixed bottom-0 w-full bg-background border-t sm:bg-transparent sm:px-6">
          <Sheet>
            <div className="flex justify-around items-center py-2">
              <Link to="/loan">
                <div className="flex flex-col items-center justify-center">
                  <Home
                    size={24}
                    className={
                      path === 'home' ? 'text-primary' : 'text-gray-500'
                    }
                  />
                  <span
                    className={`text-xs ${
                      path === 'home' ? 'text-primary' : 'text-gray-500'
                    }`}
                  >
                    Home
                  </span>
                </div>
              </Link>
              <Link to="/loan/receipt-list">
                <div className="flex flex-col items-center justify-center">
                  <ReceiptIndianRupee
                    size={24}
                    className={
                      path === 'profile' ? 'text-primary' : 'text-gray-500'
                    }
                  />
                  <span
                    className={`text-xs ${
                      path === 'profile' ? 'text-primary' : 'text-gray-500'
                    }`}
                  >
                    Receipts
                  </span>
                </div>
              </Link>

              <Link to="/loan/member-list">
                <div className="flex flex-col items-center justify-center">
                  <List
                    size={24}
                    className={
                      path === 'notification' ? 'text-primary' : 'text-gray-500'
                    }
                  />
                  <span
                    className={`text-xs ${
                      path === 'notification' ? 'text-primary' : 'text-gray-500'
                    }`}
                  >
                    Members
                  </span>
                </div>
              </Link>
            </div>
          </Sheet>
        </footer>
      )}
    </SideBarMenu>
  );
}
