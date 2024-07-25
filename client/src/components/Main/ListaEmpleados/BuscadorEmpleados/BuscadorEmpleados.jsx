import React, { useState } from "react";

const BuscadorEmpleados = ({ definirNombreCandidatura }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    definirNombreCandidatura(value);
    setValue("");
  };

  return (
    <article className="buscadorEmpleados">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          name="topic"
          placeholder="Busca un empleado..."
        />
        <button type="submit">Buscar</button>
      </form>
    </article>
  );
};
export default BuscadorEmpleados;
