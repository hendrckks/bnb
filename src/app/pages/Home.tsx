import AboutSection from "../../components/home sections/AboutSection";
import Locations from "../../components/home sections/Locations";

const Home = () => {
  return (
    <div className="min-h-screen w-full px-4 py-8">
      <div
        className="w-full max-w-[1700px] mx-auto rounded-3xl overflow-hidden relative h-[800px] bg-cover bg-center"
        style={{
          backgroundImage: `url('/background1.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent">
          <div className="p-16 h-full flex flex-col justify-end">
            <h1 className="text-white text-6xl font-semibold mb-4">
              Book the best gateaway
              <br />
              trip of your life
            </h1>
            <p className="text-white/80 text-lg mb-6">
              Award-winning resorts in Swiss alps.
            </p>
            <button className="bg-white text-black font-semibold text-sm px-8 py-3 rounded-full w-fit hover:bg-white/90 transition-colors">
              Explore & Book
            </button>
          </div>
        </div>
      </div>
      <Locations />
      {/* <AboutSection /> */}
    </div>
  );
};

export default Home;
