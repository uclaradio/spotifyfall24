'use client';

import React, { useState } from 'react';
import SpotifyPage from './SpotifyPage/page';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to handle login status
  const path = 'https://accounts.spotify.com/authorize?client_id=03e56877186749aab242532dbd360d61&response_type=code&redirect_uri=http://localhost:3000/SpotifyPage/&scope=user-read-currently-playing+user-top-read'

  const handleLogin = () => {
    window.location.href = path;
  };

  return (
    <div style={styles.container}>
      <img src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg" alt="Spotify Logo" style={styles.logo} />
      <h1 style={styles.header}>Login to Spotify</h1>
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
    textAlign: 'center',
  },
  logo: {
    width: '50px',
    marginBottom: '20px',
    filter: 'brightness(0) invert(0)',
  },
  header: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: 'black',
  },
  button: {
    padding: '15px 30px',
    fontSize: '1.1rem',
    cursor: 'pointer',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '30px',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    fontFamily: '"Helvetica Neue", "Arial", sans-serif',
  },
  buttonHover: {
    backgroundColor: '#333',
    transform: 'scale(1.05)',
  },
  error: {
    color: 'red',
    marginTop: '10px',
    fontSize: '0.9rem',
  },
};

export default LoginPage;
