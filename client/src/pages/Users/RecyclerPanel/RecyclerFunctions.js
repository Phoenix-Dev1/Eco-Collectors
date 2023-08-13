import axios from 'axios';

// Recycle Requests
export async function fetchAllRequests(statusFilter = null) {
  try {
    const response = await axios.get('/recycler/all-requests', {
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
    const response = await axios.put(`/recycler/requests/${requestId}`, {
      status: newStatus,
    });
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
