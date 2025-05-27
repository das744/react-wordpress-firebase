import React, { useState } from "react";
import "./Contact.css";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError("");

    try {
      await addDoc(collection(db, "contacts"), {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        timestamp: new Date()
      });
      setSuccess(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setError("Failed to send message. Please try again.");
      console.error(err);
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        {/* Contact Form */}
        <div className="contact-form">
          <h2>Contact Us</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              rows="5"
              placeholder="Your Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <button type="submit">Send Message</button>
          </form>
          {success && <p className="success-msg">Message sent successfully! We will contact you ASAP.</p>}
          {error && <p className="error-msg">{error}</p>}
        </div>

        {/* Contact Info */}
        <div className="contact-info">
          <h2>Get In Touch</h2>
          <p><strong>📞 Phone:</strong> +61 123 456 789</p>
          <p><strong>📍 Location:</strong> Sydney, Australia</p>
          <p><strong>🏢 Address:</strong> 123 Prime Street, NSW 2000</p>
          <div className="social-links">
            <a href="#" aria-label="Facebook">🌐 Facebook</a>
            <a href="#" aria-label="Twitter">🌐 Twitter</a>
            <a href="#" aria-label="Instagram">🌐 Instagram</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
