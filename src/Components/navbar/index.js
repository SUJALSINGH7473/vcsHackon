import React from 'react';
import logoImage from '../../utils/images/amazon.svg';
import { auth, db } from '../../utils/firebase';
import defaultUser from '../../utils/images/user.svg';
import { doc, getDoc } from 'firebase/firestore';
import { FaHome, FaInfoCircle, FaLock } from 'react-icons/fa';

class Navbar extends React.Component {
  state = {
    firstName: '',
    lastName: ''
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
          lastName: userData.lastName
        });
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

  render() {
    const { firstName, lastName } = this.state;

    return (
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-inherit px-4 py-2 flex items-center justify-between">
        {/* Logo Section */}
        <div className='flex items-center justify-start'>
          <a href="#" className="flex items-center">
            <img src={logoImage} className="sm:h-12 md:h-20" alt="Amazon Logo" />
          </a>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-end mr-14 space-x-16 text-lg flex-grow">
      <a href="/" className="flex items-center text-gray-700 hover:text-black transition duration-300">
        <FaHome className="mr-2 text-gray-500 hover:text-black transition duration-300" />
        <span className="hover:underline">Home</span>
      </a>
      <a href="/about" className="flex items-center text-gray-700 hover:text-black transition duration-300">
        <FaInfoCircle className="mr-2 text-gray-500 hover:text-black transition duration-300" />
        <span className="hover:underline">About Us</span>
      </a>
      <a href="/privacy" className="flex items-center text-gray-700 hover:text-black transition duration-300">
        <FaLock className="mr-2 text-gray-500 hover:text-black transition duration-300" />
        <span className="hover:underline">Privacy Policy</span>
      </a>
    </div>

        {/* User Profile and Logout Button */}
        <div className="flex items-center space-x-16 text-xl font-lobster font-bold">
          <div className="flex items-center space-x-2">
            <img src={defaultUser} className="h-10 w-10 rounded-full" alt="User Profile" />
            <span className="text-gray-700 text-sm">
                {firstName && lastName ? `${firstName} ${lastName}` : 'Guest'}
              </span>
          </div>
          <div className='flex items-center justify-end'>
          <button
            style={{ backgroundColor: 'rgb(255, 161, 22)' }}
            className="text-white font-bold px-4 py-1 rounded-md hover:bg-white hover:text-black hover:border-orange-500 border-2 border-transparent transition duration-300"
            onClick={this.handleLogout}
          >
            Logout
          </button>
          </div>
          
        </div>
      </div>
      </nav>
    );
  }
}

export default Navbar;
