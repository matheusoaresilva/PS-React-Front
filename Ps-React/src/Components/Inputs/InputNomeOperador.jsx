import { useState } from 'react';
import React from 'react';

function InputNomeOperador() {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <label>Nome do Operador Transacionado:</label>
      <input
        type="text"
        className="form-control"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}

export default InputNomeOperador;
