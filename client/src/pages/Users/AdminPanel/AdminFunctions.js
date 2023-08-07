import axios from 'axios';

export async function fetchAllUsers() {
  try {
    const res = await axios.get(`/admin/users`);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export const toggleUserActivation = async (userID, newStatus) => {
  try {
    const res = await axios.put(`/admin/users/${userID}`, {
      active: newStatus,
    });
    return res.data;
  } catch (error) {
    console.error('Error toggling user activation:', error);
    throw error;
  }
};

export async function fetchJoinRequests(statusFilter = null) {
  try {
    const response = await axios.get('/admin/join-requests', {
      params: { status: statusFilter }, // Pass the status filter to the API
    });
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function updateJoinRequestStatus(joinID, newStatus, userID) {
  try {
    const res = await axios.put(`/admin/join-requests/${joinID}`, {
      status: newStatus,
      userID: userID, // Pass user ID in the request body
    }); // Replace with the actual API endpoint for updating join request status
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
