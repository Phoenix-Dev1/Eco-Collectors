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

// Fetching Requests from DB
export async function fetchRequests(type) {
  try {
    const res = await axios.get(`/requests${type}`);
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

export function addRequestValidation(
  fullName,
  bottlesNumber,
  address,
  phoneNumber,
  from_hour,
  to_hour
) {
  const fullNameRegex = /^[A-Za-z\s]+$/; // Regular expression to match letters and spaces
  const bottlesNumberRegex = /^\d+$/; // Regular expression to match digits

  if (!fullNameRegex.test(fullName)) {
    return false;
  }

  if (!bottlesNumberRegex.test(bottlesNumber)) {
    return false;
  }

  if (!/^\d{9,10}$/.test(phoneNumber)) {
    return false;
  }

  const fromHour = new Date(`2000-01-01T${from_hour}`);
  const toHour = new Date(`2000-01-01T${to_hour}`);

  if (fromHour >= toHour) {
    return false;
  }

  return true;
}
