import React, { useState } from "react";
import { FaPencil, FaX } from "react-icons/fa6";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';


const TarjetaCandidatos = ({ candidatos, onUpdate, onDelete }) => {

  const URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  const navigate = useNavigate();
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  /*const [editValues, setEditValues] = useState({
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
  });*/
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
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
    }
  });

  /*const handleEdit = (e) => {
    const { name, value } = e.target;
    setEditValues({
      ...editValues,
      [name]: value
    });
  };*/

  const onSubmit = async (data) => {
    //e.preventDefault();
    setLoading(true);
    try {
      //const response = await axios.put(`${URL}/api/candidatos`, editValues);
      const response = await axios.put(`${URL}/api/candidatos`, { ...data, id_candidato: candidatos.id_candidato });
      const updatedCandidato = { ...candidatos, ...data };
      onUpdate(updatedCandidato);
      setEditDialogVisible(false);
    } catch (error) {
      console.error("Error al actualizar el candidato:", error);
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
      const response = await axios.delete(`${URL}/api/candidatos?id_candidato=${candidatos.id_candidato}`);
      console.log(response.data);
      onDelete(candidatos.id_candidato);
    } catch (error) {
      console.error("Error al eliminar el candidato:", error);
    }
  };

  return (
    <article className="tarjetaCandidatos">
      {loading && <div className="loading">Loading...</div>}
      {editDialogVisible ? (
        <form onSubmit={handleSubmit(onSubmit)} className="editTaskForm">
          <div>
            <label htmlFor="nombre_candidato">Nombre</label>
            <input
              type="text"
              id="nombre_candidato"
              {...register('nombre_candidato', {
                required: 'Nombre es obligatorio', pattern: {
                  value: /^[A-Za-zÁÉÍÓÚáéíóúÀÈÌÒÙàèìòùÂÊÎÔÛâêîôûÄËÏÖÜäëïöüÿÇçÑñ\s'-]+$/i
                  , message: 'El nombre solo admite letras'
                }, minLength: { value: 2, message: 'El nombre debe tener más de 2 letras' }, maxLength: { value: 70, message: 'El nombre debe tener menos de 70 caracteres' }
              })}
            />
            {errors.nombre_candidato && <p>{errors.nombre_candidato.message}</p>}
          </div>
          <div>
            <label htmlFor="apellidos_candidato">Apellidos</label>
            <input
              type="text"
              id="apellidos_candidato"
              {...register('apellidos_candidato', {
                required: 'Apellidos son obligatorios', pattern: {
                  value: /^[A-Za-zÁÉÍÓÚáéíóúÀÈÌÒÙàèìòùÂÊÎÔÛâêîôûÄËÏÖÜäëïöüÿÇçÑñ\s'-]+$/i
                  , message: 'Apellidos solo admite letras'
                }, minLength: { value: 2, message: 'Apellidos/o debe tener más de 3 letras' }, maxLength: { value: 70, message: 'Apellidos/o debe tener menos de 70 caracteres' }
              })}
            />
            {errors.apellidos_candidato && <p>{errors.apellidos_candidato.message}</p>}
          </div>
          <div>
            <label htmlFor="email_candidato">Email</label>
            <input
              type="email"
              id="email_candidato"
              {...register('email_candidato', { required: 'Email es obligatorio', pattern: { value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i, message: 'El email introducido no tiene el formato necesario' }, minLength: { value: 6, message: 'El email debe tener más de 6 caracteres' }, maxLength: { value: 100, message: 'El email no puede tener más de 100 caracteres' } })}
            />
            {errors.email_candidato && <p>{errors.email_candidato.message}</p>}
          </div>
          <div>
            <label htmlFor="telefono_candidato">Teléfono</label>
            <input
              type="text"
              id="telefono_candidato"
              {...register('telefono_candidato', { required: 'El teléfono es obligatorio', pattern: { value: /^\+?\d{1,4}[-. ]?\d{1,4}[-. ]?\d{1,4}[-. ]?\d{1,9}$|^\+?\d{1,15}$/, message: 'El formato del teléfono no es válido' }, minLength: { value: 9, message: 'El teléfono debe tener, al menos, 9 caracteres' }, maxLength: { value: 20, message: 'El teléfono debe tener, máximo, 20 caracteres' } })}
            />
            {errors.telefono_candidato && <p>{errors.telefono_candidato.message}</p>}
          </div>
          <div>
            <label htmlFor="edad">Edad</label>
            <input
              type="number"
              id="edad"
              {...register('edad', { required: 'La edad es obligatoria', min: { value: 19, message: 'Debes ser mayor de 18 años' }, max: { value: 65, message: 'Debes tener menos de 65 años' } })} placeholder="Edad" />
            {errors.edad && <p>{errors.edad.message}</p>}
          </div>
          <div>
            <label htmlFor="carrera">Carrera</label>
            <select id="carrera"{...register('carrera', { required: 'Carrera es obligatoria' })}>
              <option value="">--Carrera--</option>
              <option value="Educación Infantil">Educación Infantil</option>
              <option value="Educación Primaria">Educación Primaria</option>
              <option value="Pedagogía">Pedagogía</option>
              <option value="Educación Social">Educación Social</option>
              <option value="Psicopedagogía">Psicopedagogía</option>
              <option value="Filología">Filología</option>
              <option value="Educación Física">Educación Física</option>
              <option value="Derecho">Derecho</option>
              <option value="Medicina">Medicina</option>
              <option value="Informática">Informática</option>
              <option value="Psicología">Psicología</option>
              <option value="Economía">Economía</option>
              <option value="ADE">ADE</option>
              <option value="Biología">Biología</option>
              <option value="Enfermería">Enfermería</option>
              <option value="Arquitectura">Arquitectura</option>
              <option value="Periodismo">Periodismo</option>
              <option value="Matemáticas">Matemáticas</option>
              <option value="Filosofía">Filosofía</option>
              <option value="Sociología">Sociología</option>
              <option value="Química">Química</option>
              <option value="Física">Física</option>
              <option value="Otra">Otra</option>
            </select>
            {errors.carrera && <p>{errors.carrera.message}</p>}
          </div>
          <div>
            <label htmlFor="nota_media">Nota Media</label>
            <input
              type="number"
              id="nota_media"
              step="0.1" min="0" max="10"{...register('nota_media', {
                required: 'La nota media es obligatoria', pattern: {
                  value: /^(10(\.0)?|[0-9](\.[0-9])?)$/, message: 'La nota media debe ser un número decimal entre 0 y 10'
                }
              })} placeholder="Nota media de la carrera" />
            {errors.nota_media && <p>{errors.nota_media.message}</p>}
          </div>
          <div>
            <label htmlFor="nivel_ingles">Nivel de Inglés</label>
            <select id="nivel_ingles"{...register('nivel_ingles', { required: 'El nivel de inglés es obligatorio' })}>
              <option value="">--Nivel de inglés--</option>
              <option value="A1">A1</option>
              <option value="A2">A2</option>
              <option value="B1">B1</option>
              <option value="B2">B2</option>
              <option value="C1">C1</option>
              <option value="C2">C2</option>
            </select>
            {errors.nivel_ingles && <p>{errors.nivel_ingles.message}</p>}
          </div>
          <div>
            <label htmlFor="sexo">Sexo</label>
            <select id="sexo"{...register('sexo', { required: 'Sexo es obligatorio' })}>
              <option value="">--Sexo--</option>
              <option value="Hombre">Hombre</option>
              <option value="Mujer">Mujer</option>
              <option value="No binario">No binario</option>
              <option value="Género fluido">Género fluido</option>
              <option value="Queer">Queer</option>
              <option value="Poligénero">Poligénero</option>
              <option value="Agénero">Agénero</option>
              <option value="Bigénero">Bigénero</option>
            </select>
            {errors.sexo && <p>{errors.sexo.message}</p>}
          </div>
          <div>
            <label htmlFor="cv">CV</label>
            <input type="text"
              id="cv"  {...register('cv', { required: 'CV es obligatorio' })}
            />
            {errors.cv && <p>{errors.cv.message}</p>}
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
