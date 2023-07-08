import axios from 'axios';

// Fetch all user Requests
export async function fetchUserRequests(id) {
  //console.log(id);
  try {
    const res = await axios.get(`/dashboardUser/${id}`);
    //console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

// Fetch Recycler info based on request id
export async function fetchRecyclerDetails(id) {
  //console.log(id);
  try {
    const res = await axios.get(`/dashboardRecycler/${id}`);
    //console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}
