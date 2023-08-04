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
