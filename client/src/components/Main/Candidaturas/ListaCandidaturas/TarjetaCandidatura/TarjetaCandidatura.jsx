import React from "react";
import { useNavigate, Link } from "react-router-dom";

const TarjetaCandidatura = ({ dataCandidatura }) => {
  const {
    id_candidatura,
    id_empleado,
    status,
    fecha_registro,
    id_candidato,
    nombre_candidato,
    apellidos_candidato,
    email_candidato,
    telefono_candidato,
  } = dataCandidatura;

  const fecha_registro_date = new Date(fecha_registro);

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const fecha_registro_formatted = formatDate(fecha_registro_date);

  // const navigate = useNavigate();

  // const handleButtonClick = () => {
  //   navigate(`/candidatura/id_candidatura=${id_candidatura}`);
  // };

  const candidaturaUrl = `/candidatura?id_candidatura=${encodeURIComponent(
    id_candidatura
  )}`;

  return (
<article className="tarjetaCandidatura">
  <div className="IDCandidatura">
    <span>Candidatura: {id_candidatura}</span>
    <br />
  </div>
  <div className="tablasDatos">
  <div className="datosEmpleado">
    <h3>ID Empleado:</h3>
    <p>{id_empleado}</p>
    <h3>Status:</h3>
    <p>{status}</p>
    <h3>Fecha Registro:</h3>
    <p>{fecha_registro_formatted}</p>
  </div>
  <div className="datosCandidato">
    <h3>ID Candidato:</h3>
    <p>{id_candidato}</p>
    <h3>Nombre:</h3>
    <p>{nombre_candidato}</p>
    <h3>Apellidos:</h3>
    <p>{apellidos_candidato}</p>
    <h3>Email:</h3>
    <p>{email_candidato}</p>
    <h3>Teléfono:</h3>
    <p>{telefono_candidato}</p>
  </div>
  </div>
  <div className="detallesCandidatura">
    <Link to={candidaturaUrl}>
      <button>Ver detalles</button>
    </Link>
  </div>
</article>

  );
};

export default TarjetaCandidatura;
