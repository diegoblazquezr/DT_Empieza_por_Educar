import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ProgressBar } from 'react-loader-spinner';
import { AuthContext } from "../../../context/AuthContext";


axios.defaults.withCredentials = true;

const Login = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setLogged, setId, setRol } = useContext(AuthContext);
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';


  const onSubmit = async (data) => {
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(`${URL}/api/empleados/login`, data);

      console.log(response.data);

      setLogged(true);
      setId(response.data.id);
      setRol(response.data.rol);

      navigate('/candidaturas');

    } catch (error) {
      reset();
      setLoading(false);
      if (error.response) {
        setError(error.response.data.message || 'Error de inicio de sesión. Por favor, inténtelo de nuevo.');
      } else if (error.request) {
        setError('No hay respuesta del servidor. Por favor, inténtelo más tarde.');
      } else {
        setError('Ocurrió un error. Por favor, inténtelo de nuevo.');
      }
    } finally {
      reset();
      setLoading(false);
    }
  };

  return (
    <section className="login-section">
      <div className='logo-container-login'><img
        src="https://zx5f5b.n3cdn1.secureserver.net/wp-content/uploads/2019/08/logo-exe-300-01.png"
        alt="logo-exe"
        title="logo-exe"
        className="home-logo"
      /></div>
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          {...register('email', {
            required: 'El email es obligatorio',
            pattern: { 
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i, 
              message: 'El email introducido no tiene el formato necesario' 
            },
            minLength: {
              value: 6,
              message: 'El email debe tener al menos 6 caracteres'
            }, maxLength: {
              value: 100,
              message: 'El email debe tener menos de 100 caracteres'
            }
          })}
          placeholder="Email"
        />
        {errors.email && <p className="errors">{errors.email.message}</p>}

        <input
          type="password"
          {...register('password', {
            required: 'La contraseña es obligatoria',
            minLength: {
              value: 8,
              message: 'La contraseña debe tener al menos 8 caracteres'
            },
            validate: {
              hasUppercase: value => /[A-Z]/.test(value) || 'La contraseña debe tener al menos una mayúscula',
              hasLowercase: value => /[a-z]/.test(value) || 'La contraseña debe tener al menos una minúscula',
              hasNumber: value => /[0-9]/.test(value) || 'La contraseña debe tener al menos un número',
              hasSymbol: value => /[!@#$%^&*(),.?":{}|<>]/.test(value) || 'La contraseña debe tener al menos un símbolo'
            }
          })}
          placeholder="Password"
        />
        {errors.password && <p className="error">{errors.password.message}</p>}
        <button type="submit" disabled={loading}>{loading ? 'Iniciando sesión...' : 'Login'}</button>
      </form>
      {loading ? (
        <ProgressBar
          visible={true}
          height="100"
          width="100"
          color="#4fa94d"
          barColor='#FFCC00'
          borderColor='#11654d'
          ariaLabel="progress-bar-loading"
          wrapperStyle={{}}
          wrapperClass=""
          />
      ) : (<p></p>)}
    </section>
  );
};

export default Login;

/*  /<button type="submit" disabled={loading}>
          {loading ? 'Iniciando sesión...' : 'Login'}
        </button> */