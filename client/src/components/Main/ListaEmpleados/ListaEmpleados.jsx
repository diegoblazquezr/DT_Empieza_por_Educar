import React from "react";
import TarjetaEmpleado from "./TarjetaEmpleado";
import BuscadorEmpleados from "./BuscadorEmpleados";

const ListaEmpleados = () => {
  return <section className="listaEmpleados">
    <h2>Lista de empleados</h2>
    <BuscadorEmpleados />
    <TarjetaEmpleado />
    </section>;
};

export default ListaEmpleados;
