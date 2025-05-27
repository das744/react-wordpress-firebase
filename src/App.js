import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import About from "./components/About";
import Services from "./components/Services";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);
  const [showAuthForm, setShowAuthForm] = useState(null); // "login" | "signup" | null

  // keep track of auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setShowAuthForm(null);
    });
    return unsubscribe;
  }, []);

  return (
    <div>
      <Navbar
        user={user}
        onLogout={() => auth.signOut()}
        onShowLogin={() => setShowAuthForm("login")}
        onShowSignup={() => setShowAuthForm("signup")}
      />

      {/* AUTH MODAL / FORM */}
      {showAuthForm === "login" && <Login />}
      {showAuthForm === "signup" && <Signup />}

      {/* ALWAYS SHOW SITE SECTIONS */}
      <Banner />
      <About />
      <Services />
      <Blog />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
