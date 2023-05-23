import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { geocode } from 'react-geocode';
import classes from './map.module.css';

const Map = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  const [markers, setMarkers] = useState([]);

  const type = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/markers${type}`);
        const dataWithLocation = await Promise.all(
          res.data.map(async (marker) => {
            const { address, city } = marker;
            try {
              const response = await geocode.fromAddress(`${address}, ${city}`);
              const { lat, lng } = response.results[0].geometry.location;
              return { ...marker, lat, lng };
            } catch (error) {
              console.error('Error occurred during geocoding:', error);
              return marker;
            }
          })
        );
        setMarkers(dataWithLocation);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [type]);

  const center = { lat: 32.79413, lng: 34.98828 };

  return (
    <div className={classes.Map}>
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName={classes.mapContainer}
          center={center}
          zoom={12}
        >
          {markers.map(({ id, lat, lng }) => (
            <Marker key={id} position={{ lat, lng }} />
          ))}
        </GoogleMap>
      )}
    </div>
  );
};

export default Map;
