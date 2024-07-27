import React from "react";

const TarjetaCandidatos = ({ candidatos }) => {
  return (
    <>
      <article className="tarjetaCandidatos">
        <div className="nombre">
          <h3>Nombre:</h3>
          <p>{candidatos.nombre_candidato} {candidatos.apellidos_candidato}</p>
        </div>
        <div className="email">
          <h3>Email:</h3>
          <p>{candidatos.email_candidato}</p>
        </div>
        <div className="telefono">
          <h3>Teléfono:</h3>
          <p>{candidatos.telefono_candidato}</p>
        </div>
        <div className="edad">
          <h3>Edad:</h3>
          <p>{candidatos.edad}</p>
        </div>
        <div className="carrera">
          <h3>Carrera:</h3>
          <p>{candidatos.carrera}</p>
        </div>
        <div className="notaMedia">
          <h3>Nota Media:</h3>
          <p>{candidatos.nota_media}</p>
        </div>
        <div className="nivelIngles">
          <h3>Nivel de Inglés:</h3>
          <p>{candidatos.nivel_ingles}</p>
        </div>
      </article>
    </>
  );
};

export default TarjetaCandidatos;
