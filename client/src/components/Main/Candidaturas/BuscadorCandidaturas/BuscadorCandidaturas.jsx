import React, { useState } from "react";

const BuscadorCandidaturas = ({ definirNombreCandidatura }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    definirNombreCandidatura(value);
    setValue("");
  };

  return (
    <article className="buscadorCandidaturas">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          name="topic"
          placeholder="Busca un candidato..."
        />
        <button type="submit">Buscar</button>
      </form>
    </article>
  );
};
export default BuscadorCandidaturas;
