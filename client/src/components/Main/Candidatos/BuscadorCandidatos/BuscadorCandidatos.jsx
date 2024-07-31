import React, { useState } from "react";

const BuscadorCandidatos = ({ setCandidato }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setCandidato(value);
  };

  return (
    <article className="buscadorCandidatos">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          name="topic"
          placeholder="Busca un candidato por email"
        />
        <button type="submit">Buscar</button>
      </form>
    </article>
  );
};

export default BuscadorCandidatos;