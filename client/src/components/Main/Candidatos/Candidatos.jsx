import React, { useState } from "react";
import ListaCandidatos from "./ListaCandidatos";
import BuscadorCandidatos from "./BuscadorCandidatos";

const Candidatos = () => {
  const [candidatoEmail, setCandidatoEmail] = useState("");

  return (
    <section className="listaCandidatos">
      <h2>Candidatos</h2>
      <BuscadorCandidatos setCandidato={setCandidatoEmail} />
      {candidatoEmail ? (
        <ListaCandidatos candidatoEmail={candidatoEmail} />
      ) : (
        <h4>Busca un candidato</h4>
      )}
    </section>
  );
};

export default Candidatos;