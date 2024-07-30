import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { FaPencil, FaX } from "react-icons/fa6";

const DetallesCandidatura = () => {
  const [detallesCandidatura, setDetallesCandidatura] = useState(null);
  const { id_candidatura } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id_candidaturaFromQuery = searchParams.get('id_candidatura');

  const candidaturaId = id_candidatura || id_candidaturaFromQuery;

  const URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  useEffect(() => {
    async function fetchData() {
      if (!candidaturaId) {
        console.error('No id_candidatura provided');
        return;
      }

      try {
        const res = await axios.get(`${URL}/api/candidaturas?id_candidatura=${candidaturaId}`);
        const json = res.data;
        console.log(json);
        setDetallesCandidatura(json);
      } catch (e) {
        console.error(e);
        setDetallesCandidatura(null);
      }
    }

    fetchData();
  }, [candidaturaId]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  if (!detallesCandidatura || detallesCandidatura.length === 0) {
    return <div>Loading...</div>;
  }

  const firstCandidatura = detallesCandidatura[0];

  if (!firstCandidatura) {
    return <div>No se encontraron datos para esta candidatura.</div>;
  }

  const {
    id_candidato,
    nombre_candidato,
    apellidos_candidato,
    email_candidato,
    telefono_candidato,
    edad,
    carrera,
    nivel_ingles,
    cv,
    id_empleado,
    status,
    fecha_registro,
  } = firstCandidatura;

  const fecha_registro_formatted = formatDate(fecha_registro);

  return (
    <article className="detallesCandidaura">
      <div>
        <span>ID Candidato: {id_candidato}</span>
        <p>Nombre: {nombre_candidato}</p>
        <p>Apellidos: {apellidos_candidato}</p>
        <p>Email: {email_candidato}</p>
        <span>Teléfono: {telefono_candidato}</span><br></br>
        <span>Edad: {edad}</span>
        <p>Carrera: {carrera}</p>
        <p>Nivel de Inglés: {nivel_ingles}</p>
      </div>
      <div>
        <p>Competencias:</p>
        <ul>
          {detallesCandidatura.map((item, index) => (
            <li key={index}>{item.nombre_competencia}: {item.nota}</li>
          ))}
        </ul>
      </div>
      <div>
        <span>ID Candidatura: {candidaturaId}</span><br />
        <span>ID Empleado: {id_empleado}</span>
        <p>Status: {status}</p>
        <p>Fecha Registro: {fecha_registro_formatted}</p>
      </div>
      <div className="btnsContainer">
        <button className="candidaturaBtn" /*onClick={showEditDialog}*/>Editar <FaPencil /></button>
        <button className="candidaturaBtn" /*onClick={showConfirmDialog}*/>Eliminar <FaX /></button>
      </div>
    </article>
  );
};

export default DetallesCandidatura;