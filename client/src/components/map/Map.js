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
  fetchRequests,
} from './mapFunctions';
import { Link } from 'react-router-dom';
import { VscFilter } from 'react-icons/vsc';
import { GiRecycle } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';

const Map = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  const [markers, setMarkers] = useState([]);
  const [requests, setRequests] = useState([]);

  const [selectedMarker, setSelectedMarker] = useState(null);
  const [showFilterWindow, setShowFilterWindow] = useState(false); // track filter window visibility

  const type = useLocation().search;

  // Bins
  useEffect(() => {
    const fetchMarkersData = async () => {
      const data = await fetchMarkers(type);
      setMarkers(data);
    };
    fetchMarkersData();
  }, [type]);

  // Requests
  useEffect(() => {
    const loadRequestsData = async () => {
      const data = await fetchRequests(type);
      setRequests(data);
    };
    loadRequestsData();
  }, [type]);

  const center = useMemo(() => ({ lat: 32.79413, lng: 34.98828 }), []);

  const handleShowAddress = (address) => {
    showAddress(setSelectedMarker, address);
  };

  const handleOpenGoogleMaps = (lat, lng) => {
    openGoogleMaps(lat, lng);
  };

  const toggleFilterWindow = () => {
    setShowFilterWindow(!showFilterWindow);
  };

  return (
    <div className={classes.Map}>
      <div className={classes.filters} onClick={toggleFilterWindow}>
        <VscFilter />
      </div>
      {showFilterWindow && ( // Render the filter window only if showFilterWindow is true
        <div className={classes.filterWindow}>
          <ul>
            <a href="/map">
              <li>All</li>
            </a>
            <a href="/map/?type=blue">
              <li>Blue bins</li>
            </a>
            <a href="/map/?type=carton">
              <li>Carton</li>
            </a>
            <a href="/map/?type=electronic-waste">
              <li>e-waste</li>
            </a>
            <a href="/map/?type=orange">
              <li>Orange bins</li>
            </a>
            <a href="/map/?type=purple">
              <li>Purple bins</li>
            </a>
            <a href="/map/?type=textile">
              <li>Textile</li>
            </a>
            <a href="/map/?type=request">
              <li>Requests</li>
            </a>
          </ul>
          <div
            className={classes.closeFilterWindow}
            onClick={toggleFilterWindow}
          >
            <AiOutlineClose />
          </div>
        </div>
      )}
      <div className={classes.add}>
        <Link to="/add">
          <GiRecycle />
        </Link>
      </div>
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
          {requests.map((request) => {
            const {
              request_id,
              req_lat,
              req_lng,
              req_address,
              bottles_number,
              from_hour,
              to_hour,
              request_date,
              status,
              type,
            } = request;

            const markerClicked = selectedMarker === req_address;

            return (
              <MarkerF
                key={request_id}
                position={{ lat: req_lat, lng: req_lng }}
                icon={{
                  url: require(`../../img/icons/${type}.png`),
                }}
                onClick={() => handleShowAddress(req_address)}
              >
                {markerClicked && (
                  <InfoWindowF
                    onCloseClick={() => setSelectedMarker(null)}
                    disableAutoClose={true}
                  >
                    <div>
                      <h1 className="font-bold pt-2 text-right">
                        {req_address}
                      </h1>
                      <h2 className="pt-2 text-right">
                        Bottles: {bottles_number}
                      </h2>
                      <h2 className="pt-2 text-right">
                        Hours: {from_hour} - {to_hour}
                      </h2>
                      <h2 className="pt-2 text-right">
                        Request Date: {request_date}
                      </h2>
                      <h2 className="pt-2 text-right">Status: {status}</h2>
                      <h2 className="pt-2 text-right">Type: {type}</h2>
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
