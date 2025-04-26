import React, { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./SideBar";
import TopNavigation from "./TopNav";
import MobileHeader from "./MobileHeader";
import { useStore } from "@/store";

const AdminDashboard: React.FC = () => {
  const {logout} = useStore()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState("Dashboard");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>(
    {}
  );

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  // Check screen size and adjust sidebar
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;

      setIsMobile(mobile);

      // Automatically close sidebar on mobile
      if (mobile) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    // Check initial screen size
    checkScreenSize();

    // Add event listener for resize
    window.addEventListener("resize", checkScreenSize);

    // Cleanup listener
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Toggle submenu expansion
  const toggleSubmenu = (menuName: string) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Toggle dropdown menu
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Handle menu item click
  const handleMenuItemClick = (itemName: string, subItem?: string | null) => {
    if (subItem) {
      setActiveMenuItem(`${itemName} - ${subItem}`);
    } else {
      setActiveMenuItem(itemName);
    }

    // Add specific actions for each menu item
    switch (itemName) {
      case "Logout":
        logout()
        break;

      case "Profile":
        // Could open a profile modal or navigate to profile page
        break;

      default:
        break;
    }

    // Close mobile sidebar if open
    if (isMobile) {
      setIsSidebarOpen(false);
    }

    // Close dropdown
    setIsDropdownOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        isMobile={isMobile}
        activeMenuItem={activeMenuItem}
        expandedMenus={expandedMenus}
        toggleSidebar={toggleSidebar}
        handleMenuItemClick={handleMenuItemClick}
        toggleSubmenu={toggleSubmenu}
      />

      <div
        className={`
          flex-1 
          transition-all duration-300 
          overflow-y-auto
        `}
      >
        {/* Mobile Header */}
        {isMobile && <MobileHeader toggleSidebar={toggleSidebar} />}

        {/* Top Navigation */}
        <TopNavigation
          isMobile={isMobile}
          activeMenuItem={activeMenuItem}
          isDropdownOpen={isDropdownOpen}
          toggleDropdown={toggleDropdown}
          handleMenuItemClick={handleMenuItemClick}
          dropdownRef={dropdownRef}
        />

        {/* Main Content */}
        <div className="bg-white p-4 rounded-lg shadow-md m-4  ">
          <h1 className="text-2xl font-bold mb-4">{activeMenuItem}</h1>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
