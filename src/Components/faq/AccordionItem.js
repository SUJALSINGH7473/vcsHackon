import { useState } from 'react';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';

const AccordionItem = ({ faq }) => {
  const [isActive, setIsActive] = useState(false);
  const { question, answer } = faq;

  return (
    <div className="border-b-2 border-[#8abded] py-8 ">
      <div
        className="flex flex-row justify-between gap-x-4 cursor-pointer"
        onClick={() => setIsActive(!isActive)}
      >
        <div className={`text-${isActive ? '[#006D6C]' : '[#262626]'} font-bold lg:text-3xl md:text-2xl text-xl sm:text-lg`}>
          {question}
        </div>
        <div>
          {isActive ? <FiChevronDown size={22} /> : <FiChevronRight size={22} />}
        </div>
      </div>
      {isActive && (
        <div className="text-[#006D6C] pt-5 lg:text-2xl xl:text-3xl md:text-xl text-base">
          {answer}
        </div>
      )}
    </div>
  );
};

export default AccordionItem;
