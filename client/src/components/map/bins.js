import axios from 'axios';

// Fetching Markers
export async function fetchMarkers(type) {
  try {
    const res = await axios.get(`/markers${type}`);
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
}
