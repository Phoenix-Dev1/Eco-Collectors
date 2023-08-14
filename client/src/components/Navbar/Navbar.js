import React, { useState, useContext } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Logo from '../../img/logo-no-bg.png';
import { AuthContext } from '../../context/authContext';

const Navbar = () => {
  // Mobile Compatible Hook
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  // Mobile
  const closeNav = () => {
    setNav(false);
  };

  // Show user name
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const loggedOut = await logout();
    if (loggedOut) {
      navigate('/'); // Redirect to the home page
    }
  };

  return (
    <div className="flex justify-between items-center h-24 mx-auto px-4 text-white bg-gray-900 whitespace-nowrap z-1000">
      <ul className="hidden md:flex items-center">
        {currentUser && (
          <>
            <li>
              <Link
                to="/map"
                className="bg-indigo-600 w-12 h-12 rounded-full flex items-center justify-center font-bold hover:bg-orange-400 border-2 border-white-500 hover:border-white-600"
              >
                Map
              </Link>
            </li>
            <li className="p-4 mr-4 text-orange-500 hover:text-green-600">
              <Link to="/user/welcome">{currentUser.first_name}</Link>
            </li>
          </>
        )}
        <div className="flex justify-between items-center h-24 mx-auto px-4 text-white bg-gray-900 whitespace-nowrap z-1000">
          <li className="p-4 hover:text-blue-600">
            <Link to="/">Home</Link>
          </li>
          {currentUser && (
            <>
              <li className="p-4 hover:text-blue-600">
                <Link to="/join">Recycler Registration</Link>
              </li>
              <li className="p-4 hover:text-blue-600">
                <Link to="/manager-join">Manager Registration</Link>
              </li>
              <li className="p-4 hover:text-blue-600">
                <Link to="/contact-us">Contact Us</Link>
              </li>
              <li
                className="p-4 cursor-pointer hover:text-red-500"
                onClick={handleLogout}
              >
                Logout
              </li>
            </>
          )}
        </div>
        {!currentUser && (
          <>
            <li className="p-4 hover:text-blue-600">
              <Link to="/register">Register</Link>
            </li>
            <li className="p-4 hover:text-blue-600">
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
      <Link to="/" className="ml-2">
        <img className="h-16 w-26" src={Logo} alt="Eco Collectors" />
      </Link>

      {/* Mobile menu icon */}
      <div onClick={handleNav} className="block md:hidden">
        {!nav ? <AiOutlineMenu size={20} /> : <AiOutlineClose size={20} />}
      </div>

      {/* Mobile menu */}
      <div
        className={
          nav
            ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-gray-900 ease-in-out duration-500 z-50'
            : 'fixed left-[-100%]'
        }
      >
        <h1 className="w-full text-3xl font-bold m-4">
          <Link to="/" onClick={closeNav}>
            <img className="h-16 w-26" src={Logo} alt="Eco Collectors" />
          </Link>
        </h1>
        <ul className="uppercase p-4">
          <li className="p-4 hover:text-blue-600">
            <Link to="/" onClick={closeNav}>
              Home
            </Link>
          </li>
          {currentUser && (
            <li className="p-4 border-b border-gray-600 text-orange-500 hover:text-green-600">
              <Link to="/user">{currentUser.first_name}</Link>
            </li>
          )}
          <li className="p-4 hover:text-purple-600">
            {' '}
            <Link to="/map" onClick={closeNav}>
              {' '}
              Map
            </Link>
          </li>
          {currentUser && (
            <>
              <li className="p-4 hover:text-blue-600">
                <Link to="/join">Recycler Registration</Link>
              </li>
              <li className="p-4 hover:text-blue-600">
                <Link to="/manager-join">Manager Registration</Link>
              </li>
              <li className="p-4 border-b border-gray-600 hover:text-blue-600">
                <Link to="/contact-us" onClick={closeNav}>
                  Contact Us
                </Link>
              </li>
              <li
                className="p-4 border-b border-gray-600 cursor-pointer hover:text-red-500"
                onClick={logout}
              >
                Logout
              </li>
            </>
          )}
          {!currentUser && (
            <>
              <li className="p-4 border-b border-gray-600 hover:text-blue-600">
                <Link to="/register" onClick={closeNav}>
                  Register
                </Link>
              </li>
              <li className="p-4 border-b border-gray-600 hover:text-blue-600">
                <Link to="/login" onClick={closeNav}>
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
