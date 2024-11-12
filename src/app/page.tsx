'use client';

import React, { useState } from 'react';
import SpotifyPage from './SpotifyPage'; // Import the SpotifyPage component

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to handle login status

  const handleLogin = () => {
    // Hardcoded credentials for demo purposes
    const correctUsername = 'user';
    const correctPassword = '123';

    if (username === correctUsername && password === correctPassword) {
      // Simulate successful login
      localStorage.setItem('isLoggedIn', 'true');
      setIsLoggedIn(true); // Set login status to true
    } else {
      setErrorMessage('Invalid username or password.');
    }
  };

  if (isLoggedIn) {
    return <SpotifyPage />; // Render the SpotifyPage component if logged in
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Login to Spotify</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={styles.inputBox}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.inputBox}
      />
      {errorMessage && <p style={styles.error}>{errorMessage}</p>}
      <button onClick={handleLogin} style={styles.button}>
        Login
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#1DB954',
    color: 'white',
    fontFamily: '"Helvetica Neue", "Arial", sans-serif',
  },
  header: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  inputBox: {
    padding: '10px',
    fontSize: '1rem',
    marginBottom: '20px',
    width: '300px',
    borderRadius: '5px',
    border: '2px solid black',
    backgroundColor: 'white',
    color: 'black',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    cursor: 'pointer',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
  },
};

export default LoginPage;
