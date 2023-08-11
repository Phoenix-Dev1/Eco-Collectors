import React, { useState, useEffect, useMemo } from 'react';
import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';
import {
  fetchRequestById,
  updateRequestById,
  formatDate,
  formatTime,
} from './RequestFunctions';
import { useNavigate } from 'react-router-dom';
import classes from './collection.module.css';

const CollectRequest2 = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });
  const center = useMemo(() => ({ lat: 32.79567, lng: 34.98472 }), []);

  const navigate = useNavigate();
  const [request, setRequest] = useState(null);

  const handleCancel = () => {
    navigate('/map');
  };

  const handleNotify = () => {
    const requestId = window.location.href.split('?')[1].split('=')[1];
    updateRequestById(requestId);
    navigate('/map');
  };

  useEffect(() => {
    const fetchData = async () => {
      const requestId = window.location.href.split('?')[1].split('=')[1];
      const data = await fetchRequestById(requestId);
      setRequest(data);
    };

    fetchData();
  }, []);

  // Date & Time Formatting
  if (!request) {
    return (
      <div className="h-screen">Authentication Failed/ Request not exists</div>
    );
  }
  return (
    <div className="flex flex-col min-h-screen">
      <main className="text-center">
        <div className={classes.app}>
          {!isLoaded ? (
            <h1>Loading...</h1>
          ) : (
            <GoogleMap
              mapContainerClassName={classes.map}
              center={center}
              zoom={12}
            >
              <MarkerF
                position={{ lat: request.req_lat, lng: request.req_lng }}
                icon={{
                  url: require(`../../img/icons/${request.type}.png`),
                }}
              />
            </GoogleMap>
          )}
        </div>
        <p className="mb-2">Request ID: {request.request_id}</p>
        <p className="mb-2">User ID: {request.user_id}</p>
        <p className="mb-2">Full Name: {request.full_name}</p>
        <p className="mb-2">Request Address: {request.req_address}</p>
        <p className="mb-2">Phone Number: {request.phone_number}</p>
        <p className="mb-2">Bottles Number: {request.bottles_number}</p>
        <p className="mb-2">From Hour: {request.from_hour}</p>
        <p className="mb-2">To Hour: {request.to_hour}</p>
        <p className="mb-2">Request Date: {formatDate(request.request_date)}</p>
        <p className="mb-2">Last Updated: {formatTime(request.request_date)}</p>
        <div className="space-x-4">
          <button
            className="bg-black text-white py-2 px-4 rounded"
            onClick={handleNotify}
          >
            Notify Collector
          </button>
          <button
            className="bg-black text-white py-2 px-4 rounded"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </main>
    </div>
  );
};

export default CollectRequest2;
