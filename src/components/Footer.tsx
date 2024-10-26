const Footer = () => {
  return (
    <div className="h-[50vh] w-full bg-gradient-to-br from-[#001126] to-[#404c5f] relative">
      <div className="py-20 px-96 flex justify-between">
        {/* Left section */}
        <div className="flex flex-col gap-10">
          <div>
            <img src="Footer logo.png" className="h-14" />
          </div>
          <div>
            <p className="text-2xl text-white font-semibold">
              Award winning Luxury homes.
            </p>
          </div>
        </div>

        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-2/3 w-[1px] h-[60%] bg-gray-600" />
        {/* Middle section - Navigation */}
        <div className="flex flex-col gap-4">
          <h3 className="text-white font-semibold mb-2">Navigation</h3>
          <a href="#" className="text-white hover:text-gray-300">
            Home
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            Locations
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            About us
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            FAQ
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            Contact
          </a>
        </div>

        {/* Right section - Social media */}
        <div className="flex flex-col gap-4">
          <h3 className="text-white font-semibold mb-2">Social media</h3>
          <a href="#" className="text-white hover:text-gray-300">
            X/Twitter
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            Youtube
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            Instagram
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            Threads
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-0 w-full px-96 py-4 flex justify-between items-center border-t border-gray-700">
        <div className="text-white text-sm">
          © 2024 built by Devscook LLC. All rights reserved.
        </div>
        <div className="flex gap-4 text-white text-sm">
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
  );
};

export default Footer;
