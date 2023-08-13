import React from "react";
import Card from "../UI/Card";
// import { Link } from "react-router-dom";
const NewsItem = (props) => {
  return (
    <div className="my-5">
      <Card className>
        <div className="row">
          <div className="col-lg-4 col-sm-12 d-flex justify-content-center align-items-center">
            <img
              src={props.image}
              alt=""
              style={{ width: "80%" }}
            />
          </div>
          <div className="col-lg-8 col-sm-12">
            <h1>{props.title}</h1>
            <p>{props.date}</p>
            <p>{props.content}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default NewsItem;
