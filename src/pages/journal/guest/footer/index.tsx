import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Logo and About */}
        <div>
          <div className="flex items-center mb-4">
            <img src="/HeaderLogo.png" alt="IJHESM Logo" className="w-16 h-14 " />
            <h1 className="text-teal-600 text-lg font-semibold">IJHESM</h1>
          </div>
          <p className="text-sm">
            INTERNATIONAL JOURNAL OF HUMANITIES, ENGINEERING, SCIENCE AND MANAGEMENT
          </p>
          <p className="text-sm mt-2">
            An International Peer Reviewed, Open Access Journal
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-4 mt-4">
            <a href="#" className="text-teal-600 hover:text-teal-800 text-lg"><FaFacebookF /></a>
            <a href="#" className="text-teal-600 hover:text-teal-800 text-lg"><FaInstagram /></a>
            <a href="#" className="text-teal-600 hover:text-teal-800 text-lg"><FaTwitter /></a>
            <a href="#" className="text-teal-600 hover:text-teal-800 text-lg"><FaLinkedinIn /></a>
          </div>

          <p className="text-xs mt-4">&copy; Copyright IJHESM. Developed and Managed By <span className="text-teal-600">OJSCLOUD</span></p>
        </div>

        {/* Useful Links */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Useful Links</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-teal-600">Home</a></li>
            <li><a href="#" className="hover:text-teal-600">About us</a></li>
            <li><a href="#" className="hover:text-teal-600">Submit Paper</a></li>
            <li><a href="#" className="hover:text-teal-600">Ethics policy</a></li>
          </ul>
        </div>

        {/* Our Services */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Our Services</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-teal-600">Sample Paper Download</a></li>
            <li><a href="#" className="hover:text-teal-600">Copyright Form</a></li>
            <li><a href="#" className="hover:text-teal-600">Indexing</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
          <div className="text-sm space-y-2">
            <p><span className="font-semibold">Address:</span><br />
              Kathal More - Argora - Ranchi Rd,<br />
              Opp. Water Tank, Dhipatoli,<br />
              Pundag, Ranchi, Jharkhand 834004
            </p>
            <p><span className="font-semibold">Phone:</span><br />
              +91-7260801432<br />
              +91-9308829235
            </p>
            <p><span className="font-semibold">Email:</span><br />
              publications@rkdfuniversity.org
            </p>
          </div>
        </div>

      </div>

      {/* Bottom small text */}
      <div className="text-center text-xs text-gray-500 mt-6">
        © {new Date().getFullYear()} IJHESM. All rights reserved.
      </div>
    </footer>
  );
}
