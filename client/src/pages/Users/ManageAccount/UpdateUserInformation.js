import React, { useEffect, useState, useContext, useRef } from 'react';
import { validateInfo } from './ValidateInfo';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/authContext';

export default function UpdateUserInformation() {
  const form = useRef();
  const { currentUser } = useContext(AuthContext);

  // Initialize the texts state with currentUser values directly
  const [texts, setTexts] = useState({
    first_name: currentUser?.first_name || '',
    last_name: currentUser?.last_name || '',
    email: currentUser?.email || '',
    city: currentUser?.city || '',
    address: currentUser?.address || '',
    phone: currentUser?.phone || '',
  });

  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    //console.log(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateInfo(texts, setError, navigate); // Use the validateForm function

    if (!isValid) {
      return;
    } else {
      try {
        await axios.put('/user/update', texts);
        navigate('/user');
      } catch (err) {
        setError(err.response.data);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen dark:bg-gray-900 text-left">
      <div className="leading-loose bg-gray-50 dark:bg-gray-900 overflow-auto w-96">
        <form
          ref={form}
          className="m-0 p-8 bg-gray-50 dark:bg-gray-800 rounded shadow-xl"
        >
          <div className="inline-block mt-2 w-1/2 pr-1">
            <label className="block text-sm text-white" htmlFor="first_name">
              First Name
            </label>
            <input
              onChange={handleChange}
              className="w-full px-2 py-2 bg-gray-600 rounded border border-gray-300 text-white"
              id="first_name"
              name="first_name"
              type="text"
              aria-label="First name"
              value={texts.first_name}
            />
          </div>
          <div className="inline-block mt-2 -mx-1 pl-1 w-1/2">
            <label className="block text-sm text-white" htmlFor="last_name">
              Last Name
            </label>
            <input
              onChange={handleChange}
              className="w-full px-2 py-2 bg-gray-600 rounded border border-gray-300 text-white"
              id="last_name"
              name="last_name"
              type="text"
              aria-label="Last Name"
              value={texts.last_name}
            />
          </div>
          <div className="mt-2">
            <label className="block text-sm text-white" htmlFor="email">
              Email
            </label>
            <input
              onChange={handleChange}
              className="w-full px-2 py-2 bg-gray-600 rounded border border-gray-300 text-white"
              id="email"
              name="email"
              type="email"
              aria-label="email"
              required
              value={texts.email}
            />
          </div>
          <div className="mt-2">
            <div className="inline-block mt-2 w-1/2 pr-1">
              <label className="block text-sm text-white" htmlFor="address">
                Address
              </label>
              <input
                onChange={handleChange}
                className="w-full px-2 py-2 bg-gray-600 rounded border border-gray-300 text-white"
                id="address"
                name="address"
                type="text"
                aria-label="Address"
                value={texts.address}
              />
            </div>
            <div className="inline-block mt-2 -mx-1 pl-1 w-1/2">
              <label className="block text-sm text-white" htmlFor="city">
                City
              </label>
              <input
                onChange={handleChange}
                className="w-full px-2 py-2 bg-gray-600 rounded border border-gray-300 text-white"
                id="city"
                name="city"
                type="text"
                aria-label="City"
                value={texts.city}
              />
            </div>
          </div>
          <div className="mt-2">
            <label className="text-sm block text-white" htmlFor="phone">
              Phone Number
            </label>
            <input
              onChange={handleChange}
              className="w-full px-2 py-2 bg-gray-600 rounded border border-gray-300 text-white"
              id="phone"
              name="phone"
              type="tel"
              aria-label="Phone Number"
              value={texts.phone}
            />
          </div>
          {err && (
            <p className="flex items-center justify-center text-sm text-red-700 font-semibold">
              {err}
            </p>
          )}
          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              className="px-4 py-1 mt-3 text-white font-light tracking-wider bg-gray-900 rounded justify-center items-center hover:bg-black"
              type="submit"
            >
              Update Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
