import React from 'react';

import Header from './components/Header/Header';
import Map from './components/map/Map';
import Login from './pages/Login/login';

import './index.css';

function App() {
  console.log('In App');
  return (
    <>
      <Header heading="Test 0.1.0 - Bar Kaziro & Liran Barzilai" />
      <Login />
      <Map />
    </>
  );
}

export default App;
