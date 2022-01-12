import React from 'react';
import { useHistory } from 'react-router-dom';
import optionsObject from '../utils/optionsObject';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Perfil() {
  const emailLogin = JSON.parse(localStorage.getItem('user'));

  const history = useHistory();

  const handleClickExit = () => {
    localStorage.clear();
    history.push('/');
  };

  const handleClickFavorites = () => {
    history.push('/receitas-favoritas');
  };

  const handleClickrecipesMade = () => {
    history.push('/receitas-feitas');
  };

  return (
    <section>
      <Header objectProps={ optionsObject.profile } />
      <section className="settingSectionPerfil">
        <h4 data-testid="profile-email" className="settingSectionPerfilTitle">
          {emailLogin !== null && emailLogin.email}
        </h4>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ handleClickrecipesMade }
          className="settingSectionPerfilButtons"
        >
          Receitas Feitas
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ handleClickFavorites }
          className="settingSectionPerfilButtons"
        >
          Receitas Favoritas
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ handleClickExit }
          className="settingSectionPerfilButtonExit"
        >
          Sair
        </button>
      </section>
      <Footer />
    </section>
  );
}

export default Perfil;
