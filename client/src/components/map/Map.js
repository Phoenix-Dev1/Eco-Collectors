import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';
import { useMemo, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import classes from './map.module.css';

const Map = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  // Fetching Markers by type
  const [markers, setMarkers] = useState([]);

  const type = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/markers${type}`);
        setMarkers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [type]);

  const center = useMemo(() => ({ lat: 32.79413, lng: 34.98828 }), []);

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
            <MarkerF key={id} position={{ lat, lng }} />
          ))}
        </GoogleMap>
      )}
    </div>
  );
};

export default Map;
