import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RedirectButton from '../components/RedirectButton';

function Profile() {
  const [emailFromLocalStorage, setEmailFromLocalStorage] = useState();

  useEffect(() => {
    const { email } = JSON.parse(localStorage.getItem('user'));
    console.log(email);
    setEmailFromLocalStorage(email);
  }, []);

  function handleLogOut() {
    localStorage.removeItem('user');
    localStorage.removeItem('mealsToken');
    localStorage.removeItem('cocktailsToken');
    localStorage.removeItem('doneRecipes');
    localStorage.removeItem('favoriteRecipes');
    localStorage.removeItem('inProgressRecipes');
  }

  return (
    <div>
      <Header title="Perfil" />

      <p data-testid="profile-email">{ emailFromLocalStorage }</p>

      <RedirectButton
        path="receitas-feitas"
        testId="profile-done-btn"
        title="Receitas Feitas"
      />
      <RedirectButton
        path="receitas-favoritas"
        testId="profile-favorite-btn"
        title="Receitas Favoritas"
      />

      <RedirectButton
        path="/"
        testId="profile-logout-btn"
        title="Sair"
        func={ handleLogOut }
      />
      <Footer />
    </div>
  );
}

export default Profile;
