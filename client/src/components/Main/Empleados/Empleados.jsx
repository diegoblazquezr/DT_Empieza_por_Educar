import React, { useState } from "react";
import ListaEmpleados from "./ListaEmpleados";
import BuscadorEmpleados from "./BuscadorEmpleados";

const Empleados = () => {
  const [empleadoEmail, setEmpleadoEmail] = useState("");

  return (
    <section className="listaEmpleados">
      <h2>Empleados</h2>
      <BuscadorEmpleados setEmpleado={setEmpleadoEmail} />
      {empleadoEmail ? <ListaEmpleados empleadoEmail={empleadoEmail} /> : <h4>Busca un empleado</h4>}
    </section>
  );
};

export default Empleados;
