import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as moment from 'moment';

const RecyclerRegister = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    join_date: moment().format('YYYY-MM-DD HH:mm:ss'),
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    message: '',
  });

  // User Credentials
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Submitting the register form
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/recyclers/recyclerRegister', inputs);
    navigate('/');
  };
  return (
    <div className="snap-y snap-mandatory h-fit w-fit">
      <div className="snap-start bg-amber-200 p-2 min-h-fit flex items-center justify-center text-8xl">
        <p className="w-8/12 text-center">
          {' '}
          Join Eco Collectors - who are we and who are we looking for?
        </p>
      </div>
      <div className="snap-start p-2 bg-teal-200 min-h-fit flex items-center justify-center text-2xl">
        Social media icons
      </div>
      <div className="snap-start p-3 bg-gray-800 min-h-fit flex items-center justify-center text-8xl">
        <form>
          <div className="grid md:grid-cols-2 md:gap-6 w-fit ">
            <div className="relative z-0 w-fit mb-6 group">
              <input
                onChange={handleChange}
                type="text"
                name="first_name"
                id="first_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="first_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                *First name
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                onChange={handleChange}
                type="text"
                name="last_name"
                id="last_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="last_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                *Last name
              </label>
            </div>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              onChange={handleChange}
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              *Email address
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              onChange={handleChange}
              type="tel"
              name="phone"
              id="phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="phone"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              *Phone
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group h-20">
            <textarea
              onChange={handleChange}
              type="text"
              name="message"
              id="message"
              className="block py-2.5 px-0 w-full text-sm  text-gray-900 bg-transparent border-0 border-gray-300 
              min-h-2 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="message"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 "
            >
              *Message
            </label>
          </div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="text-white bg-gray-700 hover:bg-gray-600 focus:ring-4 focus:outline-none mb-2 focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center "
          >
            Send a message
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecyclerRegister;
