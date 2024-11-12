

'use client';

import Image from "next/image";
import React, { useState } from 'react';


export default function Home() {
  const [inputValue, setInputValue] = useState('');

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
  </div>  
  );
}

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
    fontFamily: '"Helvetica Neue", "Arial", sans-serif',
  },
};