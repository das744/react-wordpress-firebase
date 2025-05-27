import React, { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { name, email, password } = formData;

    if (!name || !email || !password) {
      setError("Please fill all fields.");
      return;
    }

    try {
      // 1. Create user with email/password in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Save additional info (name) in Firestore
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name,
        email,
        createdAt: new Date(),
      });

      setSuccess("Signup successful! You can now log in.");
      setFormData({ name: "", email: "", password: "" });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      {/* Banner section */}
      <section
        className="banner"
        style={{
          height: "200px",
          background: "url('/banner.jpg') center/cover no-repeat",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <form
          onSubmit={handleSubmit}
          className="signup-form"
          style={{
            background: "rgba(255,255,255,0.9)",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0,0,0,0.2)",
            width: "320px",
          }}
        >
          <h3 style={{ textAlign: "center", marginBottom: "15px" }}>Sign Up</h3>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginBottom: "10px", borderRadius: "4px" }}
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginBottom: "10px", borderRadius: "4px" }}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginBottom: "15px", borderRadius: "4px" }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              background: "#0070f3",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Sign Up
          </button>
          {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
          {success && <p style={{ color: "green", marginTop: "10px" }}>{success}</p>}
        </form>
      </section>
    </>
  );
};

export default Signup;
