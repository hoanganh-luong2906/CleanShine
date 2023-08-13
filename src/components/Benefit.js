import React from "react";
import Title from "./Title";
import './Benefit.css';
const Benefit = (props) => {
  return (
    <div className="benefit-container">
      <div className="container">
        <img src={props.image} alt="" />
        <Title
          title={props.title}
          fontSize={props.fontSize}
          fontWeight={props.fontWeight}
          
        />
        <div className="benefit-content">
        <p>{props.content}</p>
        </div>
      </div>
    </div>
  );
};

export default Benefit;
