

// src/App.js
import React, { useState } from 'react';
import SignIn from './Components/pages/SignIn';
import SignUp from './Components/pages/SignUp';
import Welcome from './Components/pages/Welcome';

import './App.css';



function App() {
  const [isSignUp, setIsSignUp] = useState(true);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-1/2 max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden grid grid-cols-2">
        <div className="p-8 bg-darkgreen flex flex-col justify-center items-center text-white">
          <Welcome />
        </div>
        <div className="p-8 flex flex-col justify-center shadow-lg rounded-lg bg-white">
          <h2 className="text-2xl font-bold text-center">{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
          {isSignUp ? <SignUp /> : <SignIn />}
          <div className="text-center mt-4">
            {isSignUp ? (
              <p>
                Already have an account?{' '}
                <button onClick={toggleForm} className="text-blue-500">
                  Login Here
                </button>
              </p>
            ) : (
              <p>
                Don't have an account?{' '}
                <button onClick={toggleForm} className="text-blue-500">
                  Sign Up Here
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
  
}


export default App;
