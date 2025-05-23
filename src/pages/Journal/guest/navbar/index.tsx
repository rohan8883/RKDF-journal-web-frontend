"use client"

import { useState } from "react"
import { Link } from 'react-router-dom'
import { ChevronDown, Menu, X } from "lucide-react"
import { Image } from '@/components/image';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { title: "HOME", link: "/" },
    {
      title: "ABOUT",
      link: "/",
      hasDropdown: true,
      dropdownItems: [
        { title: "ABOUT THE JOURNAL", link: "/" },
        { title: "PRIVACY STATEMENT", link: "/Journal/privacy" },
        { title: "ETHICS POLICY", link: "/Journal/ethicspolicy" },
        { title: "ALL POLICY", link: "/Journal/allPolicy" },
        { title: "INDEXING", link: "/Journal/indexing" },
      ],
    },
    { title: "EDITORIAL BOARD", link: "/Journal/editorialTeam" },
    {
      title: "FOR AUTHOR",
      link: "",
      hasDropdown: true,
      dropdownItems: [
        { title: "SUBMIT PAPER", link: "/Journal/submissions" },
        { title: "PUBLICATION PROCEDURE", link: "/Journal/publicationProcedure" },
        { title: "ARTICLE PROCESSING CHARGE", link: "/Journal/pubChange" },
        { title: "SAMPLE PAPER FORMAT", link: "/RKDF_Journal_Format.pdf", target: "_blank" },
        { title: "COPYRIGHT FORM", link: "/Copyright Agreement Form.pdf",target:"_blank" },
        { title: "RESEARCH AREA", link: "/Journal/researchArea" },
      ],
    },
    { title: "CURRENT", link: "/" },
    { title: "ARCHIVES", link: "/Journal/archive" },
    { title: "NEWS", link: "/Journal/announcement" },
    { title: "CONTACT", link: "/Journal/contact" },
    { title: "REGISTRATION", link: "/Journal/auth/registration" },
    { title: "LOGIN", link: "/Journal/auth/login" },
  ];

  return (
    <header className="w-full">
      {/* Header Logo and Mobile Menu Button */}
      <div className="flex items-center justify-between p-4 bg-white">
        <div className="flex items-center gap-4">
          <div className="relative w-20 h-20">
            <Image
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
                          {dropdownItem.target === "_blank" ? (
                            <a
                              href={dropdownItem.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              {dropdownItem.title}
                            </a>
                          ) : (
                            <Link
                              to={dropdownItem.link}
                              className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              {dropdownItem.title}
                            </Link>
                          )}
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
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between py-2 text-gray-700 font-semibold hover:text-blue-600"
                  >
                    {item.title}
                    {item.hasDropdown && <ChevronDown className="h-4 w-4" />}
                  </Link>
                  {item.hasDropdown && (
                    <div className="ml-4 mt-1">
                      {item.dropdownItems.map((dropdownItem, dropdownIndex) => (
                        dropdownItem.target === "_blank" ? (
                          <a
                            key={dropdownIndex}
                            href={dropdownItem.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block py-2 text-sm text-gray-600 hover:text-blue-600"
                          >
                            {dropdownItem.title}
                          </a>
                        ) : (
                          <Link
                            key={dropdownIndex}
                            to={dropdownItem.link}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block py-2 text-sm text-gray-600 hover:text-blue-600"
                          >
                            {dropdownItem.title}
                          </Link>
                        )
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
  );
};

export default Navbar;
