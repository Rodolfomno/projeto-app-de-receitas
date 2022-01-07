import React from 'react';
import Header from '../components/Header';
import Cards from '../components/Cards';

function ExplorarArea() {
  return (
    <div>
      <Header objectProps={ optionsObject.exploreMealsByArea } />
      <Cards />
    </div>
  );
}

export default ExplorarArea;
