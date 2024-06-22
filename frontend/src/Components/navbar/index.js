import React, { Component } from 'react';
import logoImage from '../../utils/images/amazon.svg';
import { auth, db } from '../../utils/firebase';
import defaultUser from '../../utils/images/user.svg';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import {  FaGlobe } from 'react-icons/fa';

const languages = [
  'English', 'Hindi', 'Spanish', 'French', 'German',
  'Chinese', 'Japanese', 'Russian', 'Portuguese', 'Italian',
  'Korean', 'Arabic', 'Turkish', 'Dutch', 'Swedish', 'Polish'
];

class Navbar extends Component {
  state = {
    firstName: '',
    lastName: '',
    selectedLanguage: 'English',
    isOpen: false // State to handle the toggle of the menu
  };

  async componentDidMount() {
    const uid = localStorage.getItem('uid');

    if (uid) {
      const userRef = doc(db, 'Users', uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        this.setState({
          firstName: userData.firstName,
          lastName: userData.lastName,
          selectedLanguage: userData.language || 'English'
        });
        localStorage.setItem('language', userData.language);
      }
    }
  }

  handleLogout = () => {
    auth.signOut()
      .then(() => {
        localStorage.removeItem('uid');
        window.location.href = '/';
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };

  handleLanguageChange = async (event) => {
    const newLanguage = event.target.value;
    this.setState({ selectedLanguage: newLanguage });

    const uid = localStorage.getItem('uid');
    if (uid) {
      try {
        const userRef = doc(db, 'Users', uid);

        await updateDoc(userRef, {
          language: newLanguage
        });
        localStorage.setItem('language', newLanguage);
        console.log('Language updated successfully');
      } catch (error) {
        console.error('Error updating language:', error);
      }
    }
  };

  toggleMenu = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  };

  render() {
    const { firstName, lastName, selectedLanguage, isOpen } = this.state;

    return (
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-inherit px-4 py-2 flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center justify-start">
            <a href="/main" className="flex items-center">
              <img src={logoImage} className="h-12 sm:h-16 md:h-20 lg:h-24" alt="Amazon Logo" />
            </a>
          </div>

          {/* User Profile and Language Selection */}
          <div className="flex  space-x-4 sm:text-base md:text-xl font-lobster font-bold">
            <div className="flex items-center space-x-2">
              <img src={defaultUser} className="h-10 w-10 rounded-full" alt="User Profile" />
              <span className="text-gray-700 text-sm">
                {firstName && lastName ? `${firstName} ${lastName}` : 'Guest'}
              </span>
            </div>

            {/* Language Selection */}
            <div className="flex items-center space-x-2">
              <FaGlobe className="text-gray-700" />
              <select
                value={selectedLanguage}
                onChange={this.handleLanguageChange}
                className="border p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm hover:bg-gray-100 hover:border-gray-300"
                style={{ padding: '8px', margin: '0 10px', minWidth: '100px' }}
              >
                {languages.map((language) => (
                  <option key={language} value={language}>
                    {language}
                  </option>
                ))}
              </select>
            </div>

            {/* Logout Button */}
            <div className="ml-1">
              <button
                style={{ backgroundColor: 'rgb(255, 161, 22)' }}
                className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white font-bold px-2 sm:px-4 py-1 sm:py-2 rounded-md hover:bg-white hover:text-black hover:border-orange-500 border-2 border-transparent transition duration-300"
                onClick={this.handleLogout}
              >
                Logout
              </button>
            </div>
          </div>

          {/* Hamburger Menu Icon */}
          {/* <div className="flex lg:hidden ml-4">
            <button onClick={this.toggleMenu} className="text-gray-700 hover:text-black transition duration-300">
              <FaBars className="text-2xl" />
            </button>
          </div> */}

          {/* Navigation Buttons */}
          {/* <div className={`lg:flex ${isOpen ? 'block' : 'hidden'} flex-col lg:flex-row justify-end lg:space-x-10 flex-grow mt-4 lg:mt-0`}>
            <a href="/main" className="flex items-center text-gray-700 hover:text-black transition duration-300 underline">
              <FaHome className="mr-2 text-gray-500" />
              <span className="font-bold">Home</span>
            </a>
            <a target='blank' href="https://vcs-about-us.vercel.app/" className="flex items-center text-gray-700 hover:text-black transition duration-300">
              <FaInfoCircle className="mr-2 text-gray-500" />
              <span>About Us</span>
            </a>
            <a href="/privacy" className="flex items-center text-gray-700 hover:text-black transition duration-300">
              <FaLock className="mr-2 text-gray-500" />
              <span>Privacy Policy</span>
            </a>
          </div> */}
        </div>
      </nav>
    );
  }
}

export default Navbar;
