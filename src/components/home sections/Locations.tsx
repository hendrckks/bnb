import LargeContainer from "../LargeContainer";
import FeaturedLocations from "./FeaturedLocations";

const Locations = () => {
  return (
    <LargeContainer className="py-6 sm:py-10 min-h-screen">
      <div className="py-6 sm:py-10 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 2xl:px-80 max-w-[1700px] mx-auto flex flex-col items-center sm:items-start">
        <div className="w-full text-center sm:text-left">
          <h2 className="text-base sm:text-lg font-semibold text-[#222222]/90">
            Locations
          </h2>
          <p className="text-xl sm:text-2xl md:text-3xl py-3 sm:py-5 text-black/80 font-semibold max-w-3xl">
            Explore luxurious apartments & <br /> rooms that are filled with all
            you need for the <br /> perfect gateaway vacation.
          </p>
        </div>
        <div className="w-full">
          <FeaturedLocations />
        </div>
      </div>
    </LargeContainer>
  );
};

export default Locations;
