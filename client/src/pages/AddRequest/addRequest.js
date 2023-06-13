import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import * as moment from 'moment';

const AddRequest = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [bottlesNumber, setBottlesNumber] = useState('');
  const [reqLat, setReqLat] = useState('');
  const [reqLng, setReqLng] = useState('');
  const [reqAddress, setReqAddress] = useState('');
  const [fromTime, setfromTime] = useState('');
  const [toTime, setToTime] = useState('');

  const handleSubmit = async (e) => {
    const type = 'request';
    e.preventDefault();
    if (currentUser) {
      try {
        await axios.post(`/requests/add`, {
          bottlesNumber,
          reqLat,
          reqLng,
          reqAddress,
          reqDate: moment().format('YYYY-MM-DD HH:mm:ss'),
          fromTime,
          toTime,
          type,
        });
        navigate('/map');
      } catch (err) {
        console.log(err);
      }
    } else {
      // User is not logged in, so redirect to login page
      navigate('/login');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <form>
        <label htmlFor="number_of_bottles" className="block text-white">
          Bottles
        </label>
        <input
          onChange={(e) => setBottlesNumber(e.target.value)}
          className="rounded border border-black  text-center mb-3"
          placeholder="0"
          id="number_of_bottles"
          name="number_of_bottles"
          value={bottlesNumber}
          type="text"
        />
        <label htmlFor="lat" className="block text-white">
          Lat:
        </label>
        <input
          onChange={(e) => setReqLat(e.target.value)}
          className="rounded border border-black text-center mb-3"
          placeholder="0"
          id="lat"
          name="lat"
          value={reqLat}
          type="text"
        />
        <label htmlFor="lng" className="block text-white">
          Lng:
        </label>
        <input
          onChange={(e) => setReqLng(e.target.value)}
          className="rounded border border-black text-center mb-3"
          placeholder="0"
          id="lng"
          name="lng"
          value={reqLng}
          type="text"
        />
        <label htmlFor="req_address" className="block text-white">
          Address:
        </label>
        <input
          onChange={(e) => setReqAddress(e.target.value)}
          className="rounded border border-black text-center mb-3"
          placeholder="Street, number, city"
          id="req_address"
          name="req_address"
          value={reqAddress}
          type="text"
        />
        <div>
          <label htmlFor="from_hour" className="mr-2 text-white">
            From:
          </label>
          <input
            onChange={(e) => setfromTime(e.target.value)}
            id="from_hour"
            name="from_hour"
            type="time"
            value={fromTime}
            className="mr-2 rounded border border-black"
          />
          <label htmlFor="to_hour" className="mr-2 text-white">
            To:
          </label>
          <input
            onChange={(e) => setToTime(e.target.value)}
            id="to_hour"
            name="to_hour"
            type="time"
            value={toTime}
            className="rounded border border-black"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="text-white mt-5 bg-slate-500 py-2 px-4 inline-block rounded hover:bg-black"
        >
          Add Request
        </button>
      </form>
    </div>
  );
};

export default AddRequest;
