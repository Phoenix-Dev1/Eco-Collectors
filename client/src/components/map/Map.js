import React, { useMemo, useState, useEffect, useRef, useContext } from 'react';
import {
  GoogleMap,
  MarkerF,
  InfoWindowF,
  useLoadScript,
  StandaloneSearchBox,
} from '@react-google-maps/api';
import axios from 'axios';
import * as moment from 'moment';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import classes from './map.module.css';
import {
  fetchMarkers,
  showAddress,
  openGoogleMaps,
  formatDate,
  fetchRequests,
  formatDateTime,
  formatTime,
} from './mapFunctions';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { VscFilter } from 'react-icons/vsc';
import { GiRecycle } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
import { validateInputs } from './InputValidation';

const libraries = [process.env.REACT_APP_GOOGLE_LIB];
const Map = () => {
  // Add request Reference
  const inputReference = useRef();
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const form = useRef();
  const initialName = currentUser
    ? currentUser.first_name + ' ' + currentUser.last_name
    : '';
  const [bottlesNumber, setBottlesNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [reqLat, setReqLat] = useState('');
  const [reqLng, setReqLng] = useState('');
  const [reqAddress, setReqAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fromTime, setFromTime] = useState('');
  const [toTime, setToTime] = useState('');

  // errors handling
  const [err, setError] = useState(null);
  // Add request Address GeoCoder Request
  const handlePlaceChanged = () => {
    const [place] = inputReference.current.getPlaces();
    if (place) {
      setReqAddress(place.formatted_address);
      setReqLat(place.geometry.location.lat());
      setReqLng(place.geometry.location.lng());
    }
  };

  // Request submit handling
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentUser) {
      const validation = validateInputs({
        fullName,
        reqLat,
        reqLng,
        reqAddress,
        phoneNumber,
        bottlesNumber,
        fromTime,
        toTime,
      });

      if (validation.isValid) {
        try {
          await axios.post(`/requests/add`, {
            fullName,
            reqLat,
            reqLng,
            reqAddress,
            phoneNumber,
            bottlesNumber,
            fromTime,
            toTime,
            reqDate: moment().format('YYYY-MM-DD HH:mm:ss'),
          });
          toggleAddWindow();
          navigate('/map');
          // Clear the form fields after successful submission
          setFullName('');
          setReqLat('');
          setReqLng('');
          setReqAddress('');
          setPhoneNumber('');
          setBottlesNumber('');
          setFromTime('');
          setToTime('');
          setError(null);
        } catch (err) {
          console.log(err);
        }
      } else {
        setError(validation.message);
      }
    } else {
      // User is not logged in, so redirect to login page
      navigate('/login');
    }
  };

  // Loading Google API Key and Libraries
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries: libraries,
  });

  // States for Markers and Requests
  const [markers, setMarkers] = useState([]);
  const [requests, setRequests] = useState([]);

  const [selectedMarker, setSelectedMarker] = useState(null);
  const [showFilterWindow, setShowFilterWindow] = useState(false); // track filter window visibility
  const [showAddWindow, setShowAddWindow] = useState(false); // track add window visibility

  // Fetching by DB row type
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

  // Center the Map At Haifa Port
  const center = useMemo(() => ({ lat: 32.79413, lng: 34.98828 }), []);

  const handleShowAddress = (address) => {
    showAddress(setSelectedMarker, address);
  };

  const handleOpenGoogleMaps = (lat, lng) => {
    openGoogleMaps(lat, lng);
  };

  const toggleFilterWindow = () => {
    setShowFilterWindow(!showFilterWindow);
    setShowAddWindow(false);
  };

  const toggleAddWindow = () => {
    setShowAddWindow(!showAddWindow);
    setShowFilterWindow(false);
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
      <div className={classes.add} onClick={toggleAddWindow}>
        <GiRecycle />
      </div>
      {showAddWindow && ( // Render the filter window only if showFilterWindow is true
        <div className={classes.addForm}>
          <form ref={form} onSubmit={handleSubmit} action="#">
            <div className="mb-4">
              <label htmlFor="full_name" className="block text-black">
                Full Name
              </label>
              <input
                name="full_name"
                id="full_name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder={
                  !currentUser ? 'Enter your full name' : initialName
                }
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="number_of_bottles" className="block text-black">
                Bottles
              </label>
              <input
                onChange={(e) => setBottlesNumber(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="0"
                id="number_of_bottles"
                name="number_of_bottles"
                value={bottlesNumber}
                type="text"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="req_address" className="block text-black">
                Address
              </label>
              <StandaloneSearchBox
                onLoad={(ref) => (inputReference.current = ref)}
                onPlacesChanged={handlePlaceChanged}
              >
                <input
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter Location"
                  inputref={inputReference}
                  onChange={(e) => setReqAddress(e.target.value)}
                  required
                />
              </StandaloneSearchBox>
            </div>
            <div className="mb-4">
              <label htmlFor="phoneNumber" className="block text-black">
                Phone number
              </label>
              <input
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your number"
                id="phoneNumber"
                name="phoneNumber"
                value={phoneNumber}
                type="tel"
                required
              />
            </div>
            <div className="flex mb-4">
              <div className="mr-4">
                <label htmlFor="from_hour" className="block text-black">
                  From
                </label>
                <input
                  onChange={(e) => setFromTime(e.target.value)}
                  id="from_hour"
                  name="from_hour"
                  type="time"
                  value={fromTime}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div>
                <label htmlFor="to_hour" className="block text-black">
                  To
                </label>
                <input
                  onChange={(e) => setToTime(e.target.value)}
                  id="to_hour"
                  name="to_hour"
                  type="time"
                  value={toTime}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
            </div>
            {err && (
              <p className="flex items-center justify-center text-sm text-red-700 font-semibold mb-2">
                {err}
              </p>
            )}
            <button className="text-white bg-slate-500 py-2 px-4 rounded hover:bg-black ml-11">
              Add Request
            </button>
          </form>

          <div className={classes.closeAddWindow} onClick={toggleAddWindow}>
            <AiOutlineClose />
          </div>
        </div>
      )}
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
              phone_number,
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
                      <h2 className="pt-2 text-left">
                        Bottles: {bottles_number}
                      </h2>
                      <h2 className="pt-2 text-left">
                        Hours: {from_hour} - {to_hour}
                      </h2>
                      <h2 className="pt-2 text-left">Phone: {phone_number}</h2>
                      <h2 className="pt-2 text-left">
                        Date: {formatDateTime(request_date)}
                      </h2>
                      <h2 className="pt-2 text-left">
                        Hour: {formatTime(request_date)}
                      </h2>
                      <h2 className="pt-2 text-left">Status: {status}</h2>
                      {(currentUser?.role === 1 || currentUser?.role === 3) &&
                        status !== 2 &&
                        currentUser && (
                          <h2 className="pt-2 text-center">
                            <Link
                              to={`/collect?Id=${request_id}`}
                              className="cursor-pointer hover:cursor-pointer hover:underline hover:text-blue-500 pt-2 text-right"
                            >
                              Collect
                            </Link>
                          </h2>
                        )}
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
