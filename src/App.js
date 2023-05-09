import React from 'react';
import Header from './components/header/Header';
import Map from './components/map/Map';

import './App.css';

function App() {
  console.log('In App');
  return (
    <>
      <Header heading="Test 0.1.0 - Bar Kaziro" />
      <Map />
    </>
  );
}

export default App;
