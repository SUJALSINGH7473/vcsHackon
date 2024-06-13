import React from 'react';
import { X, Phone, User, Bot, Play, StopCircle, RotateCw, Send } from 'lucide-react';

function CallPopup({ onClose }) {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
      <div className='relative bg-white w-[700px] rounded-lg shadow-lg p-6'>
        {/* Close Button */}
        <button onClick={onClose} className='absolute top-4 right-4 w-20 h-20 bg-red-500 text-white flex items-center justify-center rounded-full'>
          <Phone style={{ transform: 'rotate(135deg)' }} className='w-10 h-10' />
        </button>

        {/* Content */}
        <div className='flex flex-col'>
          {/* Header */}
          <div className='flex justify-center'>
            <h1 className='text-3xl font-bold'>Ask Your Queries</h1>
          </div>

          {/* Icons */}
          <div className='flex justify-center gap-6 mt-6'>
            {/* User Icon */}
            <div className='bg-black w-40 h-40 flex items-center justify-center rounded-full border-4 border-blue-500'>
              <User className='w-24 h-24 text-white' />
            </div>
            {/* Bot Icon */}
            <div className='bg-black w-40 h-40 flex items-center justify-center rounded-full border-4 border-blue-500'>
              <Bot className='w-24 h-24 text-white' />
            </div>
          </div>

          {/* Action Buttons */}
          <div className='flex justify-between bg-[#00BCD4] p-6 mt-6 rounded-lg'>
            <div className='flex flex-col items-center'>
              <Play className='w-8 h-8 text-black' />
              <span className='text-base font-medium mt-1'>Start</span>
            </div>
            <div className='flex flex-col items-center'>
              <StopCircle className='w-8 h-8 text-black' />
              <span className='text-base font-medium mt-1'>Stop</span>
            </div>
            <div className='flex flex-col items-center'>
              <RotateCw className='w-8 h-8 text-black' />
              <span className='text-base font-medium mt-1'>Restart</span>
            </div>
            <div className='flex flex-col items-center'>
              <Send className='w-8 h-8 text-black' />
              <span className='text-base font-medium mt-1'>Send</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CallPopup;
