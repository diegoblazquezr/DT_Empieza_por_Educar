import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';



const Form = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const URL = import.meta.env.VITE_API_URL; //Cambia POR EL LOCALHOST:3000


  //Función que gestiona qué ocurre cuando la solicitud no cumple con los requisitos mínimos
  const handleSending = async (data) => {
    setTimeout(async () => {
      await sendEmailNewUser(data);
    }, 2000);
  };

  //Función que gestiona el envío del email de rechazo de la solicitud
  const sendEmailNewUser = async (data) => {
    const { nombre_empleado, email_empleado, password } = data;
    try {
      await axios.post(`http://localhost:3000/api/mailing/empleados`, { email_empleado, subject: 'TUS DATOS - Intranet Empieza por Educar', nombre_empleado, password });
      console.log('Correo de registro enviado al empleado');
    } catch (error) {
      console.error('Error al enviar el correo de registro:', error);
    }
  };

  //Función que gestiona el submit del formulario
  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${URL}/api/empleados`, data);
      console.log(response)
      setConfirmationMessage('Emplead@ registrad@ correctamente');

      setTimeout(() => {
        handleSending(data);
        setIsSubmitting(false);
        setConfirmationMessage('');
        reset();
      }, 4000);

    } catch (error) {
      console.log(error)
      if (error.response && error.response.data.message) {
        setConfirmationMessage(`Error: ${error.response.data.message}`);
      } else {
        setConfirmationMessage('Error al registrar el/la emplead@');
      }
    }
  };

  return (
    <>
      <section className='register-empleado'>
        {confirmationMessage ? (confirmationMessage && (
          <div className="confirmation">
            {confirmationMessage === 'Emplead@ registrad@ correctamente' ? (
              <FaCheckCircle color="green" size={34} />
            ) : (
              <FaExclamationCircle color="red" size={34} />
            )}
            <p>{confirmationMessage}</p>
          </div>
        )) : (
          <><h3>Registrar un nuev@ emplead@</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input type="text" {...register('nombre_empleado', {
                required: 'El nombre es obligatorio', pattern: {
                  value: /^[A-Za-zÁÉÍÓÚáéíóúÀÈÌÒÙàèìòùÂÊÎÔÛâêîôûÄËÏÖÜäëïöüÿÇçÑñ\s'-]+$/i
                  , message: 'El nombre solo admite letras'
                }, minLength: { value: 2, message: 'El nombre debe tener más de 2 letras' }, maxLength: { value: 70, message: 'El nombre debe tener menos de 70 caracteres' }
              })} placeholder="Nombre" />
              {errors.nombre_empleado && <p>{errors.nombre_empleado.message}</p>}

              <input type="text" {...register('apellidos_empleado', {
                required: 'El/los apellido/s son obligatorios', pattern: {
                  value: /^[A-Za-zÁÉÍÓÚáéíóúÀÈÌÒÙàèìòùÂÊÎÔÛâêîôûÄËÏÖÜäëïöüÿÇçÑñ\s'-]+$/i
                  , message: 'Apellidos solo admite letras'
                }, minLength: { value: 2, message: 'Apellidos/o debe tener más de 3 letras' }, maxLength: { value: 70, message: 'Apellidos/o debe tener menos de 70 caracteres' }
              })} placeholder="Apellido" />
              {errors.apellidos_empleado && <p>{errors.apellidos_empleado.message}</p>}

              <input type="email" {...register('email_empleado', { required: 'El email es obligatorio', pattern: { value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i, message: 'El email introducido no tiene el formato necesario' }, minLength: { value: 6, message: 'El email debe tener más de 6 caracteres' }, maxLength: { value: 100, message: 'El email no puede tener más de 100 caracteres' } })} placeholder="Email" />
              {errors.email_empleado && <p>{errors.email_empleado.message}</p>}

              <input type="text" {...register('password', {
                required: 'La contraseña es obligatoria', minLength: { value: 8, message: 'La contraseña debe tener, al menos, 8 caracteres' }, validate: {
                  hasUppercase: value => /[A-Z]/.test(value) || 'La contraseña debe tener al menos una mayúscula',
                  hasLowercase: value => /[a-z]/.test(value) || 'La contraseña debe tener al menos una minúscula',
                  hasNumber: value => /[0-9]/.test(value) || 'La contraseña debe tener al menos un número',
                  hasSymbol: value => /[!@#$%^&*(),.?":{}|<>]/.test(value) || 'La contraseña debe tener al menos un símbolo'
                }
              })} placeholder="Contraseña" />
              {errors.password && <p>{errors.password.message}</p>}

              <select {...register('rol', { required: 'Rol es obligatorio' })}>
                <option value="">--Rol--</option>
                <option value="admin">Admin</option>
                <option value="reclutador">Reclutador</option>
              </select>
              {errors.rol && <p>{errors.rol.message}</p>}

              <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Registrando...' : 'Registrar emplead@'}</button>
            </form>
          </>)}
      </section>
    </>
  );
};

export default Form;

