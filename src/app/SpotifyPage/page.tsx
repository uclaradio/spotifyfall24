

// 'use client';

// import Image from "next/image";
// import React, { useState } from 'react';


// export default function Home() {
//   const [inputValue, setInputValue] = useState('');

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setInputValue(event.target.value);
//   };

//   const handleClick = () => {
//     alert(`You typed: ${inputValue}`);
//   };

//   return (
//     <div style={styles.container}>
//     <h1 style={styles.header}>DJenerator</h1>
//     <input
//       type="text"
//       value={inputValue}
//       onChange={handleChange}
//       style={styles.inputBox}
//       placeholder="Name"
//     />
//     <button onClick={handleClick} style={styles.button}>Generate!</button>
//   </div>  
//   );
// }

// const styles = {
//   container: {
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: '100vh',
//     textAlign: 'center',
//     backgroundColor: '#1DB954',
//     color: 'white',
//     fontFamily: '"Helvetica Neue", "Arial", sans-serif',
//   },
//   header: {
//     fontSize: '4rem',
//     fontWeight: '900',
//     marginBottom: '20px',
//     color: 'black',
//   },
//   inputBox: {
//     padding: '10px',
//     fontSize: '1rem',
//     marginBottom: '20px',
//     width: '300px',
//     border: '2px solid black',
//     backgroundColor: 'white',
//     color: 'black',
//   },
//   button: {
//     padding: '10px 20px',
//     fontSize: '1rem',
//     cursor: 'pointer',
//     backgroundColor: '#000',
//     color: '#fff',
//     border: 'none',
//     borderRadius: '5px',
//     fontFamily: '"Helvetica Neue", "Arial", sans-serif',
//   },
// };

'use client';

import React, { useEffect, useState } from 'react';
import { getTopGenres } from '../spotify'; // Adjust the path if necessary

const SpotifyPage: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [genres, setGenres] = useState<Record<string, number> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (!code) {
          setError('Authorization code is missing from URL');
          setLoading(false);
          return;
        }

        const tokenResponse = await fetch('/api/spotify-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code }),
        });

        if (!tokenResponse.ok) {
          throw new Error('Failed to exchange authorization code for token');
        }

        const { access_token } = await tokenResponse.json();
        const genreData = await getTopGenres(access_token);
        setGenres(genreData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleClick = () => {
    alert(`You typed: ${inputValue}`);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>DJenerator</h1>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        style={styles.inputBox}
        placeholder="Name"
      />
      <button onClick={handleClick} style={styles.button}>Generate!</button>

      {/* Display genres in a small text bubble */}
      {loading && <p style={styles.loadingText}>Loading genres...</p>}
      {genres && (
        <div style={styles.genresBubble}>
          <h2 style={styles.genresHeader}>Your Top Genres:</h2>
          <ul style={styles.genresList}>
            {Object.entries(genres).map(([genre, count]) => (
              <li key={genre} style={styles.genreItem}>
                {genre}: {count}
              </li>
            ))}
          </ul>
        </div>
      )}
      {error && <p style={styles.errorText}>Error: {error}</p>}
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
    textAlign: 'center',
    backgroundColor: '#1DB954',
    color: 'white',
    fontFamily: '"Helvetica Neue", "Arial", sans-serif',
  },
  header: {
    fontSize: '4rem',
    fontWeight: '900',
    marginBottom: '20px',
    color: 'black',
  },
  inputBox: {
    padding: '10px',
    fontSize: '1rem',
    marginBottom: '20px',
    width: '300px',
    border: '2px solid black',
    borderRadius: '15px',
    backgroundColor: 'white',
    color: 'black',
  },
  button: {
    padding: '12px 25px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  genresBubble: {
    marginTop: '20px',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: '10px',
    borderRadius: '10px',
    color: 'white',
    fontSize: '0.8rem',
    width: '250px',
    maxHeight: '150px',
    overflowY: 'auto',
    textAlign: 'left',
  },
  genresHeader: {
    fontSize: '1rem',
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  genresList: {
    listStyle: 'none',
    padding: 0,
  },
  genreItem: {
    marginBottom: '5px',
    fontSize: '0.8rem',
  },
  loadingText: {
    fontSize: '0.9rem',
    marginTop: '10px',
    color: '#fff',
  },
  errorText: {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: '10px',
  },
};

export default SpotifyPage;
