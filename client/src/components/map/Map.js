import React, { useMemo, useState, useEffect } from 'react';
import {
  GoogleMap,
  MarkerF,
  InfoWindowF,
  useLoadScript,
} from '@react-google-maps/api';
import { useLocation } from 'react-router-dom';
import classes from './map.module.css';
import { fetchMarkers } from './bins';

const Map = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const type = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchMarkers(type);
      setMarkers(data);
    };
    fetchData();
  }, [type]);

  const center = useMemo(() => ({ lat: 32.79413, lng: 34.98828 }), []);

  const showAddress = (address) => {
    setSelectedMarker(address);
  };

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
          {markers.map(({ id, lat, lng, type, address, last_modified }) => {
            const markerClicked = selectedMarker === address;
            return (
              <MarkerF
                key={id}
                position={{ lat, lng }}
                icon={{
                  url: require(`../../img/icons/${type}.png`),
                }}
                onClick={() => showAddress(address)}
              >
                {markerClicked && (
                  <InfoWindowF
                    onCloseClick={() => setSelectedMarker(null)}
                    disableAutoClose={true}
                  >
                    <>
                      <h1>{address}</h1>
                    </>
                  </InfoWindowF>
                )}
              </MarkerF>
            );
          })}
        </GoogleMap>
      )}
    </div>
  );
};

export default Map;
