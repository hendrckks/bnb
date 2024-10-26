import SmallContainer from "../../components/SmallContainer";

const About = () => {
  return (
    <div className="min-h-screen py-24">
      <SmallContainer className="text-start">
        <div className="text-start flex flex-col gap-10">
          <h2 className="text-6xl font-semibold text-[#222222]">
            Ventos Chalet's
          </h2>
          <p className="text-2xl font-medium w-2/3 text-[#222222]">
            Founded by a team of avid travelers and outdoor enthusiasts, our
            journey began with a shared vision to create a haven where
            discerning travelers could indulge in the ultimate alpine getaway.
          </p>
          <div className="mt-10">
            <img
              src="swiss4.avif"
              className="w-full h-[800px] rounded-3xl object-cover"
              alt="Chalet background"
            />
          </div>
        </div>

        <div className="mt-20 w-1/2 font-medium">
          <p className="text-2xl">
            We curate extraordinary experiences that inspire, rejuvenate, and
            connect our guests with the awe-inspiring beauty of the Swiss Alps.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-medium">Our mission</h3>
          </div>

          <div className="col-span-3 space-y-8">
            <div className="pb-8 border-b border-black/20">
              <h4 className="text-lg font-medium mb-3">
                Elevating Alpine Experiences
              </h4>
              <p className="text-[#6f6f6f]">
                We are dedicated to curating extraordinary experiences that
                inspire, rejuvenate, and connect our guests with the
                awe-inspiring beauty of the Swiss Alps.
              </p>
            </div>

            <div className="pb-8 border-b border-black/20">
              <h4 className="text-lg font-medium mb-3">
                Exceeding Expectations
              </h4>
              <p className="text-[#6f6f6f]">
                From personalized concierge services to attentive hospitality,
                we are committed to surpassing every expectation and ensuring
                that every aspect of your stay is flawless.
              </p>
            </div>

            <div className="pb-8 border-b border-black/20">
              <h4 className="text-lg font-medium mb-3">
                Creating Unforgettable Memories
              </h4>
              <p className="text-[#6f6f6f]">
                From personalized concierge services to attentive hospitality,
                our team is committed to ensuring every aspect of your stay is
                flawless.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <p className="text-2xl w-1/2 font-medium mb-28">
            Step into a world of breathtaking mountain views, cozy fireplaces,
            and elegant interiors.
          </p>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <img
                src="swiss.jpg"
                alt="Swiss Alps in summer"
                className="w-full h-2/3 rounded-3xl object-cover"
              />
              <h4 className="text-lg font-medium">
                Swiss alps - The heart of our chalet's
              </h4>
              <p className="text-[#6f6f6f] text-sm">
                Everything we build and create is inspired the raw and beautiful
                nature of Swiss alps. All of our chalet's are designed and
                engineered in Switzerland and consists of local artifacts.
              </p>
            </div>

            <div className="space-y-4">
              <img
                src="swiss5.avif"
                alt="Swiss Alps in winter"
                className="w-full h-2/3 rounded-3xl object-cover"
              />
              <h4 className="text-lg font-medium">Breathtaking locations</h4>
              <p className="text-[#6f6f6f] text-sm">
                Discover the beauty of the Swiss Alps from our prime locations,
                offering panoramic views and easy access to outdoor activities.
              </p>
            </div>
          </div>
        </div>
      </SmallContainer>
    </div>
  );
};

export default About;
