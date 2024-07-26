import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BuscadorEmpleados = ({ definirNombreCandidatura }) => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    definirNombreCandidatura(value);
    setValue("");
  };

  const handleRegisterClick = () => {
    navigate("/signup");
  };

  return (
    <>
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
      <div className="botonesEmpleado">
        <button onClick={handleRegisterClick}>Registrar nuevo empleado</button>
        <button>Aprendizaje modelo</button>
      </div>
    </>
  );
};

export default BuscadorEmpleados;
