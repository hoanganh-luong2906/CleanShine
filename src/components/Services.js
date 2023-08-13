import React from "react";
import Title from "./Title";
import ServiceCard from "./ServiceCard";
const Services = () => {
  return (
    <>
      <div className="service-container">
        <div className="container">
          <Title
            color="#015450"
            title="NHỮNG DỊCH VỤ CỦA CHÚNG TÔI"
            fontSize="40px"
            fontWeight="700"
          />
          <ServiceCard />
        </div>
      </div>
    </>
  );
};

export default Services;
