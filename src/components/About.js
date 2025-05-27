import React from "react";
import "./About.css";

const About = () => {
  return (
    <section className="about" id="about">
      <div className="about-content">
        <div className="about-text">
          <h2>About Us</h2>
          <p>We are a passionate team of developers and designers dedicated to building beautiful and functional websites. Our mission is to deliver pixel-perfect results with strong performance and seamless user experience.</p>
        </div>
        <div className="about-image">
          <img src="./about.jpg" alt="About Us" />
        </div>
      </div>
    </section>
  );
};

export default About;
