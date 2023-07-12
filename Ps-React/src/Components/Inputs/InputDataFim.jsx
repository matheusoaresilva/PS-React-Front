import React, { useState } from 'react';

function InputDataFim({ value, onChange }) {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="mb-3">
      <label className="form-label">Data de Fim:</label>
      <input
        type="datetime-local"
        className="form-control"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}

export default InputDataFim;
