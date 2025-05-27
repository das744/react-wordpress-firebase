import React from "react";
import "./Services.css";

const services = [
  { title: "Web Design", desc: "Beautiful and responsive UI designs tailored for your brand." },
  { title: "Web Development", desc: "Modern, scalable, and performant websites built with the latest tech." },
  { title: "SEO Optimization", desc: "Improve your website ranking and organic reach." },
];

const Services = () => {
  return (
    <section className="services" id="services">
      <h2>Our Services</h2>
      <div className="services-grid">
        {services.map((service, i) => (
          <div className="service-card" key={i}>
            <h3>{service.title}</h3>
            <p>{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
