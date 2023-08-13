import React from "react";
import { Link } from "react-router-dom";

const ServiceNavigation = (props) => {
  return (
    <div className="row d-flex justify-content-center navigate-btn">
      <div className="col-md-4 pt-2 pb-2 d-flex justify-content-center cont-btn">
        <button onClick={props.payHandler}>Tiếp tục</button>
      </div>
      <div className="col-md-4 pt-2 pb-2 d-flex justify-content-center back-btn">
        <button>
          <Link to="..">Quay lại</Link>
        </button>
      </div>
    </div>
  );
};

export default ServiceNavigation;
