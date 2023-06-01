import React, { useState, useContext } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Logo from '../../img/logo-no-bg.png';
import { AuthContext } from '../../context/authContext';

const Navbar = () => {
  // Mobile Compatible Hook
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  // Show user name
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className="flex justify-between items-center h-24 mx-auto px-4 text-white bg-gray-900  whitespace-nowrap">
      <Link to="/">
        <img className="h-16 w-26" src={Logo} alt="Eco Collectors" />
      </Link>
      <ul className={'hidden md:flex'}>
        <li className="p-4">
          <Link to="/">Home</Link>
        </li>
        <li className="p-4">
          <Link to="/contact-us">Contact Us</Link>
        </li>
        {!currentUser && (
          <li className="p-4">
            <Link to="/register">Register</Link>
          </li>
        )}
        {currentUser ? (
          <li className="p-4 cursor-pointer" onClick={logout}>
            Logout
          </li>
        ) : (
          <li className="p-4">
            <Link to="/login">Login</Link>
          </li>
        )}
        {currentUser && (
          <li className="p-4 text-orange-500">{currentUser.username}</li>
        )}
        <li>
          <Link
            to="/map"
            className="bg-indigo-600 w-12 h-12 rounded-full flex items-center justify-center font-bold hover:bg-orange-400 border-2 border-white-500 hover:border-white-600"
          >
            Map
          </Link>
        </li>
      </ul>

      <div onClick={handleNav} className="block md:hidden">
        {!nav ? <AiOutlineMenu size={20} /> : <AiOutlineClose size={20} />}
      </div>
      <div
        className={
          nav
            ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-gray-900 ease-in-out duration-500'
            : 'fixed left-[-100%]'
        }
      >
        <h1 className="w-full text-3xl font-bold m-4">
          <Link to="/">
            <img className="h-16 w-26" src={Logo} alt="Eco Collectors" />
          </Link>
        </h1>
        <ul className="uppercase p-4">
          <li className="p-4 border-b border-gray-600">
            <Link to="/">Home</Link>
          </li>
          <li className="p-4 border-b border-gray-600">
            <Link to="/contact-us">Contact Us</Link>
          </li>
          {!currentUser && (
            <li className="p-4 border-b border-gray-600">
              <Link to="/register">Register</Link>
            </li>
          )}
          {currentUser ? (
            <li
              className="p-4 border-b border-gray-600 cursor-pointer"
              onClick={logout}
            >
              Logout
            </li>
          ) : (
            <li className="p-4 border-b border-gray-600">
              <Link to="/login">Login</Link>
            </li>
          )}
          {currentUser && (
            <li className="p-4 border-b border-gray-600 text-orange-500">
              {currentUser.username}
            </li>
          )}

          <li className="p-4">
            {' '}
            <Link to="/map"> Map</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
