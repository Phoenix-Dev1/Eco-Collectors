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
  console.log(id);
  try {
    const res = await axios.get(`/dashboardRecycler/${id}`);
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

// set row color per status
export function getStatusColor(status) {
  switch (status) {
    case 1:
      return 'bg-yellow-300'; // awaits recycler
    case 2:
      return 'bg-orange-300'; // awaits pickup
    case 3:
      return 'bg-green-300'; // completed
    case 4:
      return 'bg-red-300'; // canceled
    default:
      return '';
  }
}

// Buttons rendering
export function renderButtons(status) {
  switch (status) {
    case 1:
      return (
        <>
          <button className="mb-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Update
          </button>
          <button className="mb-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Cancel
          </button>
        </>
      );
    case 2:
      return (
        <>
          <button className="mb-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Accept
          </button>
          <button className="mb-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Decline
          </button>
        </>
      );
    case 3:
      return (
        <>
          <p className="mb-2 text-black font-bold">Completed</p>
        </>
      );
    case 4:
      return (
        <>
          <p className="mb-2 text-black font-bold">Canceled</p>
        </>
      );
    default:
      return null;
  }
}
