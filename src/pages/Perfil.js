import React from 'react';
import { useHistory } from 'react-router-dom';
import optionsObject from '../utils/optionsObject';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Perfil() {
  const history = useHistory();

  const handleClick = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header objectProps={ optionsObject.profile } />
      <section className="settingSectionPerfil">
        <h4 data-testid="profile-email" className="settingSectionPerfilTitle">
          {JSON.parse(localStorage.getItem('user')).email}
        </h4>
        <button type="button" data-testid="profile-done-btn">
          Receitas Feitas
        </button>
        <button type="button" data-testid="profile-favorite-btn">
          Receitas Favoritas
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ handleClick }
          className="settingSectionPerfilButtonExit"
        >
          Sair
        </button>
      </section>
      <Footer />
    </div>
  );
}

export default Perfil;
