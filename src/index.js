// index.js or App.js
import React from 'react';
import ReactDOM from 'react-dom';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './utils/firebase'; 
import App from './App';

// Initialize Firebase
initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('root'));
