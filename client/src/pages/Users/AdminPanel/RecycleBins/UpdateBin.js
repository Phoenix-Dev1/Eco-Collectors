import React, { useState, useEffect } from 'react';
import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';
import axios from 'axios';

const UpdateBin = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  const [binData, setBinData] = useState({});
  const [updatedData, setUpdatedData] = useState({});
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/bins/${binData.id}`, updatedData);
      setBinData((prevData) => ({ ...prevData, ...updatedData }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const binId = window.location.href.split('/').pop();
        const response = await axios.get(`/admin/bins/${binId}`);
        setBinData(response.data);
        setCoordinates({ lat: response.data.lat, lng: response.data.lng });
        setUpdatedData(response.data); // Initialize updatedData with bin data
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <p className="text-lg font-semibold">Update Bin {binData.id}</p>
      <div style={{ height: '400px', width: '100%' }}>
        <GoogleMap
          mapContainerStyle={{ height: '100%', width: '100%' }}
          center={coordinates}
          zoom={15}
        >
          <MarkerF position={coordinates} />
        </GoogleMap>
      </div>
      <div className="mt-6 w-96">
        <h2 className="text-lg font-semibold mb-2">Edit Bin Data:</h2>
        <form onSubmit={handleUpdate} className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="address"
              className="block text-white text-sm font-bold mb-2"
            >
              Address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="address"
              type="text"
              name="address"
              value={updatedData.address || ''}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label
              htmlFor="city"
              className="block text-white text-sm font-bold mb-2"
            >
              City
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="city"
              name="city"
              value={updatedData.city || ''}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label
              htmlFor="lat"
              className="block text-white text-sm font-bold mb-2"
            >
              Latitude
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="lat"
              type="text"
              name="lat"
              value={updatedData.lat || ''}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label
              htmlFor="lng"
              className="block text-white text-sm font-bold mb-2"
            >
              Longitude
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="lng"
              name="lng"
              value={updatedData.lng || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2 text-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Update Bin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBin;
