import React from 'react';
import welcomeImage from '../utils/images/tk.jpeg'; // Ensure the path is correct

function Welcome() {
  return (
    <div className="w-1/2 bg-green-500 p-8 flex flex-col justify-center text-white">
      <h1 className="text-4xl font-bold">Let's Get Started</h1>
      <p className="mt-4">
        Create a free account and get access to full features for 7 days. We invite you to join us and get a better experience.
      </p>
      <img src={welcomeImage} alt="Welcome" className="mt-8" />
    </div>
  );
}

export default Welcome;