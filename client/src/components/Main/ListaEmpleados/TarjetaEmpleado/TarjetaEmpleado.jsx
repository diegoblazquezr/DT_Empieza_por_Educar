import React from "react";

const TarjetaEmpleado = () => {
  return <article className="tarjetaEmpleado">
    <div className="tarjetaEmpleado__imagen"></div>
    <div className="tarjetaEmpleado__info">
      <h3 className="tarjetaEmpleado__nombre">Nombre Empleado</h3>
      <p className="tarjetaEmpleado__puesto">Puesto</p>
      <p className="tarjetaEmpleado__email">Email</p>
      <p className="tarjetaEmpleado__telefono">Teléfono</p>
    </div>
  </article>;
};

export default TarjetaEmpleado;
