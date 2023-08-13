import React from "react";
import "./Carousel.css";

const CarouselBar = () => {
  return (
    <>
      <div className="container-fluid">
        <div
          id="carouselBar"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselBar"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            />
            <button
              type="button"
              data-bs-target="#carouselBar"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            />
            <button
              type="button"
              data-bs-target="#carouselBar"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            />
          </div>

          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="assets/images/carose1.svg"
                className="d-block w-100"
                alt="Services"
              />
            </div>
            <div className="carousel-item">
              <img
                src="assets/images/carousel 2.svg"
                className="d-block w-100"
                alt="Services"
              />
            </div>
            <div className="carousel-item">
              <img
                src="assets/images/carose3.svg"
                className="d-block w-100"
                alt="Services"
              />
            </div>
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselBar"
            data-bs-slide="prev"
          >
            <span className="visually-hidden">Previous</span>
          </button>

          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselBar"
            data-bs-slide="next"
          >
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default CarouselBar;
