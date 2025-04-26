import React  from 'react';
import { useStore } from "@/store";
import { useNavigate } from 'react-router-dom';

interface TopNavigationProps {
  isMobile: boolean;
  activeMenuItem: string;
  isDropdownOpen: boolean;
  toggleDropdown: () => void;
  handleMenuItemClick: (itemName: string, subItem?: string | null) => void;
  dropdownRef: React.RefObject<HTMLDivElement>;
}

const TopNavigation: React.FC<TopNavigationProps> = ({
  isMobile,
  activeMenuItem,
  isDropdownOpen,
  toggleDropdown,
  handleMenuItemClick,
  dropdownRef
}) => {
  const { user } = useStore();
const navigate = useNavigate()
  const breadcrumbItems = [
    { name: "Home", href: "#" },
    { name: activeMenuItem, href: "#" },
  ];

  return (
    <nav
      className="flex mb-6 bg-white py-3 px-4 shadow-sm"
      aria-label="Breadcrumb"
    >
      <ol className="flex justify-between items-center space-x-1 w-full">
        <li className="inline-flex items-center">
          {breadcrumbItems.map((item, index) => (
            <div key={item.name} className="inline-flex items-center">
              {index > 0 && (
                <svg
                  className="w-5 h-5 text-gray-400 mx-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}

              <a
                href={item.href}
                className={`
                  text-sm font-medium 
                  ${
                    index === breadcrumbItems.length - 1
                      ? "text-gray-500"
                      : "text-gray-700 hover:text-blue-600"
                  }
                `}
              >
                {item.name}
              </a>
            </div>
          ))}
        </li>
        <li className="ml-auto">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="p-2 rounded-full hover:bg-gray-100 flex items-center text-gray-700"
            >
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm mr-1">
                {user?.fullName.charAt(0)}
              </div>

              {!isMobile && (
                <>
                  <span className="mx-1">{user?.fullName}</span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`w-4 h-4 transition-transform ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </>
              )}
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 py-1">
                <div
                  onClick={() =>
                  {
                    handleMenuItemClick("Profile")
                    navigate('/loan/profile');
                  }

                  }
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                  Profile
                </div>

              

                <div className="border-t border-gray-100 my-1"></div>

                <div
                  onClick={() => handleMenuItemClick("Logout")}
                  className="px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                    />
                  </svg>
                  Logout
                </div>
              </div>
            )}
          </div>
        </li>
      </ol>
    </nav>
  );
};

export default TopNavigation;