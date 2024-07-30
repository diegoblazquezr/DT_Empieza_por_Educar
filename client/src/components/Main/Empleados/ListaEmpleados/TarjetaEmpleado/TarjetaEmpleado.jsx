import React, {useState} from "react";
import { FaPencil, FaX } from "react-icons/fa6";
import axios from 'axios';

const TarjetaEmpleado = ({ empleado, onUpdate, onDelete }) => {
  if (!empleado) {
    return <p>Datos del empleado no disponibles.</p>;
  }

  const URL = import.meta.env.VITE_API_DATA || 'http://localhost:3000';
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editValues, setEditValues] = useState({
    nombre_empleado: empleado.nombre_empleado,
    apellidos_empleado: empleado.apellidos_empleado,
    email_empleado: empleado.email_empleado,
    rol: empleado.rol,
    last_logged_date: empleado.last_logged_date,
    num_candidaturas: empleado.num_candidaturas,
    id_empleado: empleado.id_empleado
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
      const response = await axios.put(`${URL}/update_empleado`, editValues);
      const updatedEmpleado = { ...empleado, ...editValues };
      onUpdate(updatedEmpleado);
      setEditDialogVisible(false);
    } catch (error) {
      console.error("Error updating empleado:", error);
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
      await axios.delete(`${URL}/delete_empleado?id_empleado=${empleado.id_empleado}`);
      onDelete(empleado.id_empleado);
      setConfirmDialogVisible(false);
    } catch (error) {
      console.error("Error deleting empleado:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatLastLoggedDate = (str) => {
    return(str.replace(/([T])/g, ' Hora: '));
  };

  return (
    <article className="tarjetaEmpleado">
      {loading && <div className="loading">Loading...</div>}
      {editDialogVisible ? (
        <form onSubmit={handleEditSubmit} className="editarEmpleadoForm">
          <div className="inputContainer">
            <label htmlFor="nombre_empleado">Nombre</label>
            <input
              type="text"
              name="nombre_empleado"
              value={editValues.nombre_empleado}
              onChange={handleEdit}
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="apellidos_empleado">Apellidos</label>
            <input
              type="text"
              name="apellidos_empleado"
              value={editValues.apellidos_empleado}
              onChange={handleEdit}
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="email_empleado">Email</label>
            <input
              type="email"
              name="email_empleado"
              value={editValues.email_empleado}
              onChange={handleEdit}
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="rol">Rol</label>
            <input
              type="text"
              name="rol"
              value={editValues.rol}
              onChange={handleEdit}
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="last_logged_date">Última Conexión</label>
            <input
              type="text"
              name="last_logged_date"
              value={editValues.last_logged_date}
              onChange={handleEdit}
              disabled={true}
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="num_candidaturas">Número de Candidaturas</label>
            <input
              type="number"
              name="num_candidaturas"
              value={editValues.num_candidaturas}
              onChange={handleEdit}
              disabled={true}
            />
          </div>
          <div className="btnContainer">
          <button type="submit">Save</button>
          <button type='button' onClick={hideEditDialog}>Cancel</button>
          </div>
        </form>
      ) : (
        <>
          <div className="nombreEmpleado">
            <h3>{empleado.nombre_empleado} {empleado.apellidos_empleado}</h3>
          </div>
          <div className="datosEmpleado">
            <h3>Email:</h3>
            <p>{empleado.email_empleado}</p>
            <h3>Rol:</h3>
            <p>{empleado.rol}</p>
            <h3>Última Conexión:</h3>
            <p>{formatLastLoggedDate(empleado.last_logged_date)}</p>
            <h3>Número de Candidaturas:</h3>
            <p>{empleado.num_candidaturas}</p>
            <h3>Id:</h3>
            <p>{empleado.id_empleado}</p>
          </div>
          <div className="btnContainer">
            <button className="empleadoBtn" onClick={showEditDialog}>Editar <FaPencil /></button>
            <button className="empleadoBtn" onClick={showConfirmDialog}>Eliminar <FaX /></button>
          </div>
        </>
      )}
      {confirmDialogVisible && (
        <div className="confirmDialog">
          <p>¿Estás seguro de que quieres eliminar este empleado?</p>
          <div className="btnContainer">
          <button onClick={handleDelete}>Sí</button>
          <button onClick={hideConfirmDialog}>No</button>
          </div>
        </div>
      )}
    </article>
  );
};

export default TarjetaEmpleado;

