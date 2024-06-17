import React from 'react';
import architectureDiagram from '../../../src/utils/images/model.png'; 
import Tk from '../../../src/utils/images/Tk.jpg';
import sujal from '../../../src/utils/images/sujal.png';
import anupam from '../../../src/utils/images/anupam.jpg';
import apoorv from '../../../src/utils/images/apoorv.jpg';
import aboutUs from '../../../src/utils/images/aboutUs.png';

export default function About() {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">About Us</h1>
        
        <div className="flex items-center justify-center">
        <img src={aboutUs} alt="About Us" style={{ width: '100%', maxHeight: '450px', objectFit: 'cover' }} />
      </div>
  
        <div className="mt-4 text-xl">
          <h2 className="text-2xl font-bold mb-4">Meet the Team</h2>
          <p>
            This application is created by Anupam Mittal, Sujal Singh, Tushar Khandelwal, and Apoorv Yash. We are currently in our 3rd year of pursuing a B.Tech degree in Information Technology at NIT Jalandhar.
          </p>
          <div className='mt-4' style={{ display: 'flex', justifyContent: 'space-around' }}>
            <div style={{ textAlign: 'center' }}>
              <img src={anupam} alt="Anupam Mittal" style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }} />
              <div style={{ marginTop: '8px' }}>Anupam Mittal</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <img src={sujal} alt="Sujal Singh" style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }} />
              <div style={{ marginTop: '8px' }}>Sujal Singh</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <img src={Tk} alt="Tushar Khandelwal" style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }} />
              <div style={{ marginTop: '8px' }}>Tushar Khandelwal</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <img src={apoorv} alt="Apoorv Yash" style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }} />
              <div style={{ marginTop: '8px' }}>Apoorv Yash</div>
            </div>
          </div>
        </div>
      </div>
    );
  }