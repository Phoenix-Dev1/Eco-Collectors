import React, { useRef } from 'react';
import { StandaloneSearchBox, LoadScript } from '@react-google-maps/api';

const libraries = [process.env.REACT_APP_GOOGLE_LIB];
const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

const PlaceInputBox = () => {
  const inputRef = useRef();

  const handlePlaceChanged = () => {
    const [place] = inputRef.current.getPlaces();
    if (place) {
      console.log(place.formatted_address);
      console.log(place.geometry.location.lat());
      console.log(place.geometry.location.lng());
    }
  };

  return (
    <LoadScript googleMapsApiKey={apiKey} libraries={libraries}>
      <StandaloneSearchBox
        onLoad={(ref) => (inputRef.current = ref)}
        onPlacesChanged={handlePlaceChanged}
      >
        <input
          type="text"
          className="form-control"
          placeholder="Enter Location"
        />
      </StandaloneSearchBox>
    </LoadScript>
  );
};

export default PlaceInputBox;
