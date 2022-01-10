import React, { useContext, useState } from 'react';
import optionsObject from '../utils/optionsObject';
import Header from '../components/Header';
import CardExplorerByArea from '../components/CardExplorerByArea';
import RecipesContext from '../context/RecipesContext';

function ExplorarComidaArea() {
  const { countryList } = useContext(RecipesContext);
  const [selectedCountry, setSelectedCountry] = useState('All');
  console.log('sele', selectedCountry);
  return (
    <>
      <Header objectProps={ optionsObject.exploreMealsByArea } />
      {console.log('Paises', countryList)}
      <select
        data-testid="explore-by-area-dropdown"
        onChange={ (e) => setSelectedCountry(e.target.value) }
        value={ selectedCountry }
      >
        {countryList.map((country) => (
          <option
            data-testid={ `${country.strArea}-option` }
            value={ country.strArea }
            key={ country.strArea }
          >
            { country.strArea }
          </option>
        ))}
      </select>
      <CardExplorerByArea
        country={ selectedCountry }
        objectProps={ optionsObject.exploreMealsByArea }
        object={ optionsObject.meal }
      />
    </>
  );
}

export default ExplorarComidaArea;
