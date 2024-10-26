import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="min-h-[50vh] w-full bg-gradient-to-br from-[#001126] to-[#404c5f] relative">
      <div className="py-10 md:py-20 px-6 md:px-20 lg:px-32 xl:px-96 flex flex-col md:flex-row justify-between gap-12 md:gap-8">
        {/* Left section */}
        <div className="flex flex-col gap-6 md:gap-10">
          <div>
            <img
              src="Footer logo.png"
              className="h-10 md:h-14"
              alt="Footer logo"
            />
          </div>
          <div>
            <p className="text-xl md:text-2xl text-white font-semibold">
              Award winning Luxury homes.
            </p>
          </div>
        </div>

        {/* Vertical line - hidden on mobile */}
        <div className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-2/3 w-[1px] h-[60%] bg-gray-600" />

        {/* Middle section - Navigation */}
        <div className="flex flex-col gap-4">
          <h3 className="text-white font-semibold mb-2">Navigation</h3>
          <div className="flex flex-col gap-3 md:gap-4">
            <Link
              to="/"
              className="text-white hover:text-gray-300 text-sm md:text-base"
            >
              Home
            </Link>
            <Link
              to="#"
              className="text-white hover:text-gray-300 text-sm md:text-base"
            >
              Locations
            </Link>
            <Link
              to="/about"
              className="text-white hover:text-gray-300 text-sm md:text-base"
            >
              About us
            </Link>
            <Link
              to="/faq"
              className="text-white hover:text-gray-300 text-sm md:text-base"
            >
              FAQ
            </Link>
            <Link
              to="/contact-us"
              className="text-white hover:text-gray-300 text-sm md:text-base"
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Right section - Social media */}
        <div className="flex flex-col gap-4">
          <h3 className="text-white font-semibold mb-2">Social media</h3>
          <div className="flex flex-col gap-3 md:gap-4">
            <Link
              to="#"
              className="text-white hover:text-gray-300 text-sm md:text-base"
            >
              X/Twitter
            </Link>
            <Link
              to="#"
              className="text-white hover:text-gray-300 text-sm md:text-base"
            >
              Youtube
            </Link>
            <Link
              to="#"
              className="text-white hover:text-gray-300 text-sm md:text-base"
            >
              Instagram
            </Link>
            <Link
              to="#"
              className="text-white hover:text-gray-300 text-sm md:text-base"
            >
              Threads
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700 w-full px-6 md:px-20 lg:px-32 xl:px-96 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
          <div className="text-white md:text-sm text-xs text-cente font-semibold md:text-left">
            © 2024 built by Devscook LLC. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center md:justify-end gap-4 text-white md:text-sm text-xs">
            <a href="#" className="hover:text-gray-300">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gray-300">
              Cookies
            </a>
            <a href="#" className="hover:text-gray-300">
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
