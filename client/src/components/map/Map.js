import React, { useMemo, useState, useEffect } from 'react';
import {
  GoogleMap,
  MarkerF,
  InfoWindowF,
  useLoadScript,
} from '@react-google-maps/api';
import { useLocation } from 'react-router-dom';
import classes from './map.module.css';
import {
  fetchMarkers,
  showAddress,
  openGoogleMaps,
  formatDate,
} from './mapFunctions';

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

  const handleShowAddress = (address) => {
    showAddress(setSelectedMarker, address);
  };

  const handleOpenGoogleMaps = (lat, lng) => {
    openGoogleMaps(lat, lng);
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
                onClick={() => handleShowAddress(address)}
              >
                {markerClicked && (
                  <InfoWindowF
                    onCloseClick={() => setSelectedMarker(null)}
                    disableAutoClose={true}
                  >
                    <div>
                      <h1 className="font-bold pt-2 text-right">{address}</h1>
                      <h2 className="pt-2 text-right">
                        {formatDate(last_modified)}
                      </h2>
                      <h2
                        className="cursor-pointer hover:cursor-pointer hover:underline hover:text-blue-500 pt-2 text-right"
                        onClick={() => handleOpenGoogleMaps(lat, lng)}
                      >
                        Navigate
                      </h2>
                    </div>
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
