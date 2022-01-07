import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const [emailFromLocalStorage, setEmailFromLocalStorage] = useState();

  useEffect(() => {
    const { email } = JSON.parse(localStorage.getItem('user'));
    console.log(email);
    setEmailFromLocalStorage(email);
  }, []);

  return (
    <div>
      <Header title="Perfil" />

      <p data-testid="profile-email">{ emailFromLocalStorage }</p>

      <button type="button" data-testid="profile-done-btn">Receitas Feitas</button>
      <button type="button" data-testid="profile-favorite-btn">Receitas Favoritas</button>
      <button type="button" data-testid="profile-logout-btn">Sair</button>
      <Footer />
    </div>
  );
}

export default Profile;
