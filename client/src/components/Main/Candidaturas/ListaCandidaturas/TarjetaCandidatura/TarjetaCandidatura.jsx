import React from "react";
import { useNavigate } from "react-router-dom";

const TarjetaCandidatura = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/vista-detalle');
  };

  return (
    <article className="tarjetaCandidatura">
      <h3>Nombre de la candidatura</h3>
      <p>Descripción de la candidatura</p>
      <button onClick={handleButtonClick}>Ver detalles</button>
    </article>
  );
};

export default TarjetaCandidatura;
