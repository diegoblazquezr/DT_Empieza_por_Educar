import React from "react";

const TarjetaCandidatos = ({ candidatos }) => {
  return (
    <>
      <article className="tarjetaCandidatos">
        <div className="nombre">
          <h3>{candidatos.nombre_candidato} {candidatos.apellidos_candidato}</h3>
        </div>
        <div className="otros">
          <h3>Email:</h3>
          <p>{candidatos.email_candidato}</p>
          <h3>Teléfono:</h3>
          <p>{candidatos.telefono_candidato}</p>
          <h3>Edad:</h3>
          <p>{candidatos.edad}</p>
          <h3>Carrera:</h3>
          <p>{candidatos.carrera}</p>
          <h3>Nota Media:</h3>
          <p>{candidatos.nota_media}</p>
          <h3>Nivel de Inglés:</h3>
          <p>{candidatos.nivel_ingles}</p>
        </div>
      </article>
    </>
  );
};

export default TarjetaCandidatos;
