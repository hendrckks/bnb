import LargeContainer from "../LargeContainer";
import FeaturedLocations from "./FeaturedLocations";

const Locations = () => {
  return (
    <LargeContainer className="py-10 min-h-screen">
      <div className="py-10 px-80">
        <h2 className="text-lg font-semibold text-[#222222]/90">Locations</h2>
        <p className="text-3xl py-5 text-black/80 font-semibold">
          Explore luxurious apartments & <br />
          rooms that are filled with all you need for <br />
          the perfect gateaway vacation.
        </p>
        <FeaturedLocations />
      </div>
    </LargeContainer>
  );
};

export default Locations;
