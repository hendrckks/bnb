import { Link } from "react-router-dom";

const AboutSection = () => {
  return (
    <div className="py-16 px-8 md:px-16 lg:px-10 flex flex-col md:flex-row h-auto md:h-[720px] w-full bg-[#f3f2ff] rounded-[40px]">
      {/* Left side content */}
      <div className="flex flex-col w-full md:w-1/2 pr-4">
        <div className="flex flex-col gap-8 mb-8">
          <h2 className="text-lg font-medium text-[#222222]">About us</h2>
          <h3 className="text-4xl font-semibold text-gray-900">
            Ventos Chalet's
          </h3>
          <p className="text-black/60">
            We have honed our expertise for over 20 years - delivering award
            winning travel destinations.
          </p>
        </div>

        <div className="flex flex-col space-y-6">
          <div className="flex items-center gap-3 border-b border-black/20 pb-6">
            <div className="w-6 h-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </div>
            <span className="text-black/70 text-sm">
              20+ years of experience
            </span>
          </div>

          <div className="flex items-center gap-3 border-b border-black/20 pb-6">
            <div className="w-6 h-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <span className="text-black/70 text-sm">5000+ guests served</span>
          </div>

          <div className="flex items-center gap-3 border-b border-black/20 pb-6">
            <div className="w-6 h-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
            </div>
            <span className="text-black/70 text-sm">20+ awards received</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 md:mt-20">
          <Link to="/contact-us" className="w-full sm:w-auto bg-[#0a0026] py-3 md:py-4 px-6 md:px-8 rounded-full text-white font-medium text-sm">
            Contact us
          </Link>
          <Link to="/about" className="w-full sm:w-auto border-2 border-[#0a0026] py-3 md:py-4 px-6 md:px-8 rounded-full text-[#0a0026] font-semibold text-sm">
            Learn more
          </Link>
        </div>
      </div>

      {/* Right side image */}
      <div className="w-full md:w-1/2 mt-8 md:mt-0">
        <div className="h-full w-full overflow-hidden rounded-3xl">
          <img
            src="About.jpg"
            alt="Luxury chalet interior with mountain view"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
