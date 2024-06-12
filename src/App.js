import React, { useState } from 'react';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import Welcome from './Components/Welcome';

function App() {
  const [isSignUp, setIsSignUp] = useState(true);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden flex">
        <Welcome />
        <div className="w-1/2 p-8">
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
