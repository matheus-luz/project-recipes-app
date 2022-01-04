import React from 'react';
import CardsList from '../../components/CardsList';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

function Foods() {
  return (
    <div>
      <Header title="Comidas" isSearchEnabled />
      <CardsList />
      <Footer />
    </div>
  );
}

export default Foods;
