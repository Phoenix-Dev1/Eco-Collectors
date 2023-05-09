import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { useMemo } from 'react';
import classes from './map.module.css';

const Map = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });
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
          <Marker position={{ lat: 32.78697, lng: 35.005344 }} />
        </GoogleMap>
      )}
    </div>
  );
};

export default Map;
