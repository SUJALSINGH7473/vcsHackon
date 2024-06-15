import React, { useState, useEffect } from 'react';
import { db } from '../../utils/firebase'; // Adjust the import path if necessary
import { collection, getDocs } from 'firebase/firestore';
import About from '../faq/About/about';
import 'tailwindcss/tailwind.css';
import phone from '../../utils/images/phone.svg';

import headerImage from '../../utils/images/2.png';
import awsImage from '../../utils/images/4.png';
import purchaseImage from '../../utils/images/5.png';
import refundImage from '../../utils/images/6.png';
import sellingImage from '../../utils/images/7.png';
import generalQueriesImage from '../../utils/images/3.png';

import CallPopup from './callPopup';
import { useReactMediaRecorder } from 'react-media-recorder';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MainPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryData, setCategoryData] = useState(null);

  const openPopup = () => {
    setShowPopup(true);
  };

  const fetchCategoryData = async (category) => {
    try {
      console.log(category);
      const querySnapshot = await getDocs(collection(db, 'Queries'));
      querySnapshot.forEach((doc) => {
        if (doc.id === category) {
          setCategoryData(doc.data());
        }
      });
    } catch (error) {
      console.error("Error fetching category data: ", error);
    }
  };

  useEffect(() => {
    if (selectedCategory) {
      fetchCategoryData(selectedCategory);
    }
  }, [selectedCategory]);

  const mediaRecorder = useReactMediaRecorder({ audio: true });
  return (
    <div className="min-h-screen bg-gray-100">
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
      <div className="relative h-80 bg-blue-500 text-white p-6 flex items-center justify-between overflow-visible mt-10">
        <div className="pl-20">
          <h1 className="text-5xl font-bold block">HOW CAN WE</h1>
          <h1 className="text-5xl font-bold block">HELP YOU TODAY?</h1>
          <button onClick={openPopup} className="mt-6 px-8 py-3 bg-green-400 text-white text-xl font-bold rounded-lg shadow-lg hover:bg-green-400 transition duration-300 ease-in-out">
            <img src={phone} alt="Phone Icon" className="inline-block w-10 h-15 m-2 transform hover:rotate-y-6 transition duration-300" />
            Call now
          </button>
        </div>
        <div className="absolute top-1/2 right-4 md:right-[50px] transform -translate-y-1/2 h-full flex items-center justify-center sm:z-10 md:z-0">
          <img
            src={headerImage}
            alt="Header Image"
            className="h-40 w-40 sm:h-[250px] sm:w-[250px] md:h-[500px] md:w-[500px] object-cover"
          />
        </div>
      </div>

      <div className="flex justify-center mt-16 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-7">
          <Category image={awsImage} label="AWS Support" onClick={() => setSelectedCategory('aws')} />
          <Category image={purchaseImage} label="Online Retailer" onClick={() => setSelectedCategory('retailer')} />
          <Category image={refundImage} label="Refund Requests" onClick={() => setSelectedCategory('refund')} />
          <Category image={sellingImage} label="Seller Support" onClick={() => setSelectedCategory('seller')} />
          <Category image={generalQueriesImage} label="Prime Member Services" onClick={() => setSelectedCategory('prime')} />
          <Category image={generalQueriesImage} label="General Inquiries" onClick={() => setSelectedCategory('general')} />
        </div>
      </div>

      {categoryData && (
        <div className="px-4 mt-12">
          <h2 className="text-2xl font-bold">{selectedCategory} Data</h2>
          <pre className="bg-white p-4 rounded shadow-md">
            {JSON.stringify(categoryData, null, 2)}
          </pre>
        </div>
      )}

      <div className="text-center my-12 px-4">
        <h2 className="text-2xl font-bold">Sample Video explaining the Usecase</h2>
        <div className="mt-4">
          <img src="/path/to/sample-video-thumbnail.jpg" alt="Sample Video" className="mx-auto w-full max-w-lg" />
        </div>
      </div>

      <div className="px-4 mt-12">
        <About />
      </div>
      {showPopup && <CallPopup onClose={()=>setShowPopup(false)} mediaRecorder={mediaRecorder}/>}
    </div>
  );
}

function Category({ image, label, onClick }) {
  return (
    <div className="text-center category-card" onClick={onClick}>
      <div className="p-4 bg-white rounded shadow-md overflow-hidden relative transform transition-transform duration-300 ease-in-out hover:scale-105 hover:rotate-x-10 hover:rotate-y-6">
        <img
          src={image}
          alt={label}
          className="h-24 w-24 sm:h-32 sm:w-32 md:h-[150px] md:w-[150px] mx-auto mb-4"
        />
        <div className="mt-2 text-sm sm:text-base">{label}</div>
      </div>
    </div>
  );
}

export default MainPage;
