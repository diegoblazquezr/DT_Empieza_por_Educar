/*import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [password, setPassword] = useState('');

  // const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post('http://localhost:3000/api/usuarios', {
  //       nombre, apellidos, email, password, telefono, direccion
  //     });
  //     if (response.status === 201) {
  //       navigate('/login'); // Redirigir al login después de registrarse
  //     } else {
  //       alert('Error al registrar el usuario');
  //     }
  //   } catch (error) {
  //     console.error('Error al registrar el usuario:', error);
  //   }
  // };

  return (
    <section className="signup">
      <img 
        src="https://zx5f5b.n3cdn1.secureserver.net/wp-content/uploads/2019/08/logo-exe-300-01.png" 
        alt="logo-exe" 
        title="logo-exe" 
        className="home-logo"
      />
      <h2>¡Registra un empleado!</h2>
    <form 
    // onSubmit={handleSubmit}
    >
      <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" required />
      <input type="text" value={apellidos} onChange={(e) => setNombre(e.target.value)} placeholder="Apellidos" required />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" required />
      <button type="submit">Registrar</button>
    </form>
    </section>
  );
};

export default Signup;*/


import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { storage, ref, uploadBytes, getDownloadURL } from '../../../firebase';
import axios from 'axios';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';



const Form = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState(null);
  const URL = import.meta.env.VITE_API_URL;


  //Función que establece si el candidato cumple con los criterios mínimos de admisión
  //De ser así, lo guarda en la base de datos (incluida la URL de su currículum); si no, le envía un email de rechazo
  const checkSubmission = async (data) => {
    if (data.carrera === "Educación Primaria" && data.nota_media >= 7 && (data.nivel_ingles === "C1" || data.nivel_ingles === "C2")) {
      try {
        if (!file) {
          setConfirmationMessage('Por favor, selecciona un archivo PDF.');
          return;
        }

        const cvURL = await uploadFile(file);
        const payload = { ...data, cv: cvURL };
        const response = await axios.post(`${URL}/api/candidatos`, payload);
        console.log(response);
      } catch (error) {
        console.log(error)
        if (error.response && error.response.data.message) {
          setConfirmationMessage(`Error: ${error.response.data.message}`);
        } else {
          setConfirmationMessage('Error al registrar la candidatura. Inténtelo de nuevo.');
        }
      }

    } else if (data.carrera !== "Educación Primaria" && data.nota_media >= 6 && (data.nivel_ingles === "B2" || data.nivel_ingles === "C1" || data.nivel_ingles === "C2")) {
      try {
        if (!file) {
          setConfirmationMessage('Por favor, selecciona un archivo PDF.');
          return;
        }

        const filePath = await uploadFile(file);
        const payload = { ...data, cv: filePath };
        const response = await axios.post(`${URL}/api/candidatos`, payload);
        console.log(response);
      } catch (error) {
        console.log(error)
        if (error.response && error.response.data.message) {
          setConfirmationMessage(`Error: ${error.response.data.message}`);
        } else {
          setConfirmationMessage('Error al registrar la candidatura. Inténtelo de nuevo.');
        }
      }
    } else {
      handleRejection(data);
    }
  };

  //Funiciones para gestionar la carga del archivo PDF del CV
  //La primera recoge el archivo del formulario y la segunda lo sube a Firebase Storage
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        setError('Solo se permiten archivos PDF.');
        return;
      }
      if (selectedFile.size > 5 * 1024 * 1024) { // 5MB
        setError('El archivo debe ser menor de 5 MB.');
        return;
      }
      setFile(selectedFile);
    }
  };

  const uploadFile = async (file) => {
    if (!file) return null;

    const timestamp = new Date().getTime();
    console.log(timestamp)
    const uniqueFileName = `${timestamp}_${file.name}`;
    const fileRef = ref(storage, `curriculums/${uniqueFileName}`);

    try {
      await uploadBytes(fileRef, file);
      console.log('Archivo subido con éxito');
      const downloadURL = await getDownloadURL(fileRef);
      console.log(downloadURL)
      return downloadURL;
    } catch (error) {
      console.error('Error al subir el archivo:', error);
      throw error;
    }
  };

  //Función que gestiona qué ocurre cuando la solicitud no cumple con los requisitos mínimos
  const handleRejection = async (data) => {
    setTimeout(async () => {
      await sendRejectionEmail(data);
    }, 2000);
  };

  //86400000  - 24horas (sería la configuración definitiva para evitar que el candidato lo perciba como una respuesta automática)

  //Función que gestiona el envío del email de rechazo de la solicitud
  const sendRejectionEmail = async (data) => {
    const { nombre_candidato, email_candidato } = data;
    try {
      await axios.post(`${URL}/api/confirmacion-candidato`, { email_candidato, subject: 'Solicitud Programa Empieza por Educar', nombre_candidato });
      console.log('Correo de rechazo enviado');
    } catch (error) {
      console.error('Error al enviar el correo de rechazo:', error);
    }
  };

  //Función que gestiona el submit del formulario
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const edad = parseInt(data.edad, 10);
    const nota_media = parseFloat(data.nota_media);
    data.edad = edad;
    data.nota_media = nota_media;
    console.log(data);

    try {
      setTimeout(() => {
        checkSubmission(data);
        setConfirmationMessage('Candidatura registrada correctamente');
      }, 3000);

      setTimeout(() => {
        setIsSubmitting(false);
        setConfirmationMessage('');
        reset();
      }, 5000);

    } catch (error) {
      console.log(error)
      if (error.response && error.response.data.message) {
        setConfirmationMessage(`Error: ${error.response.data.message}`);
      } else {
        setConfirmationMessage('Error al registrar la candidatura');
      }
    }
  };

  return (
    <>
      <section className='register-candidato'>
        <h3>Registrar un nuev@ emplead@</h3>
        {confirmationMessage ? (confirmationMessage && (
          <div className="confirmation">
            {confirmationMessage === 'Empleado registrado correctamente' ? (
              <FaCheckCircle color="green" size={34} />
            ) : (
              <FaExclamationCircle color="red" size={34} />
            )}
            <p>{confirmationMessage}</p>
          </div>
        )) : (
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
              required: 'La contraseña es obligatoria', pattern: { value: /^\+?\d{1,4}[-. ]?\d{1,4}[-. ]?\d{1,4}[-. ]?\d{1,9}$|^\+?\d{1,15}$/, message: 'El formato de la contraseña no es válido' }, minLength: { value: 8, message: 'La contraseña debe tener, al menos, 8 caracteres' }, validate: {
                hasUppercase: value => /[A-Z]/.test(value) || 'La contraseña debe tener al menos una mayúscula',
                hasLowercase: value => /[a-z]/.test(value) || 'La contraseña debe tener al menos una minúscula',
                hasNumber: value => /[0-9]/.test(value) || 'La contraseña debe tener al menos un número',
                hasSymbol: value => /[!@#$%^&*(),.?":{}|<>]/.test(value) || 'La contraseña debe tener al menos un símbolo'
              }
            })} placeholder="Contraseña" />
            {errors.password && <p>{errors.password.message}</p>}

            <select {...register('rol', { required: 'Rol es obligatorio' })}>
              <option value="">--Rol--</option>
              <option value="admin">admin</option>
              <option value="Recruiter">Recruiter</option>
            </select>
            {errors.rol && <p>{errors.rol.message}</p>}

            <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Registrando...' : 'Registrar emplead@'}</button>
          </form>
        )}
      </section>
    </>
  );
};

export default Form;

