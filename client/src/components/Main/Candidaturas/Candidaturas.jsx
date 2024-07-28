import React, { useState } from "react";
// import BuscadorCandidaturas from "./BuscadorCandidaturas/BuscadorCandidaturas";
import ListaCandidaturas from "./ListaCandidaturas/ListaCandidaturas";

const Candidaturas = () => {

  const [candidaturas, setCandidaturas] = useState([]);

  return (
    <>
      <section className="candidaturas">
        {/* <BuscadorCandidaturas setCandidatura={definirNombreCandidatura} /> */}
        <ListaCandidaturas candidaturas={candidaturas} setCandidaturas={setCandidaturas}/>
      </section>

    </>
  )
}
export default Candidaturas;
