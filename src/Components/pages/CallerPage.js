import React, { useState, useEffect } from "react";
import About from "../faq/About/about";
import "tailwindcss/tailwind.css";
import phone from "../../utils/images/phone.svg";
import headerImage from "../../utils/images/2.png";
import awsImage from "../../utils/images/4.png";
import purchaseImage from "../../utils/images/5.png";
import refundImage from "../../utils/images/6.png";
import sellingImage from "../../utils/images/7.png";
import generalQueriesImage from "../../utils/images/3.png";
import primes from "../../utils/images/primes.png";
import CallPopup from "./callPopup";
import { useReactMediaRecorder } from "react-media-recorder";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../footer";
import Navbar from "../../Components/navbar/index";
import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { CircleArrowLeft, CircleArrowRight } from 'lucide-react';
import {EffectCoverflow, Pagination, Navigation} from 'swiper/modules';
import './main.css';
import slider1 from "../../utils/images/slider-1.png";
import slider2 from "../../utils/images/slider-2.png";
import slider3 from "../../utils/images/slider-3.png";
import slider4 from "../../utils/images/slider-4.png";
import slider5 from "../../utils/images/slider-5.png";
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
    {image: sellingImage, label: 'Buyers Support'},
    {image: primes, label: 'Prime Members '}
  ];

  function Category({ image, label, onClick, index }) {
    return (
      <div className="text-center category-card" onClick={onClick}>
        <div className={`p-6 bg-white rounded shadow-md overflow-hidden relative transform transition-transform duration-300 ease-in-out hover:scale-105 hover:rotate-x-10 hover:rotate-y-6 ${index===categorySelected?'border-2 border-green-500 font-bold text-gray-700 shadow-lg bg-green-300 scale-105' : ''}`}>
          <img
            src={image}
            alt={label}
            className="h-24 w-24 sm:h-32 sm:w-32 md:h-[150px] md:w-[150px] mx-auto mb-4"
          />
          <div className="mt-2 text-xl">{label}</div>
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
              alt="Phone"
              className="inline-block w-8 h-8 sm:w-10 sm:h-10 mr-2 transform hover:rotate-6 transition duration-300"
            />
            <span>Call now</span>
          </button>
        </div>
        <div className="absolute top-1/2 right-4 md:right-[50px] transform -translate-y-1/2 h-full flex items-center justify-center sm:z-0">
          <img
            src={headerImage}
            alt="Header"
            className="h-40 w-40 sm:h-[300px] sm:w-[300px] md:h-[500px] md:w-[500px] object-cover"
          />
        </div>
      </div>

      <div className="flex justify-center mt-10 px-4">
        <div className="flex flex-col p-0 m-0">
          <div className="text-center text-4xl py-8 font-bold text-gray-800">
            Select your category
          </div>
          <div className="grid py-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
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

      {/* <div className="text-center">
        <div className="inline-block mt-4 relative"> */}
          {/* <div className="absolute inset-0  rounded-lg"></div>{" "} */}
          {/* Black rectangle */}
          {/* <img
            src={video}
            alt="Sample Video"
            className="max-w-full h-auto relative"
            style={{ width: "5rem", height: "5rem" }} // Adjust width and height inline
          />
        </div>
      </div> */}
      

    <div className="container">
      <h1 className="text-4xl font-bold text-center py-6">What we offer?</h1>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{ el: '.swiper-pagination', clickable: true }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper_container"
      >
        <SwiperSlide>
          <img src={slider1} alt="Offer Slide 1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slider2} alt="Offer Slide 2" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slider3} alt="Offer Slide 3" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slider4} alt="Offer Slide 4" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slider5} alt="Offer Slide 5" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slider2} alt="Offer Slide 6" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slider4} alt="Offer Slide 7" />
        </SwiperSlide>
        <div className="slider-controler">
          <CircleArrowLeft className="swiper-button-prev slider-arrow" name="arrow-back-outline"/>
          <CircleArrowRight className="swiper-button-next slider-arrow" name="arrow-forward-outline"/>
          <div className="swiper-pagination"></div>
        </div>
      </Swiper>
    </div>

      <div className="px-4">
        <About />
      </div>
      {showPopup && (
        <CallPopup
          onClose={() => setShowPopup(false)}
          mediaRecorder={mediaRecorder}
          category={categorySelected}
        />
      )}

      <Footer />
    </div>
  );
}

export default MainPage;