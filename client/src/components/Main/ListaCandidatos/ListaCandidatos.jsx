import React from "react";
import TarjetaCandidatos from "./TarjetaCandidatos";
import BuscadorCandidatos from "./BuscadorCandidatos";

const ListaCandidatos = () => {
  return <section className="listaCandidatos">
    <h2>Lista de Candidatos</h2>
    <BuscadorCandidatos />
    <TarjetaCandidatos />
    </section>;
};

export default ListaCandidatos;
