import React from 'react';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Home = () => {
  return (
    <div className="font-sans bg-gray-800 dark:bg-gray-800 text-white">
      <main className="container mx-auto py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-semibold mb-12 text-center">
            Welcome to Eco Collectors! ♻️
          </h1>
          <p className="text-lg mb-12 text-center">
            Join us in making Israel cleaner! At Eco Collectors, we're on a
            mission to help you recycle right and find recycling facilities.
            Together, we can create a greener Israel for the future.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Bin Cards */}
            <div className="bg-blue-500 p-6 rounded-md shadow-md">
              <h2 className="text-xl font-semibold mb-2">Blue Bin</h2>
              <p className="text-gray-200">
                Newspapers, magazines, cardboard, paper packaging, and more.
              </p>
            </div>
            <div className="bg-orange-900 p-6 rounded-md shadow-md">
              <h2 className="text-xl font-semibold mb-2">Brown Bin</h2>
              <p className="text-gray-200">
                Fruits, vegetables, food scraps, and more.
              </p>
            </div>
            <div className="bg-orange-500 p-6 rounded-md shadow-md">
              <h2 className="text-xl font-semibold mb-2">Orange Bin</h2>
              <p className="text-gray-200">
                Plastic packaging, metal packaging, beverage cartons, and more.
              </p>
            </div>
            <div className="bg-purple-500 p-6 rounded-md shadow-md">
              <h2 className="text-xl font-semibold mb-2">Purple Bin</h2>
              <p className="text-gray-200">
                Glass bottles, jars, and glass packaging.
              </p>
            </div>
            <div className="bg-gray-500 p-6 rounded-md shadow-md">
              <h2 className="text-xl font-semibold mb-2">Gray Bin</h2>
              <p className="text-gray-200">
                Metallic waste. Recycled by melting and casting into new
                products.
              </p>
            </div>
            <div className="bg-yellow-500 p-6 rounded-md shadow-md">
              <h2 className="text-xl font-semibold mb-2">Cartoner</h2>
              <p className="text-gray-200">
                Thick cardboard packages. Flatten before disposal.
              </p>
            </div>
            <div className="bg-red-500 p-6 rounded-md shadow-md">
              <h2 className="text-xl font-semibold mb-2">E-Waste</h2>
              <p className="text-gray-200">
                Dispose old electrical appliances, batteries, and more at
                collection facilities.
              </p>
            </div>
            <div className="bg-green-700 p-6 rounded-md shadow-md">
              <h2 className="text-xl font-semibold mb-2">Green Bin</h2>
              <p className="text-gray-200">
                For waste that can't be sorted elsewhere. Some materials may be
                sorted and recycled.
              </p>
            </div>
          </div>
          <div className="flex justify-center mt-16">
            <a
              href="#top"
              className="w-12 h-12 bg-blue-700 flex items-center justify-center text-white text-lg rounded-full hover:bg-blue-900"
            >
              <FontAwesomeIcon icon={faAngleUp} />
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
