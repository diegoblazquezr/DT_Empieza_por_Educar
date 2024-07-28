import React, { useState } from "react";
import ListaCandidatos from "./ListaCandidatos";
import BuscadorCandidatos from "./BuscadorCandidatos";

const Candidatos = () => {
  const [candidatosName, setCandidatoName] = useState("");

  return (
    <section className="listaCandidatos">
      <h2>Lista de Candidatos</h2>
      <BuscadorCandidatos definirNombreCandidato={setCandidatoName} />
      <ListaCandidatos candidatosName={candidatosName} />
    </section>
  );
};

export default Candidatos;
