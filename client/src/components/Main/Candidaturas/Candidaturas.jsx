import React, { useState } from "react";
import BuscadorCandidaturas from "./BuscadorCandidaturas/BuscadorCandidaturas";
import ListaCandidaturas from "./ListaCandidaturas/ListaCandidaturas";

const Candidaturas = () => {
  const [nombreCandidatura, definirNombreCandidatura] = useState("");
  
  return (
  <>

  <section className="candidaturas">
  <BuscadorCandidaturas setCandidatura={definirNombreCandidatura}/>
  <ListaCandidaturas nombreCandidatura={nombreCandidatura}/>
  </section>

  </>
  )
}
export default Candidaturas;
