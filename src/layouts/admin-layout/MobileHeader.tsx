import React from 'react';

interface MobileHeaderProps {
  toggleSidebar: () => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ toggleSidebar }) => {
  return (
    <div className="bg-white p-4 flex items-center justify-between shadow-sm">
      <button
        onClick={toggleSidebar}
        className="p-2 rounded-full hover:bg-gray-200"
      >
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
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>

      <h1 className="text-xl font-bold">Admin</h1>

      <div className="w-10"></div>
    </div>
  );
};

export default MobileHeader;