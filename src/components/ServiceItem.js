import React from "react";
import Title from "./Title";
import Button from "../UI/Button";
import { Link } from "react-router-dom";
const ServiceItem = (props) => {
  return (
    <div className="col">
      <div className="card-service">
        <div className="card-item">
          <span className="dot">
            <img src={props.image} alt="img" />
          </span>
          <h5 className="card-title">{props.title}</h5>
          <p className="my-3">{props.content}</p>
          <Button
            backgroundColor="inherit"

          >
            <div className="button row">
              <Link to={props.link} style={{ textDecoration: "none" }}>
                <p >Đặt ngay</p>
              </Link>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceItem;
