import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ChangePassword() {
  const [passwords, setPasswords] = useState({
    old_password: '',
    new_password: '',
    confirm_password: '',
  });

  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setPasswords((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { old_password, new_password, confirm_password } = passwords;

    // Check if new password and confirm password match
    if (new_password !== confirm_password) {
      setError('New password and confirm password do not match');
      return;
    }

    try {
      await axios.put('/user/change-password', {
        old_password,
        new_password,
      });
      navigate('/user');
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen dark:bg-gray-900 text-left">
      <div className="leading-loose bg-gray-50 dark:bg-gray-900 overflow-auto w-96">
        <form
          className="m-0 p-8 bg-gray-50 dark:bg-gray-800 rounded shadow-xl"
          onSubmit={handleSubmit}
        >
          <div className="mt-2">
            <label className="text-sm block text-white" htmlFor="old_password">
              Old Password
            </label>
            <input
              onChange={handleChange}
              className="w-full px-2 py-2 bg-gray-600 rounded border border-gray-300 text-white"
              id="old_password"
              name="old_password"
              type="password"
              aria-label="Old Password"
            />
          </div>
          <div className="mt-2">
            <label className="text-sm block text-white" htmlFor="new_password">
              New Password
            </label>
            <input
              onChange={handleChange}
              className="w-full px-2 py-2 bg-gray-600 rounded border border-gray-300 text-white"
              id="new_password"
              name="new_password"
              type="password"
              aria-label="New Password"
            />
          </div>
          <div className="mt-2">
            <label
              className="text-sm block text-white"
              htmlFor="confirm_password"
            >
              Confirm Password
            </label>
            <input
              onChange={handleChange}
              className="w-full px-2 py-2 bg-gray-600 rounded border border-gray-300 text-white"
              id="confirm_password"
              name="confirm_password"
              type="password"
              aria-label="Confirm Password"
            />
          </div>
          {err && (
            <p className="flex items-center justify-center text-sm text-red-700 font-semibold">
              {err}
            </p>
          )}
          <div className="flex justify-center">
            <button
              className="px-4 py-1 mt-3 text-white font-light tracking-wider bg-gray-900 rounded justify-center items-center hover:bg-black"
              type="submit"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
