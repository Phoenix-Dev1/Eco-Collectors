import axios from 'axios';

// Fetching Markers from DB
export async function fetchMarkers(type) {
  try {
    const res = await axios.get(`/markers${type}`);
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
}

// Show a single Marker Address
export function showAddress(setSelectedMarker, address) {
  setSelectedMarker(address);
}

// Navigation through Google Maps(Moblie)
export function openGoogleMaps(lat, lng) {
  const url = `https://www.google.com/maps/dir/?api=1&origin=current+location&destination=${lat},${lng}`;
  window.open(url, 'noopener noreferrer');
}

// format the date to DD/MM/YYYY from SQL Date format
export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB');
}
