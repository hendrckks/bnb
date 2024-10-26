const FeaturedLocations = () => {
  return (
    <div className="flex flex-col gap-20">
      {/* First Location */}
      <div className="flex max-h-[650px] w-full gap-10 py-10 h-full">
        <div className="flex-1">
          <img
            className="rounded-3xl w-full h-full object-cover"
            src="/featured1.jpg"
            alt="Lake Chalet"
          />
        </div>
        <div className="flex flex-col gap-5 flex-1">
          <div className="flex items-center gap-8">
            <p className="text-2xl font-semibold">Lake Chalet</p>
            <div className="flex items-center gap-1">
              <span className="text-lg font-semibold">4.9</span>
              <div className="flex">
                {"★★★★★".split("").map((star, i) => (
                  <span key={i} className="text-yellow-500 text-xl">
                    {star}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <p className="w-full text-base text-[#222222]">
            Our luxurious chalet is perfect for weekend getaways or extended
            stays, offering an exceptional experience in Alps.
          </p>
          <div className="border border-b-black/50 border-transparent text-[#575757] font-semibold p-6 text-sm">
            1 - 8 guests
          </div>
          <div className="border border-b-black/50 border-transparent text-[#575757] font-semibold p-6 text-sm">
            Perfect for outdoor activities
          </div>
          <div className="border border-b-black/50 border-transparent text-[#575757] font-semibold p-6 text-sm">
            Wi-fi
          </div>
          <div className="border border-b-black/50 border-transparent text-[#575757] font-semibold p-6 text-sm">
            Interlaken 101, Switzerland
          </div>
          <div className="flex gap-4 mt-10">
            <button className="bg-[#0a0026] py-4 px-8 rounded-full text-white font-semibold text-sm">
              Book now
            </button>
            <button className="border border-[#0a0026] py-4 px-8 rounded-full text-[#0a0026] font-semibold text-sm">
              Learn more
            </button>
          </div>
        </div>
      </div>

      {/* Second Location (Mirrored) */}
      <div className="flex max-h-[650px] w-full gap-10 py-10 h-full">
        <div className="flex flex-col gap-5 flex-1">
          <div className="flex items-center gap-8">
            <p className="text-2xl font-semibold">Mountain Chalet</p>
            <div className="flex items-center gap-1">
              <span className="text-lg font-semibold">4.8</span>
              <div className="flex">
                {"★★★★★".split("").map((star, i) => (
                  <span key={i} className="text-yellow-500 text-xl">
                    {star}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <p className="w-full text-base text-[#222222]">
            Mountain Chalet offers the ideal retreat for weekend getaways or
            extended vacations, immersing you in the beauty of Switzerland.
          </p>
          <div className="border border-b-black/50 border-transparent text-[#575757] font-semibold p-6 text-sm">
            1 - 4 guests
          </div>
          <div className="border border-b-black/50 border-transparent text-[#575757] font-semibold p-6 text-sm">
            Breakfast included
          </div>
          <div className="border border-b-black/50 border-transparent text-[#575757] font-semibold p-6 text-sm">
            Wi-fi
          </div>
          <div className="border border-b-black/50 border-transparent text-[#575757] font-semibold p-6 text-sm">
            Interlaken 102, Switzerland
          </div>
          <div className="flex gap-4 mt-10">
            <button className="bg-[#0a0026] py-4 px-8 rounded-full text-white font-semibold text-sm">
              Book now
            </button>
            <button className="border border-[#0a0026] py-4 px-8 rounded-full text-[#0a0026] font-semibold text-sm">
              Learn more
            </button>
          </div>
        </div>
        <div className="flex-1">
          <img
            className="rounded-3xl w-full h-full object-cover"
            src="/featured2.jpg"
            alt="Mountain Chalet"
          />
        </div>
      </div>
    </div>
  );
};

export default FeaturedLocations;
