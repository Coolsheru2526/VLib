import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap";
// import "./HeroCarousel.css"; // Import the custom CSS file

const HeroCarousel = () => {
  return (
    <Carousel>
      <Carousel.Item className="carousel-item-height">
        <img
          className="d-block w-100 carousel-image"
          //   src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          src="https://via.placeholder.com/1200x400?text=Featured+Book+1"
          alt="Featured Book 1"
        />
        <Carousel.Caption>
          <h3>Featured Book 1</h3>
          <p>
            Discover the intriguing world of our featured book of the month.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className="carousel-item-height">
        <img
          className="d-block w-100 carousel-image"
          src="https://via.placeholder.com/1200x400?text=Featured+Book+2"
          alt="Featured Book 2"
        />
        <Carousel.Caption>
          <h3>Featured Book 2</h3>
          <p>Explore the adventures in our second featured book.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className="carousel-item-height">
        <img
          className="d-block w-100 carousel-image"
          src="https://via.placeholder.com/1200x400?text=Featured+Book+3"
          alt="Featured Book 3"
        />
        <Carousel.Caption>
          <h3>Featured Book 3</h3>
          <p>Get inspired by our third featured book.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default HeroCarousel;
