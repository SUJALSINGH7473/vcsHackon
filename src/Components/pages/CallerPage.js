import React, { useState, useEffect } from "react";
import { db } from "../../utils/firebase"; // Adjust the import path if necessary
import { collection, getDocs } from "firebase/firestore";
import About from "../faq/About/about";
import "tailwindcss/tailwind.css";
import phone from "../../utils/images/phone.svg";
import headerImage from "../../utils/images/2.png";
import awsImage from "../../utils/images/4.png";
import purchaseImage from "../../utils/images/5.png";
import refundImage from "../../utils/images/6.png";
import sellingImage from "../../utils/images/7.png";
import generalQueriesImage from "../../utils/images/3.png";
import video from "../../utils/images/video.svg";

import CallPopup from "./callPopup";
import { useReactMediaRecorder } from "react-media-recorder";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Footer from "../footer";
import Navbar from "../../Components/navbar/index";
import { categoryLabels } from "../../utils/helper";
function MainPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [categorySelected, setCategorySelected] = useState(0); //initially general category is default category

  const openPopup = () => {
    setShowPopup(true);
  };

  const categories = [
    { image: generalQueriesImage, label: 'General Inquiries' },
    { image: awsImage, label: 'AWS Support' },
    { image: purchaseImage, label: 'Online Retailer' },
    {image: refundImage, label: 'Refund Requests'},
    {image: sellingImage, label: 'Seller Support'},
    {image: generalQueriesImage, label: 'Prime Member Services'}
  ];

  function Category({ image, label, onClick, index }) {
    return (
      <div className="text-center category-card" onClick={onClick}>
        <div className={`p-4 bg-white rounded shadow-md overflow-hidden relative transform transition-transform duration-300 ease-in-out hover:scale-105 hover:rotate-x-10 hover:rotate-y-6 ${index===categorySelected?'border-2 border-green-500 font-bold text-gray-700 shadow-lg' : ''}`}>
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

  const mediaRecorder = useReactMediaRecorder({ audio: true });
  useEffect(()=>{
    toast.success("Click on Call Now");
  }, [categorySelected])
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar  />
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
      <div className="relative h-80 bg-blue-500 text-white  flex items-center justify-between overflow-visible mt-12 lg:mx-14 md:mx-12 sm:mx-10 rounded-3xl ">
        <div className="pl-20">
          <h1 className="lg:text-5xl md:text-3xl sm:text-xl font-bold block">
            HOW CAN WE
          </h1>
          <h1 className="lg:text-5xl md:text-3xl sm:text-xl font-bold block">
            HELP YOU TODAY?
          </h1>
          <button
            onClick={openPopup}
            className="lg:mt-6 md:mt-4 px-4 md:py-2 sm:px-6 sm:py-2 lg:px-8 lg:py-3 bg-gradient-to-r from-green-400 to-green-500 text-white text-lg font-bold rounded-lg shadow-xl hover:bg-gradient-to-r hover:from-green-500 hover:to-green-600 transition duration-300 ease-in-out flex items-center"
          >
            <img
              src={phone}
              alt="Phone Icon"
              className="inline-block w-8 h-8 sm:w-10 sm:h-10 mr-2 transform hover:rotate-6 transition duration-300"
            />
            <span>Call now</span>
          </button>
        </div>
        <div className="absolute top-1/2 right-4 md:right-[50px] transform -translate-y-1/2 h-full flex items-center justify-center sm:z-0 ">
          <img
            src={headerImage}
            alt="Header Image"
            className="h-40 w-40 sm:h-[300px] sm:w-[300px] md:h-[500px] md:w-[500px] object-cover"
          />
        </div>
      </div>

      <div className="flex justify-center mt-10 px-4">
        <div className="flex flex-col p-0 m-0">
        <div className="text-center text-2xl mb-7 font-bold">Select your category</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-7">
        {categories.map((category, index) => ( 
        <Category
          key={index} // Add a unique key for each category
          image={category.image}
          label={category.label}
          onClick={() => setCategorySelected(index)}
          index={index}
        />
      ))}
      </div>
        </div>
      </div>

      <div className="text-center">
        <div className="inline-block mt-4 relative">
          <div className="absolute inset-0  rounded-lg"></div>{" "}
          {/* Black rectangle */}
          <img
            src={video}
            alt="Sample Video"
            className="max-w-full h-auto relative"
            style={{ width: "5rem", height: "5rem" }} // Adjust width and height inline
          />
        </div>
      </div>

      <div className="px-4 mt-12">
        <About />
      </div>
      {showPopup && (
        <CallPopup
          onClose={() => setShowPopup(false)}
          mediaRecorder={mediaRecorder} category={categorySelected}
        />
      )}

      <Footer />
    </div>
  );
}

export default MainPage;
