import React from "react";
import FAQList from "../../components/faq/FaqList";
import { faqData } from "../../components/faq/Faq";
import AboutSection from "../../components/home sections/AboutSection";
import SmallContainer from "../../components/SmallContainer";

const Faq: React.FC = () => {
  return (
    <div className="bg-white text-[#131211] py-10 text-start">
      <SmallContainer className="flex flex-col md:px-0 px-4 mt-20 item-center">
        <div className="flex flex-col self-start px-5 text-start">
          <h1 className="text-start md:text-4xl text-3xl text-[#131211] font-semibold">
            FAQs
          </h1>
          <h2 className="md:text-4xl text-3xl mt-5 font-medium text-[#131211]">
            Got any questions?
            <br />
            <span className="text-[#b4b3b1] text-2xl">
              Here you can find the answers to most frequently asked questions.
            </span>
          </h2>
        </div>
        <FAQList faqs={faqData} />
        <AboutSection />
      </SmallContainer>
    </div>
  );
};

export default Faq;
