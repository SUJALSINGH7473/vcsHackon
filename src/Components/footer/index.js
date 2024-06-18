import React from 'react';

const Footer = () => {
  return (
    <div>
     <div className="text-center py-4 bg-gray-900">
      <a href="#" className="text-gray-400 hover:text-gray-200" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        Back to top
      </a>
    </div>

    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <h3 className="font-bold mb-2">Get to Know Us</h3>
            <ul>
              <li><a href="/about" className="text-gray-400 hover:text-gray-200">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-gray-200">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-gray-200">Press Releases</a></li>
              <li><a href="#" className="text-gray-400 hover:text-gray-200">Amazon Science</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Connect with Us</h3>
            <ul>
              <li><a href="#" className="text-gray-400 hover:text-gray-200">Facebook</a></li>
              <li><a href="#" className="text-gray-400 hover:text-gray-200">Twitter</a></li>
              <li><a href="#" className="text-gray-400 hover:text-gray-200">Instagram</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Make Money with Us</h3>
            <ul>
              <li><a href="#" className="text-gray-400 hover:text-gray-200">Sell on Amazon</a></li>
              <li><a href="#" className="text-gray-400 hover:text-gray-200">Sell under Amazon Accelerator</a></li>
              <li><a href="#" className="text-gray-400 hover:text-gray-200">Protect and Build Your Brand</a></li>
              <li><a href="#" className="text-gray-400 hover:text-gray-200">Amazon Global Selling</a></li>
              <li><a href="#" className="text-gray-400 hover:text-gray-200">Become an Affiliate</a></li>
              <li><a href="#" className="text-gray-400 hover:text-gray-200">Fulfillment by Amazon</a></li>
              <li><a href="#" className="text-gray-400 hover:text-gray-200">Advertise Your Products</a></li>
              <li><a href="#" className="text-gray-400 hover:text-gray-200">Amazon Pay on Merchants</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Let Us Help You</h3>
            <ul>
              <li><a href="#" className="text-gray-400 hover:text-gray-200">COVID-19 and Amazon</a></li>
              <li><a href="#" className="text-gray-400 hover:text-gray-200">Your Account</a></li>
              <li><a href="#" className="text-gray-400 hover:text-gray-200">Returns Centre</a></li>
              <li><a href="#" className="text-gray-400 hover:text-gray-200">100% Purchase Protection</a></li>
              <li><a href="#" className="text-gray-400 hover:text-gray-200">Amazon App Download</a></li>
              <li><a href="#" className="text-gray-400 hover:text-gray-200">Help</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </div>
  );
};

export default Footer;
