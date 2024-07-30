import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaPencil, FaX } from "react-icons/fa6";

const statusOptions = [
  "Registro",
  "Solicitud",
  "Entrevista1",
  "Entrevista2",
  "CentroEvaluación",
  "Ofertado",
  "Abandona",
  "Descartado"
];

const DetallesCandidatura = () => {
  const [detallesCandidatura, setDetallesCandidatura] = useState(null);
  const [editIndex, setEditIndex] = useState(-1);
  const [newNota, setNewNota] = useState('');
  const [editCompetencia, setEditCompetencia] = useState('');
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [editStatus, setEditStatus] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [editEmpleado, setEditEmpleado] = useState(false);
  const [newEmpleado, setNewEmpleado] = useState('');
  const { id_candidatura } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id_candidaturaFromQuery = searchParams.get('id_candidatura');
  const navigate = useNavigate();

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
        // console.log(json);
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

  const handleEditClick = (index, nota, nombre_competencia) => {
    setEditIndex(index);
    setNewNota(nota);
    setEditCompetencia(nombre_competencia);
  };

  const handleSubmitEditCompetencias = async (e, index) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.put(`${URL}/api/competencias`, {
        id_candidatura: candidaturaId,
        nombre_competencia: editCompetencia,
        nota: newNota,
      });

      setDetallesCandidatura(prevState => {
        const updatedState = [...prevState];
        updatedState[index] = {
          ...updatedState[index],
          nota: newNota
        };
        return updatedState;
      });
      setEditIndex(-1);
      setNewNota('');
      setEditCompetencia('');

    } catch (e) {
      console.error("Error updating competencia:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleBorrarCandidatura = async () => {
    setLoading(true);
    try {
      await axios.delete(`${URL}/api/candidaturas?id_candidatura=${candidaturaId}`);
      navigate('/candidaturas');
    } catch (e) {
      console.error("Error deleting candidatura:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleShowDialog = () => {
    setShowDialog(true);
  };

  const handleHideDialog = () => {
    setShowDialog(false);
  };

  const handleStatusEditClick = (currentStatus) => {
    setEditStatus(true);
    setNewStatus(currentStatus);
  };

  const handleEmpleadoEditClick = (currentEmpleado) => {
    setEditEmpleado(true);
    setNewEmpleado(currentEmpleado);
  };

  const handleSubmitEditStatus = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`${URL}/api/candidaturas`, {
        id_candidatura: candidaturaId,
        status: newStatus,
      });

      setDetallesCandidatura(prevState => {
        const updatedState = [...prevState];
        updatedState[0] = {
          ...updatedState[0],
          status: newStatus
        };
        return updatedState;
      });
      setEditStatus(false);

    } catch (e) {
      console.error("Error updating status:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitEditEmpleado = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`${URL}/api/candidaturas`, {
        id_candidatura: candidaturaId,
        id_empleado: newEmpleado,
      });

      setDetallesCandidatura(prevState => {
        const updatedState = [...prevState];
        updatedState[0] = {
          ...updatedState[0],
          id_empleado: newEmpleado
        };
        return updatedState;
      });
      setEditEmpleado(false);

    } catch (e) {
      console.error("Error updating empleado:", e);
    } finally {
      setLoading(false);
    }
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
            <li key={index}>
              {item.nombre_competencia}:
              {editIndex === index ? (
                <form onSubmit={(e) => { handleSubmitEditCompetencias(e, index), setEditIndex(-1) }}>
                  <input
                    type="text"
                    value={newNota}
                    onChange={(e) => setNewNota(e.target.value)}
                    required
                  />
                  <button type="submit" disabled={loading}>
                    {loading ? 'Saving...' : 'Guardar'}
                  </button>
                </form>
              ) : (
                <>
                  {item.nota}
                  <button onClick={() => handleEditClick(index, item.nota, item.nombre_competencia)}>Edit</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <span>ID Candidatura: {candidaturaId}</span><br />
        <span>ID Empleado: {editEmpleado ? (
          <form onSubmit={handleSubmitEditEmpleado}>
            <input
              type="number"
              value={newEmpleado}
              onChange={(e) => setNewEmpleado(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Guardar'}
            </button>
          </form>
        ) : (
          <>
            {id_empleado}
            <button onClick={() => handleEmpleadoEditClick(id_empleado)}>Editar</button>
          </>
        )}</span>
        <p>Status: {editStatus ? (
          <form onSubmit={handleSubmitEditStatus}>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              required
            >
              {statusOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Guardar'}
            </button>
          </form>
        ) : (
          <>
            {status}
            <button onClick={() => handleStatusEditClick(status)}>Editar</button>
          </>
        )}</p>
        <p>Fecha Registro: {fecha_registro_formatted}</p>
      </div>
      <div className="btnsContainer">
        <button className="candidaturaBtn" onClick={handleShowDialog}>Eliminar Candidatura<FaX /></button>
      </div>

      {showDialog && (
        <div className="confirmation-dialog">
          <p>¿Estás seguro de que deseas eliminar esta candidatura?</p>
          <button onClick={handleBorrarCandidatura} disabled={loading}>
            {loading ? 'Eliminando...' : 'Sí, eliminar'}
          </button>
          <button onClick={handleHideDialog}>Cancelar</button>
        </div>
      )}
    </article>
  );
};

export default DetallesCandidatura;




