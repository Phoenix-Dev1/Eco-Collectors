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
