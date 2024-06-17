// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { app } from './utils/firebase'; // Ensure to import from the correct path

console.log('Firebase initialized:', app);

ReactDOM.render(<App />, document.getElementById('root'));


