import axios from 'axios';

// Recyclers
export async function fetchAllRecyclers() {
  try {
    const res = await axios.get(`/manager/users`);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export const toggleRecyclerActivation = async (userID, newStatus) => {
  try {
    const res = await axios.put(`/manager/users/${userID}`, {
      active: newStatus,
    });
    return res.data;
  } catch (error) {
    console.error('Error toggling user activation:', error);
    throw error;
  }
};

// Recyclers Requests
export async function fetchRecyclerJoinRequests(statusFilter = null) {
  try {
    const response = await axios.get('/manager/join-requests', {
      params: { status: statusFilter }, // Pass the status filter to the API
    });
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function updateRecyclerJoinRequestStatus(
  joinID,
  newStatus,
  userID
) {
  try {
    const res = await axios.put(`/manager/join-requests/${joinID}`, {
      status: newStatus,
      userID: userID, // Pass user ID in the request body
    }); // Replace with the actual API endpoint for updating join request status
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// Recycle Requests
export async function fetchAllRecyclerRequests(statusFilter = null) {
  try {
    const response = await axios.get('/manager/all-requests', {
      params: { status: statusFilter }, // Pass the status filter to the API
    });
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function updateRequestStatus(requestId, newStatus) {
  try {
    const response = await axios.put(`/manager/requests/${requestId}`, {
      status: newStatus,
    });
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
