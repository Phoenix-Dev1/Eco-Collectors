import React from 'react';

function SignInForm() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
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
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="email@company.com"
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
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2.5 mt-4 transition-all duration-150 ease-in-out"
              >
                Sign In
              </button>
            </form>
            <hr className="my-6 border-gray-300 w-full" />
            <div className="flex flex-col space-y-4">
              <span className="flex flex-col sm:flex-row items-center sm:items-center">
                <span className="text-gray-500 dark:text-gray-400">
                  Don't have an account?
                </span>
                <a
                  href="#"
                  className="ml-2 text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </a>
              </span>
              <a
                href="#"
                className="flex items-center justify-center space-x-2 text-sm font-medium leading-6 text-gray-900 rounded-lg shadow-md focus:outline-none w-full h-12 transition-colors duration-150 ease-in-out bg-white hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:hover:text-primary-500"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M21.35,3.93a10,10,0,0,0-3.89-3.93L16,0H8L6.53.93A10,10,0,0,0,2.65,6.21L2,8.1V16l.93,1.47a10,10,0,0,0,3.88,3.93L8,24h8l1.47-.93a10,10,0,0,0,3.89-3.93L22,16V8ZM12,18a6,6,0,1,1,6-6A6,6,0,0,1,12,18Zm0-10a4,4,0,1,0,4,4A4,4,0,0,0,12,8Z"></path>
                </svg>
                <span>Continue with Google</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignInForm;
