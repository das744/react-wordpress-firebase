import React from "react";
import "./Banner.css";

const Banner = () => {
  return (
    <section className="banner">
      <div className="banner-content">
        <h1>We Build Modern Web Experiences</h1>
        <p>Your one-stop solution for stunning, responsive, and functional websites.</p>
        <a href="#contact" className="btn-banner">Let’s Talk</a>
      </div>
    </section>
  );
};

export default Banner;
