import React, { useState } from "react";
import BuscadorCandidaturas from "./BuscadorCandidaturas/BuscadorCandidaturas";
import ListaCandidaturas from "./ListaCandidaturas/ListaCandidaturas";

const Candidaturas = () => {
  const [nombreCandidatura, definirNombreCandidatura] = useState("");
  
  return (
  <>

  <section className="candidaturas">
    <h2>Candidaturas</h2>
  <BuscadorCandidaturas setRaza={definirNombreCandidatura}/>
  <ListaCandidaturas razaName={nombreCandidatura}/>
  </section>

  </>
  )
}
export default Candidaturas;
