import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../img/logo-no-bg.png';
import { AuthContext } from '../../context/authContext';

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <>
      <div className="flex justify-center bg-gray-900">
        <div className="w-full justify-between flex px-3 items-center">
          <div className="flex items-center">
            <Link to="/">
              <img className="h-16 w-26" src={Logo} alt="Eco Collectors" />
            </Link>
          </div>
          <div className="flex items-center text-gray-200 space-x-8 body-font font-poppins">
            <Link to="/">Home</Link>
            <Link to="/contact-us">Contact Us</Link>
            {currentUser ? (
              <span onClick={logout} className="cursor-pointer">
                Logout
              </span>
            ) : (
              <Link to="/login">Login</Link>
            )}{' '}
            <span className="text-orange-500">{currentUser?.username}</span>
            <Link
              to="/map"
              className="bg-indigo-600 w-12 h-12 rounded-full flex items-center justify-center font-bold hover:bg-orange-400 border-2 border-white-500 hover:border-white-600"
            >
              Map
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
