import GoogleMapsAPI from '@react-google-maps/api';
import GeocodingAPI from '@google-maps/geocoding';

const address = 'cccc';

function initialize() {
  const geocoder = new window.google.maps.Geocoder();

  geocoder.geocode(
    {
      address: address,
    },
    (results, status) => {
      if (status === window.google.maps.GeocoderStatus.OK) {
        console.log(results[0].geometry.location.lat());
        console.log(results[0].geometry.location.lng());
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    }
  );
}
