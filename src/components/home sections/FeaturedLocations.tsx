import { Link } from "react-router-dom";
import AboutSection from "./AboutSection";

const FeaturedLocations = () => {
  return (
    <div className="flex flex-col gap-10 md:gap-20">
      {/* First Location */}
      <div className="flex flex-col md:flex-row max-h-full md:max-h-[650px] w-full md:gap-10 py-5 md:py-10 h-full">
        <div className="flex-1 mb-6 md:mb-0">
          <img
            className="rounded-2xl md:rounded-3xl w-full h-[300px] md:h-full object-cover"
            src="/featured1.jpg"
            alt="Lake Chalet"
          />
        </div>
        <div className="flex flex-col gap-4 md:gap-5 flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8">
            <p className="text-xl md:text-2xl font-semibold">Lake Chalet</p>
            <div className="flex items-center gap-1">
              <span className="text-base md:text-lg font-semibold">4.9</span>
              <div className="flex">
                {"★★★★★".split("").map((star, i) => (
                  <span key={i} className="text-yellow-500 text-lg md:text-xl">
                    {star}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <p className="w-full text-sm md:text-base text-[#222222]">
            Our luxurious chalet is perfect for weekend getaways or extended
            stays, offering an exceptional experience in Alps.
          </p>
          <div className="border border-b-black/50 border-transparent text-[#575757] font-semibold p-4 md:p-6 text-sm">
            1 - 8 guests
          </div>
          <div className="border border-b-black/50 border-transparent text-[#575757] font-semibold p-4 md:p-6 text-sm">
            Perfect for outdoor activities
          </div>
          <div className="border border-b-black/50 border-transparent text-[#575757] font-semibold p-4 md:p-6 text-sm">
            Wi-fi
          </div>
          <div className="border border-b-black/50 border-transparent text-[#575757] font-semibold p-4 md:p-6 text-sm">
            Interlaken 101, Nyeri
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 md:mt-10">
            <Link to="/contact-us" className="w-full sm:w-auto bg-[#0a0026] py-3 md:py-4 px-6 md:px-8 rounded-full text-white font-semibold text-sm">
              Contact us
            </Link>
            <button className="w-full sm:w-auto border-2 border-[#0a0026] py-3 md:py-4 px-6 md:px-8 rounded-full text-[#0a0026] font-semibold text-sm">
              Learn more
            </button>
          </div>
        </div>
      </div>

      {/* Second Location */}
      <div className="flex flex-col md:flex-row max-h-full md:max-h-[650px] w-full md:gap-10 py-5 md:py-10 h-full">
        <div className="flex-1 mb-6 md:mb-0 md:hidden">
          <img
            className="rounded-2xl md:rounded-3xl w-full h-[300px] md:h-full object-cover"
            src="/featured2.jpg"
            alt="Mountain Chalet"
          />
        </div>
        <div className="flex flex-col gap-4 md:gap-5 flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8">
            <p className="text-xl md:text-2xl font-semibold">Mountain Chalet</p>
            <div className="flex items-center gap-1">
              <span className="text-base md:text-lg font-semibold">4.8</span>
              <div className="flex">
                {"★★★★★".split("").map((star, i) => (
                  <span key={i} className="text-yellow-500 text-lg md:text-xl">
                    {star}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <p className="w-full text-sm md:text-base text-[#222222]">
            Mountain Chalet offers the ideal retreat for weekend getaways or
            extended vacations, immersing you in the beauty of Switzerland.
          </p>
          <div className="border border-b-black/50 border-transparent text-[#575757] font-semibold p-4 md:p-6 text-sm">
            1 - 4 guests
          </div>
          <div className="border border-b-black/50 border-transparent text-[#575757] font-semibold p-4 md:p-6 text-sm">
            Breakfast included
          </div>
          <div className="border border-b-black/50 border-transparent text-[#575757] font-semibold p-4 md:p-6 text-sm">
            Wi-fi
          </div>
          <div className="border border-b-black/50 border-transparent text-[#575757] font-semibold p-4 md:p-6 text-sm">
            Interlaken 102, Nyeri
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 md:mt-10">
            <Link to="/contact-us" className="w-full sm:w-auto bg-[#0a0026] py-3 md:py-4 px-6 md:px-8 rounded-full text-white font-semibold text-sm">
              Book now
            </Link>
            <button className="w-full sm:w-auto border-2 border-[#0a0026] py-3 md:py-4 px-6 md:px-8 rounded-full text-[#0a0026] font-semibold text-sm">
              Learn more
            </button>
          </div>
        </div>
        <div className="flex-1 hidden md:block">
          <img
            className="rounded-2xl md:rounded-3xl w-full h-full object-cover"
            src="/featured2.jpg"
            alt="Mountain Chalet"
          />
        </div>
      </div>
      <AboutSection />
    </div>
  );
};

export default FeaturedLocations;
