import React from 'react';

function ButtonPesquisar({ onClick }) {
  return (
    <button className="btn btn-primary" onClick={onClick}>
      Pesquisar
    </button>
  );
}

export default ButtonPesquisar;
