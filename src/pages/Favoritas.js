import React from 'react';
import optionsObject from '../utils/optionsObject';
import Header from '../components/Header';

function Favoritas() {
  return (
    <div>
      <Header objectProps={ optionsObject.favorites } />
    </div>
  );
}

export default Favoritas;
