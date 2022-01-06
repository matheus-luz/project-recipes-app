import React from 'react';
import CardsList from '../../components/CardsList';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

function Foods() {
  const ola = 'ola';
  return (
    <div>
      <Header title="Comidas" isSearchEnabled />
      <CardsList ola={ ola } />
      <Footer />
    </div>
  );
}

export default Foods;
