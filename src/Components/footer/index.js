import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 text-white py-6 mt-6">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col justify-center md:justify-start">
          <p className="mb-4">&copy; {new Date().getFullYear()} Hackon Team Dynamo (NIT Jalandhar)</p>
          <div className="space-x-4">
            <a href="/privacy" className="text-gray-400 hover:text-gray-200">Privacy Policy</a>
            <a href="/about" className="text-gray-400 hover:text-gray-200">Terms of Service</a>
          </div>
        </div>
        <div className="flex flex-col justify-center md:items-end">
          <p>
            <a href="mailto:khandelwaltushar2002@gmail.com" className="text-gray-400 hover:text-gray-200">Contact Us</a>
            <span className="ml-2">Phone: +91-8302806348</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
