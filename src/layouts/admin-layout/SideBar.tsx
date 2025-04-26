import React from 'react';
import { useNavigate } from 'react-router-dom';
import { menuItems } from './menuItem';

interface SidebarProps {
  isSidebarOpen: boolean;
  isMobile: boolean;
  activeMenuItem: string;
  expandedMenus: Record<string, boolean>;
  toggleSidebar: () => void;
  handleMenuItemClick: (itemName: string, subItem?: string | null) => void;
  toggleSubmenu: (menuName: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isSidebarOpen,
  isMobile,
  activeMenuItem,
  expandedMenus,
  toggleSidebar,
  handleMenuItemClick,
  toggleSubmenu
}) => {
  const navigate = useNavigate();

  

  return (
    <div
      className={`
        ${
          isMobile
            ? `fixed top-0 left-0 bottom-0 z-40 
               ${isSidebarOpen ? "w-64 translate-x-0" : "-translate-x-full"}`
            : `${isSidebarOpen ? "w-64" : "w-20"} relative`
        }
        bg-white shadow-lg 
        transition-all duration-300 
        overflow-y-auto
      `}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b">
        {isSidebarOpen && (
          <h2 className="text-xl font-bold text-gray-800">Admin</h2>
        )}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-gray-200"
        >
          {isSidebarOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Sidebar Menu with Submenus */}
      <nav className="mt-5">
        {menuItems.map((item) => (
          <div key={item.name}>
            <div
              onClick={() => {
                if (item.submenu) {
                  toggleSubmenu(item.name);
                } else {
                  handleMenuItemClick(item.name);
                  navigate(`/loan/${item.url}`);
                }
              }}
              className={`
                flex items-center p-3 cursor-pointer 
                ${
                  activeMenuItem === item.name ||
                  activeMenuItem.startsWith(`${item.name} - `)
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }
                ${isSidebarOpen ? "justify-between px-4" : "justify-center"}
              `}
            >
              <div className="flex items-center">
                <span className={isSidebarOpen ? "mr-3" : ""}>
                  {item.icon}
                </span>
                {isSidebarOpen && (
                  <span className="text-sm">{item.name}</span>
                )}
              </div>

              {isSidebarOpen && item.submenu && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`w-4 h-4 transition-transform ${
                    expandedMenus[item.name] ? "rotate-180" : ""
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              )}
            </div>

            {/* Submenu */}
            {isSidebarOpen && item.submenu && expandedMenus[item.name] && (
              <div className="pl-12 bg-gray-50">
                {item.submenu.map((subItem) => (
                  <div
                    key={subItem.name}
                    onClick={() => {
                      navigate(`/loan/${subItem.url}`);
                      handleMenuItemClick(item.name, subItem.name);
                    }}
                    className={`
                      py-2 px-4 cursor-pointer text-sm
                      ${
                        activeMenuItem === `${item.name} - ${subItem.name}`
                          ? "text-blue-600 font-medium"
                          : "text-gray-600 hover:text-blue-600"
                      }
                    `}
                  >
                    {subItem.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;