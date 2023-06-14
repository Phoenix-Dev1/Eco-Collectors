import React, { useState, useContext, useEffect, useRef } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';
import PlaceInputBox from '../../components/map/PlaceInputBox';
import { useNavigate } from 'react-router-dom';
import * as moment from 'moment';

const AddRequest = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const form = useRef();
  const [bottlesNumber, setBottlesNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [reqLat, setReqLat] = useState('');
  const [reqLng, setReqLng] = useState('');
  const [reqAddress, setReqAddress] = useState('');
  const [fromTime, setfromTime] = useState('');
  const [toTime, setToTime] = useState('');
  const inputRef = useRef();

  /*
          <PlaceInputBox
          className="mb-2 w-full"
          inputRef={inputRef}
          setReqAddress={setReqAddress}
          setReqLat={setReqLat}
          setReqLng={setReqLng}
        />
        */

  useEffect(() => {
    if (currentUser) {
      form.current.full_name.value =
        currentUser.first_name + ' ' + currentUser.last_name;
    }
  }, [currentUser]);

  const handleSubmit = async (e) => {
    const type = 'request';
    e.preventDefault();
    if (currentUser) {
      try {
        await axios.post(`/requests/add`, {
          fullName,
          reqLat,
          reqLng,
          reqAddress,
          bottlesNumber,
          fromTime,
          toTime,
          reqDate: moment().format('YYYY-MM-DD HH:mm:ss'),
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
      <form ref={form} onSubmit={handleSubmit} action="#">
        <label htmlFor="full_name" className="block text-white">
          Full Name
        </label>
        <input
          onChange={(e) => setFullName(e.target.value)}
          className="rounded border border-black  text-center mb-3"
          placeholder="Full Name"
          id="full_name"
          name="full_name"
          value={fullName}
          type="text"
        />
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
        <label htmlFor="req_address" className="block text-white mb-2">
          Address:
        </label>
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
        <button className="text-white mt-5 bg-slate-500 py-2 px-4 inline-block rounded hover:bg-black">
          Add Request
        </button>
      </form>
    </div>
  );
};

export default AddRequest;
