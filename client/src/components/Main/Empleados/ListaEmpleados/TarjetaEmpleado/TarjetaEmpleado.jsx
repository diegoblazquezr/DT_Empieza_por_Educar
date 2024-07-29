import React from 'react';

const TarjetaEmpleado = ({ empleado }) => {
  if (!empleado) {
    return <p>Datos del empleado no disponibles.</p>;
  }
  return (
    <article className="tarjetaEmpleado">
      <div className="nombreEmpleado">
        <h3>{empleado.nombre_empleado} {empleado.apellidos_empleado}</h3>
        </div>
        <div className="datosEmpleado">
        <h3>Email:</h3>
        <p>{empleado.email_empleado}</p>
        <h3>Rol:</h3>
        <p>{empleado.rol}</p>
        <h3>Última Conexión:</h3>
        <p>{empleado.last_logged_date_formatted}</p>
        <h3>Número de Candidaturas:</h3>
        <p>{empleado.num_candidaturas}</p>
        <h3>Id:</h3>
        <p>{empleado.id_empleado}</p>
      </div>
    </article>
  );
};

export default TarjetaEmpleado;

