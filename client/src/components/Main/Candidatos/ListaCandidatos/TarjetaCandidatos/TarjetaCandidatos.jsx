import React, {useState} from "react";
import { FaPencil, FaX } from "react-icons/fa6";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TarjetaCandidatos = ({ candidatos, onUpdate, onDelete }) => {

  const URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  const navigate = useNavigate();
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editValues, setEditValues] = useState({
    nombre_candidato: candidatos.nombre_candidato,
    apellidos_candidato: candidatos.apellidos_candidato,
    email_candidato: candidatos.email_candidato,
    telefono_candidato: candidatos.telefono_candidato,
    edad: candidatos.edad,
    carrera: candidatos.carrera,
    nota_media: candidatos.nota_media,
    nivel_ingles: candidatos.nivel_ingles,
    sexo: candidatos.sexo,
    cv: candidatos.cv,
    id_candidato: candidatos.id_candidato
  });

  const handleEdit = (e) => {
    const { name, value } = e.target;
    setEditValues({
      ...editValues,
      [name]: value
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(`${URL}/api/candidatos`, editValues);
      const updatedCandidato = { ...candidatos, ...editValues };
      onUpdate(updatedCandidato);
      setEditDialogVisible(false);
    } catch (error) {
      console.error("Error updating candidato:", error);
    } finally {
      setLoading(false);
    }
  };

  const showEditDialog = (e) => {
    e.stopPropagation();
    setEditDialogVisible(true);
  };

  const hideEditDialog = (e) => {
    e.stopPropagation();
    setEditDialogVisible(false);
  };

  const showConfirmDialog = (e) => {
    e.stopPropagation();
    setConfirmDialogVisible(true);
  };

  const hideConfirmDialog = (e) => {
    e.stopPropagation();
    setConfirmDialogVisible(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await axios.delete(`${URL}/api/candidatos?id_candidato=${candidatos.id_candidato}`);
      console.log(response.data);
      onDelete(candidatos.id_candidato);
    } catch (error) {
      console.error("Error deleting candidato:", error);
    }
  };

  return (
    <article className="tarjetaCandidatos">
      {loading && <div className="loading">Loading...</div>}
      {editDialogVisible ? (
        <form onSubmit={handleEditSubmit} className="editTaskForm">
          <div>
            <label htmlFor="nombre_candidato">Nombre</label>
            <input
              type="text"
              name="nombre_candidato"
              value={editValues.nombre_candidato}
              onChange={handleEdit}
            />
          </div>
          <div>
            <label htmlFor="apellidos_candidato">Apellidos</label>
            <input
              type="text"
              name="apellidos_candidato"
              value={editValues.apellidos_candidato}
              onChange={handleEdit}
            />
          </div>
          <div>
            <label htmlFor="email_candidato">Email</label>
            <input
              type="email"
              name="email_candidato"
              value={editValues.email_candidato}
              onChange={handleEdit}
            />
          </div>
          <div>
            <label htmlFor="telefono_candidato">Teléfono</label>
            <input
              type="text"
              name="telefono_candidato"
              value={editValues.telefono_candidato}
              onChange={handleEdit}
            />
          </div>
          <div>
            <label htmlFor="edad">Edad</label>
            <input
              type="number"
              name="edad"
              value={editValues.edad}
              onChange={handleEdit}
            />
          </div>
          <div>
            <label htmlFor="carrera">Carrera</label>
            <input
              type="text"
              name="carrera"
              value={editValues.carrera}
              onChange={handleEdit}
            />
          </div>
          <div>
            <label htmlFor="nota_media">Nota Media</label>
            <input
              type="number"
              name="nota_media"
              value={editValues.nota_media}
              onChange={handleEdit}
            />
          </div>
          <div>
            <label htmlFor="nivel_ingles">Nivel de Inglés</label>
            <input
              type="text"
              name="nivel_ingles"
              value={editValues.nivel_ingles}
              onChange={handleEdit}
            />
          </div>
          <div>
            <label htmlFor="sexo">Sexo</label>
            <input
              type="text"
              name="sexo"
              value={editValues.sexo}
              onChange={handleEdit}
            />
          </div>
          <div>
            <label htmlFor="cv">CV</label>
            <input
              type="text"
              name="cv"
              value={editValues.cv}
              onChange={handleEdit}
            />
          </div>
          <button type="submit">Save</button>
          <button type='button' onClick={hideEditDialog}>Cancel</button>
        </form>
      ) : (
        <>
          <div className="nombre">
            <h3>{candidatos.nombre_candidato} {candidatos.apellidos_candidato}</h3>
          </div>
          <div className="otros">
            <h3>Email:</h3>
            <p>{candidatos.email_candidato}</p>
            <h3>Teléfono:</h3>
            <p>{candidatos.telefono_candidato}</p>
            <h3>Edad:</h3>
            <p>{candidatos.edad}</p>
            <h3>Carrera:</h3>
            <p>{candidatos.carrera}</p>
            <h3>Nota Media:</h3>
            <p>{candidatos.nota_media}</p>
            <h3>Nivel de Inglés:</h3>
            <p>{candidatos.nivel_ingles}</p>
            <h3>Sexo:</h3>
            <p>{candidatos.sexo}</p>
            <h3>CV:</h3>
            <a href={candidatos.cv} target="_blank">CV</a>
          </div>
          <div className="btnsContainer">
            <button className="candidatoBtn" onClick={showEditDialog}>Editar <FaPencil /></button>
            <button className="candidatoBtn" onClick={showConfirmDialog}>Eliminar <FaX /></button>
          </div>
        </>
      )}
      {confirmDialogVisible && (
        <div className="confirmDialog">
          <p>¿Estás seguro de que quieres eliminar este candidato?</p>
          <button onClick={handleDelete}>Sí</button>
          <button onClick={hideConfirmDialog}>No</button>
        </div>
      )}
    </article>
  );
};

export default TarjetaCandidatos;
