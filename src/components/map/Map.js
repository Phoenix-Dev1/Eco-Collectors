import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';
import { useMemo } from 'react';
import classes from './map.module.css';

const Map = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  const markers = [
    { id: 1, lat: 32.78697, lng: 35.00534 },
    { id: 2, lat: 32.78691, lng: 35.00534 },
    { id: 3, lat: 32.78611, lng: 35.00534 },
  ];

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
