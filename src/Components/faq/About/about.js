// src/About/about.js
import React from 'react';
import AccordionItem from '../AccordionItem'; // Corrected path to AccordionItem
import data from '../../data/db.json'; // Corrected path to db.json

export default function About() {
  return (
    <div className="grid grid-cols-5 bg-white">
      {/* Left side */}
      <div className="p-8 col-span-1">
        <div className="capitalize font-bold lg:text-4xl md:text-3xl sm:text-xl text-black">
          Frequently asked questions
        </div>
      </div>

      {/* Right side */}
      <div className="p-8 col-span-4 lg-text-2xl md-text-xl sm-text-base">
        <div className="grid grid-cols-1 gap-4 text-black ">
          {data.faqs.map((faq, index) => (
            <AccordionItem key={index} faq={faq} />
          ))}
        </div>
      </div>
    </div>
  );
}
