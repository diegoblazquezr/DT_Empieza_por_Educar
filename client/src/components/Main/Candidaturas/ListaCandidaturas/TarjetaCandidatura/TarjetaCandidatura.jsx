import React from "react";
import { useNavigate, Link } from "react-router-dom";

const TarjetaCandidatura = ({ dataCandidatura }) => {
  const { id_candidatura, id_empleado, status, fecha_registro, id_candidato, nombre_candidato, apellidos_candidato, email_candidato, telefono_candidato } = dataCandidatura;

  const fecha_registro_date = new Date(fecha_registro);

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const fecha_registro_formatted = formatDate(fecha_registro_date);

  // const navigate = useNavigate();

  // const handleButtonClick = () => {
  //   navigate(`/candidatura/id_candidatura=${id_candidatura}`);
  // };

  const candidaturaUrl = `/candidatura?id_candidatura=${encodeURIComponent(id_candidatura)}`;

  return (
    <article className="tarjetaCandidatura">
      <div>
        <span>ID Candidatura: {id_candidatura}</span><br/>
        <span>ID Empleado: {id_empleado}</span>
        <p>Status: {status}</p>
        <p>Fecha Registro: {fecha_registro_formatted}</p>
      </div>
      <div>
        <span>ID Candidato: {id_candidato}</span>
        <p>Nombre: {nombre_candidato}</p>
        <p>Apellidos: {apellidos_candidato}</p>
        <p>Email: {email_candidato}</p>
        <span>Teléfono: {telefono_candidato}</span>
      </div>
      <Link to={candidaturaUrl}>
        <button>Ver detalles</button>
      </Link>
    </article>
  );
};

export default TarjetaCandidatura;