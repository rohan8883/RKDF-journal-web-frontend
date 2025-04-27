"use client"

import { useState } from "react"
import { Link } from 'react-router-dom'
import { ChevronDown, Menu, X } from "lucide-react"

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { title: "HOME", link: "/" },
    { title: "ABOUT US", link: "/ijhesm/about" },
    {
      title: "EDITORIAL BOARD",
      link: "/editorial-board",
      hasDropdown: true,
      dropdownItems: [
        { title: "EDITORIAL TEAM", link: "/editorial-team" },
        { title: "ADVISORY BOARD", link: "/advisory-board" },
      ],
    },
    { title: "CURRENT ISSUE", link: "/current-issue" },
    {
      title: "ARCHIVES",
      link: "/archives",
      hasDropdown: true,
      dropdownItems: [
        { title: "2023 ISSUES", link: "/archives/2023" },
        { title: "2022 ISSUES", link: "/archives/2022" },
        { title: "2021 ISSUES", link: "/archives/2021" },
      ],
    },
    {
      title: "FOR AUTHOR",
      link: "/for-author",
      hasDropdown: true,
      dropdownItems: [
        { title: "CALL FOR PAPER", link: "/call-for-paper" },
        { title: "AUTHOR GUIDELINES", link: "/author-guidelines" },
        { title: "COPYRIGHT FORM", link: "/copyright-form" },
        { title: "SAMPLE PAPER FORMAT", link: "/sample-paper-format" },
        { title: "PROCESSING CHARGES", link: "/processing-charges" },
      ],
    },
    { title: "RESEARCH AREA", link: "/research-area" },
    { title: "PAPER SUBMIT", link: "/paper-submit" },
    { title: "CONTACT US", link: "/ijhesm/contact" },
    { title: "REGISTRATION", link: "/contact-us" },
    { title: "LOGIN", link: "/ijhesm/auth/login" },
  ];

  return (
    <header className="w-full">
      {/* Header Logo and Mobile Menu Button */}
      <div className="flex items-center justify-between p-4 bg-white">
        <div className="flex items-center gap-4">
          <div className="relative w-20 h-20">
            <img
              src="/HeaderLogo.png"
              alt="BIJMRD Logo"
              className="object-contain w-full h-full"
            />
          </div>
          <div className="hidden md:flex flex-col">
            <h1 className="text-xl md:text-2xl font-bold text-green-700">
              INTERNATIONAL JOURNAL OF HUMANITIES, ENGINEERING, SCIENCE AND MANAGEMENT
            </h1>
            <p className="text-sm md:text-base text-red-500 font-semibold">
              ISSN: 2582-8169 | An International Peer Reviewed | Open Access Journal
            </p>
          </div>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-700 focus:outline-none"
          >
            {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="bg-white border-t-2 border-b border-gray-200 relative hidden md:block">
        <div className="container mx-auto px-4">
          <ul className="flex flex-wrap items-center justify-center">
            {navItems.map((item, index) => (
              <li key={index} className="relative group">
                <div className="flex items-center px-4 py-8 text-sm font-medium text-gray-700 hover:text-blue-600 cursor-pointer">
                  <Link to={item.link}>
                    <span>{item.title}</span>
                  </Link>
                  {item.hasDropdown && (
                    <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
                  )}
                </div>
                {item.hasDropdown && (
                  <div className="absolute left-0 mt-0 w-56 bg-white shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
                    <ul className="py-1">
                      {item.dropdownItems.map((dropdownItem, dropdownIndex) => (
                        <li key={dropdownIndex}>
                          <Link
                            to={dropdownItem.link}
                            className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            {dropdownItem.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <ul className="flex flex-col p-4 space-y-2">
            {navItems.map((item, index) => (
              <li key={index}>
                <div className="flex flex-col">
                  <Link
                    to={item.link}
                    className="flex items-center justify-between py-2 text-gray-700 font-semibold hover:text-blue-600"
                  >
                    {item.title}
                    {item.hasDropdown && <ChevronDown className="h-4 w-4" />}
                  </Link>
                  {item.hasDropdown && (
                    <div className="ml-4 mt-1">
                      {item.dropdownItems.map((dropdownItem, dropdownIndex) => (
                        <Link
                          key={dropdownIndex}
                          to={dropdownItem.link}
                          className="block py-2 text-sm text-gray-600 hover:text-blue-600"
                        >
                          {dropdownItem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

     
    </header>
  )
}

export default Navbar;
