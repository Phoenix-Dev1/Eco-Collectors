import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import smallLogo from '../../img/sm-logo.png';

function SignInForm() {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const [err, setError] = useState(null);

  const navigate = useNavigate();

  // For displaying the current user name on screen - localStorage
  const { login } = useContext(AuthContext);

  // User Credentials
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Submitting the register from authContext
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Calling the login function from AuthContext
      await login(inputs);
      navigate('/');
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img className="w-8 h-8 mr-2" src={smallLogo} alt="logo" />
          Eco Collectors
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Email
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  onChange={handleChange}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="/password-recovery"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <button
                onClick={handleSubmit}
                type="submit"
                className="text-sm font-medium leading-6 text-gray-900 rounded-lg shadow-md focus:outline-none w-full h-12 transition-colors duration-150 ease-in-out bg-white hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:hover:text-primary-500"
              >
                Sign In
              </button>
            </form>
            {err && (
              <p className="flex items-center justify-center  text-s text-red-700 font-semibold ">
                {err}
              </p>
            )}
            <hr className="my-6 border-gray-300 w-full" />
            <div className="flex flex-col space-y-4">
              <span className="flex flex-col sm:flex-row items-center sm:items-center">
                <span className="text-gray-500 dark:text-gray-400">
                  Don't have an account?
                </span>
                <a
                  href="/register"
                  className="ml-2 text-primary-600 hover:underline text-purple-600 dark:text-primary-500"
                >
                  Sign up
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignInForm;
