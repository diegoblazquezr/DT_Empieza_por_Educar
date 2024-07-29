import React, {useState} from "react";
import ListaEmpleados from "./ListaEmpleados";
import BuscadorEmpleados from "./BuscadorEmpleados";

const Empleados = () => {
  const [empleadoName, setEmpleadoName] = useState("");

  return <section className="listaEmpleados">
    <h2>Lista de empleados</h2>
    <BuscadorEmpleados setEmpleado={setEmpleadoName}/>
    <ListaEmpleados empleadoName={empleadoName}/>
    </section>;
};

export default Empleados;
