import React from 'react';
import welcomeImage from '../../utils/images/1.png'; // Make sure to provide the correct path to your image

const Welcome = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-white">
      <h2 className="text-4xl font-bold">Hi Welcome!</h2>
      <p className="mt-4 text-lg">Let's Get Started</p>
      <p className="mt-2 text-center">
        Create a free account to get access to full features for 7 days. We invite you to join us and get a better experience.
      </p>
      <img src={welcomeImage} alt="Welcome" className="mt-4 w-60 h-70" />
    </div>
  );
};

export default Welcome;
