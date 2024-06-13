import React from 'react';
import About from '../faq/About/about'; 
import 'tailwindcss/tailwind.css';

// Import images
import headerImage from '../../utils/images/2.png';
import awsImage from '../../utils/images/4.png';
import purchaseImage from '../../utils/images/5.png';
import refundImage from '../../utils/images/6.png';
import sellingImage from '../../utils/images/7.png';
import generalQueriesImage from '../../utils/images/3.png';

function MainPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="relative h-80 bg-blue-500 text-white p-6 flex items-center justify-between overflow-visible mt-6">
        <div className="z-10 pl-4 md:pl-20">
          <h1 className="text-2xl sm:text-3xl md:text-3xl font-bold">HOW CAN WE</h1>
          <h1 className="text-2xl sm:text-3xl md:text-3xl font-bold">HELP YOU TODAY?</h1>
        </div>
        <div className="absolute top-1/2 right-4 md:right-[50px] transform -translate-y-1/2 h-full flex items-center justify-center z-0 md:z-10">
    <img
      src={headerImage}
      alt="Header Image"
      className="h-40 w-40 sm:h-[250px] sm:w-[250px] md:h-[500px] md:w-[500px] object-cover"
    />
    </div>
      </div>

      {/* Categories */}
      <div className="flex justify-center mt-12 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <Category image={awsImage} label="AWS Queries" />
          <Category image={purchaseImage} label="Online Retailer" />
          <Category image={refundImage} label="Refund Queries" />
          <Category image={sellingImage} label="Selling Products" />
          <Category image={generalQueriesImage} label="General Queries" />
        </div>
      </div>

      {/* Sample Video Section */}
      <div className="text-center my-12 px-4">
        <h2 className="text-2xl font-bold">Sample Video explaining the Usecase</h2>
        <div className="mt-4">
          <img src="/path/to/sample-video-thumbnail.jpg" alt="Sample Video" className="mx-auto w-full max-w-lg" />
        </div>
      </div>

      {/* FAQ Section */}
      <div className="px-4 mt-12">
        <About />
      </div>
    </div>
  );
}

function Category({ image, label }) {
  return (
    <div className="text-center">
      <div className="p-4 bg-white rounded shadow-md overflow-hidden relative">
        <img src={image} alt={label} className="h-24 w-24 sm:h-32 sm:w-32 md:h-[150px] md:w-[150px] mx-auto mb-4" />
        <div className="mt-2 text-sm sm:text-base">{label}</div>
      </div>
    </div>
  );
}

export default MainPage;
