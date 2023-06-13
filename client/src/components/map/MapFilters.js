import React from 'react';

const MapFilters = () => {
  return (
    <ul>
      <a href="/map/?type=blue">
        {' '}
        <li> Blue bins</li>
      </a>
      <li>Carton</li>
      <li>e-waste</li>
      <li>Orange bins</li>
      <li>Purple bins</li>
      <li>Textile</li>
    </ul>
  );
};

export default MapFilters;
