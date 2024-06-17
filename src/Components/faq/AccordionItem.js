// src/AccordionItem.js
import React from 'react';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';

const AccordionItem = ({ faq, isActive, onToggle }) => {
  const { question, answer } = faq;

  return (
    <div className="border-b-2 border-[#8abded] py-3">
      <div
        className="flex flex-row justify-between gap-x-4 cursor-pointer"
        onClick={onToggle}
      >
        <div className={`font-bold lg:text-xl md:text-base sm:text-sm text-${isActive ? '[#006D6C]' : '[#262626]'}`}>
          {question}
        </div>
        <div>
          {isActive ? <FiChevronDown size={22} /> : <FiChevronRight size={22} />}
        </div>
      </div>
      {isActive && (
        <div className="text-[#006D6C] pt-5 lg:text-xl md:text-base sm:text-sm">
          {answer}
        </div>
      )}
    </div>
  );
};

export default AccordionItem;
