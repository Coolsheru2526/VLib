import React from "react";
import HeroCarousel from "./HeroCarousel";
import Footer from "./Footer";
import Testimonials from "./Testimonials";
import CallToAction from "./CallToAction";
import BookRecommendations from "./BookRecommendations ";
const Home = () => {
  return (
    <>
      <HeroCarousel />
      <CallToAction />
      <BookRecommendations />
      <Testimonials />
      <Footer />
    </>
  );
};

export default Home;
