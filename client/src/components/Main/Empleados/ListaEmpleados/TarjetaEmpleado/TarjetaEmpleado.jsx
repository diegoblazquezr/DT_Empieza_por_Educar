import React, { useState } from "react";
import { FaPencil, FaX } from "react-icons/fa6";
import axios from 'axios';
import { useForm } from 'react-hook-form';


const TarjetaEmpleado = ({ empleado, onUpdate, onDelete }) => {
  if (!empleado) {
    return <p>Datos del empleado no disponibles.</p>;
  }

  const URL = import.meta.env.VITE_API_DATA || 'http://localhost:3000';
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      nombre_empleado: empleado.nombre_empleado,
      apellidos_empleado: empleado.apellidos_empleado,
      email_empleado: empleado.email_empleado,
      rol: empleado.rol,
      last_logged_date: empleado.last_logged_date,
      num_candidaturas: empleado.num_candidaturas,
    }
  });

  const onSubmit = async (data) => {
    //e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(`${URL}/update_empleado`, { ...data, id_empleado: empleado.id_empleado });
      const updatedEmpleado = { ...empleado, ...data };
      onUpdate(updatedEmpleado);
      setEditDialogVisible(false);
    } catch (error) {
      console.error("Error al actualizar el empleado:", error);
    } finally {
      setLoading(false);
    }
  };

  // const showEditDialog = (e) => {
  //   e.stopPropagation();
  //   setEditDialogVisible(true);
  // };

  const showEditDialog = (e) => {
    e.stopPropagation();
    reset({
      nombre_empleado: empleado.nombre_empleado,
      apellidos_empleado: empleado.apellidos_empleado,
      email_empleado: empleado.email_empleado,
      rol: empleado.rol,
      last_logged_date: empleado.last_logged_date,
      num_candidaturas: empleado.num_candidaturas,
    });
    setEditDialogVisible(true);
  };

  const hideEditDialog = (e) => {
    e.stopPropagation();
    setEditDialogVisible(false);
    reset();
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
    return (str.replace(/([T])/g, ' Hora: '));
  };

  return (
    <article className="tarjetaEmpleado">
      {loading && <div className="loading">Loading...</div>}
      {editDialogVisible ? (
        <form onSubmit={handleSubmit(onSubmit)} className="editarEmpleadoForm">
          <div className="inputContainer">
            <label htmlFor="nombre_empleado">Nombre</label>
            <input
              type="text"
              id="nombre_empleado"
              {...register('nombre_empleado', {
                required: 'Nombre es obligatorio', pattern: {
                  value: /^[A-Za-zÁÉÍÓÚáéíóúÀÈÌÒÙàèìòùÂÊÎÔÛâêîôûÄËÏÖÜäëïöüÿÇçÑñ\s'-]+$/i
                  , message: 'El nombre solo admite letras'
                }, minLength: { value: 2, message: 'El nombre debe tener más de 2 letras' }, maxLength: { value: 70, message: 'El nombre debe tener menos de 70 caracteres' }
              })}
            />
            {errors.nombre_empleado && <p>{errors.nombre_empleado.message}</p>}
          </div>
          <div className="inputContainer">
            <label htmlFor="apellidos_empleado">Apellidos</label>
            <input
              type="text"
              id="apellidos_empleado"
              {...register('apellidos_empleado', {
                required: 'Apellidos son obligatorios', pattern: {
                  value: /^[A-Za-zÁÉÍÓÚáéíóúÀÈÌÒÙàèìòùÂÊÎÔÛâêîôûÄËÏÖÜäëïöüÿÇçÑñ\s'-]+$/i
                  , message: 'Apellidos solo admite letras'
                }, minLength: { value: 2, message: 'Apellidos/o debe tener más de 3 letras' }, maxLength: { value: 70, message: 'Apellidos/o debe tener menos de 70 caracteres' }
              })}
            />
            {errors.apellidos_empleado && <p>{errors.apellidos_empleado.message}</p>}
          </div>
          <div className="inputContainer">
            <label htmlFor="email_empleado">Email</label>
            <input
              type="email"
              id="email_empleado"
              {...register('email_empleado', { required: 'Email es obligatorio', pattern: { value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i, message: 'El email introducido no tiene el formato necesario' }, minLength: { value: 6, message: 'El email debe tener más de 6 caracteres' }, maxLength: { value: 100, message: 'El email no puede tener más de 100 caracteres' } })}
            />
            {errors.email_empleado && <p>{errors.email_empleado.message}</p>}
          </div>
          <div className="inputContainer">
          <label htmlFor="rol">Rol</label>
            <select {...register('rol', { required: 'Rol es obligatorio' })}>
              <option value="">--Rol--</option>
              <option value="admin">Admin</option>
              <option value="reclutador">Reclutador</option>
            </select>
            {errors.rol && <p>{errors.rol.message}</p>}
          </div>
          <div className="inputContainer">
            <label htmlFor="last_logged_date">Última Conexión</label>
            <input
              type="text"
              id="last_logged_date"
              {...register('last_logged_date')}
              disabled
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="num_candidaturas">Número de Candidaturas</label>
            <input
              type="number"
              id="num_candidaturas"
              {...register('num_candidaturas')}
              disabled
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
            {/* <p>{formatLastLoggedDate(empleado.last_logged_date)}</p> */}
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
