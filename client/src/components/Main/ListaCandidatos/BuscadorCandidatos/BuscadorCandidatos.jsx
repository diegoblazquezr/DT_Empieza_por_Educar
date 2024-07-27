import React, { useState } from "react";;

const BuscadorCandidatos = ({ definirNombreCandidato }) => {
  const [value, setValue] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    definirNombreCandidato(value);
    setValue("");
  };

  return (
    <>
      <article className="buscadorCandidatos">
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
    </>
  );
};

export default BuscadorCandidatos;
