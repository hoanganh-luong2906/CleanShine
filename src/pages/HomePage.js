import React from "react";
import Carousel from "../components/CarouselBar";
import Services from "../components/Services";
import Feedback from "../components/Feedback";
import WhyUs from "../components/WhyUs";

const HomePage = () => {
  return (
    <>
      <Carousel />
      <Services />
      <Feedback />
      <WhyUs />
    </>
  );
};

export default HomePage;
