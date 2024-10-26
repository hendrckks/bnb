import Locations from "../../components/home sections/Locations";

const Home = () => {
  return (
    <div className="min-h-screen  scroll-smooth w-full px-2 sm:px-4 py-4 sm:py-8">
      <div
        className="w-full max-w-[1700px] mx-auto rounded-xl sm:rounded-3xl overflow-hidden relative h-[400px] sm:h-[600px] md:h-[800px] bg-cover bg-center"
        style={{
          backgroundImage: `url('/background1.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent">
          <div className="p-6 sm:p-12 md:p-16 h-full flex flex-col justify-end">
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-2 sm:mb-4">
              Book the best gateaway
              <br className="hidden sm:block" />
              trip of your life
            </h1>
            <p className="text-white/80 md:text-base text-sm mb-4 sm:mb-6">
              Award-winning resorts in Swiss alps.
            </p>
            <button className="bg-white text-black font-semibold text-sm px-6 sm:px-8 py-2.5 sm:py-3 rounded-full w-fit hover:bg-white/90 transition-colors">
              Explore & Book
            </button>
          </div>
        </div>
      </div>
      <Locations />
    </div>
  );
};

export default Home;
