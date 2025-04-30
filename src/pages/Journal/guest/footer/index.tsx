import { useState } from 'react';
import { Facebook, Instagram, Twitter, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [hoverState, setHoverState] = useState({
    facebook: false,
    instagram: false,
    twitter: false,
    linkedin: false,
  });

  return (
    <footer className="bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* Logo and About */}
        <div className="space-y-4">
          <div className="flex items-center mb-6 transform transition-transform duration-300 hover:scale-105">
            <div className="bg-teal-600 p-3 rounded-lg shadow-md mr-3">
              <img src="/HeaderLogo.png" alt="IJHESM Logo" className="w-16 h-14" />
            </div>
            <div>
              <h1 className="text-teal-600 text-2xl font-bold">IJHESM</h1>
              <div className="h-1 w-16 bg-teal-600 rounded-full mt-1"></div>
            </div>
          </div>

          <p className="text-sm font-medium">
            INTERNATIONAL JOURNAL OF HUMANITIES, ENGINEERING, SCIENCE AND MANAGEMENT
          </p>

          <p className="text-sm bg-teal-50 p-2 border-l-4 border-teal-400 italic">
            An International Peer Reviewed, Open Access Journal
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-5 mt-6">
            <Link
              to="#"
              className="bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:bg-teal-600 hover:text-white"
              onMouseEnter={() => setHoverState({ ...hoverState, facebook: true })}
              onMouseLeave={() => setHoverState({ ...hoverState, facebook: false })}
            >
              <Facebook size={18} className={hoverState.facebook ? "text-white" : "text-teal-600"} />
            </Link>
            <Link
              to="#"
              className="bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:bg-teal-600 hover:text-white"
              onMouseEnter={() => setHoverState({ ...hoverState, instagram: true })}
              onMouseLeave={() => setHoverState({ ...hoverState, instagram: false })}
            >
              <Instagram size={18} className={hoverState.instagram ? "text-white" : "text-teal-600"} />
            </Link>
            <Link
              to="#"
              className="bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:bg-teal-600 hover:text-white"
              onMouseEnter={() => setHoverState({ ...hoverState, twitter: true })}
              onMouseLeave={() => setHoverState({ ...hoverState, twitter: false })}
            >
              <Twitter size={18} className={hoverState.twitter ? "text-white" : "text-teal-600"} />
            </Link>
            <Link
              to="#"
              className="bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:bg-teal-600 hover:text-white"
              onMouseEnter={() => setHoverState({ ...hoverState, linkedin: true })}
              onMouseLeave={() => setHoverState({ ...hoverState, linkedin: false })}
            >
              <Linkedin size={18} className={hoverState.linkedin ? "text-white" : "text-teal-600"} />
            </Link>
          </div>
        </div>

        {/* Useful Links */}
        <div className="mt-6 md:mt-0">
          <h2 className="text-xl font-bold mb-6 relative">
            Useful Links
            <div className="h-1 w-12 bg-teal-600 absolute -bottom-2 left-0 rounded-full"></div>
          </h2>
          <ul className="space-y-3">
            {['Home', 'About us', 'Submit Paper', 'Ethics policy'].map((link, index) => (
              <li key={index} className="transform transition-transform duration-300 hover:translate-x-2">
                <Link to="#" className="text-gray-700 hover:text-teal-600 flex items-center">
                  <div className="w-2 h-2 bg-teal-600 rounded-full mr-2"></div>
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Our Services */}
        <div className="mt-6 md:mt-0">
          <h2 className="text-xl font-bold mb-6 relative">
            Our Services
            <div className="h-1 w-12 bg-teal-600 absolute -bottom-2 left-0 rounded-full"></div>
          </h2>
          <ul className="space-y-3">
            {['Sample Paper Download', 'Copyright Form', 'Indexing'].map((service, index) => (
              <li key={index} className="transform transition-transform duration-300 hover:translate-x-2">
                <Link to="#" className="text-gray-700 hover:text-teal-600 flex items-center">
                  <div className="w-2 h-2 bg-teal-600 rounded-full mr-2"></div>
                  {service}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="mt-6 md:mt-0">
          <h2 className="text-xl font-bold mb-6 relative">
            Contact Us
            <div className="h-1 w-12 bg-teal-600 absolute -bottom-2 left-0 rounded-full"></div>
          </h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <MapPin className="text-teal-600 mr-3 flex-shrink-0 mt-1" size={18} />
              <p className="text-sm">
                Kathal More - Argora - Ranchi Rd,<br />
                Opp. Water Tank, Dhipatoli,<br />
                Pundag, Ranchi, Jharkhand 834004
              </p>
            </div>

            <div className="flex items-start">
              <Phone className="text-teal-600 mr-3 flex-shrink-0 mt-1" size={18} />
              <p className="text-sm">
                +91-7260801432<br />
                +91-9308829235
              </p>
            </div>

            <div className="flex items-start">
              <Mail className="text-teal-600 mr-3 flex-shrink-0 mt-1" size={18} />
              <p className="text-sm">
                publications@rkdfuniversity.org
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-gray-300">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">© {new Date().getFullYear()} IJHESM. All rights reserved.</p>
          <div className="mt-3 md:mt-0">
            <Link to="#" className="text-sm text-gray-600 hover:text-teal-600 mr-4">Terms</Link>
            <Link to="#" className="text-sm text-gray-600 hover:text-teal-600 mr-4">Privacy</Link>
            <a
              href="https://www.google.com/maps/dir//Kathal+More+-+Argora+-+Ranchi+Rd,+Dhipatoli,+Pundag,+Ranchi,+Jharkhand+834004/@23.3328786,85.3170602,13.67z/data=!4m8!4m7!1m0!1m5!1m1!1s0x39f4df8a65a3afed:0xd1c9df42d24ef684!2m2!1d85.2675124!2d23.357248?entry=ttu&g_ep=EgoyMDI1MDQyMy4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-teal-600"
            >
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
