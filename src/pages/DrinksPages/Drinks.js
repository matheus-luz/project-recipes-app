import React from 'react';
import CardsList from '../../components/CardsList';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

function Drinks() {
  return (
    <div>
      <Header title="Bebidas" isSearchEnabled />
      <CardsList />
      <Footer />
    </div>
  );
}

export default Drinks;
