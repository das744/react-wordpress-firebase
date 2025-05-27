import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase'; // adjust the path if needed

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async () => {
    setErrorMsg('');
    try {
      // Authenticate using Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch user's name from Firestore
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      const userName = userDoc.exists() ? userDoc.data().name : email;

      // Trigger parent login callback with user name
      onLogin(userName);
    } catch (error) {
      console.error(error);
      setErrorMsg('Invalid credentials or user not found.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', padding: '20px', background: '#fff', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center' }}>Login</h2>
      <input
        placeholder="Email"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px' }}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px' }}
      />
      <button
        onClick={handleLogin}
        style={{ width: '100%', padding: '10px', borderRadius: '5px', background: '#0070f3', color: '#fff', border: 'none' }}
      >
        Login
      </button>
      {errorMsg && <p style={{ color: 'red', marginTop: '10px' }}>{errorMsg}</p>}
    </div>
  );
};

export default Login;
