import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../../context/AuthContext";


axios.defaults.withCredentials = true;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setLogged, setId, setRol } = useContext(AuthContext);
  const navigate = useNavigate();
  const URL = /*import.meta.env.VITE_API_URL ||*/ 'http://localhost:3000'; //OJO HABRÁ QUE DESCOMENTAR


  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(`${URL}/api/empleados/login`, {
        email: email,
        password: password
      });

      console.log(response.data);

      setLogged(true);
      setId(response.data.id);
      setRol(response.data.rol);

      navigate('/candidaturas');
 
    } catch (error) {
      setLoading(false);
      if (error.response) {
        setError(error.response.data.message || 'Error de inicio de sesión. Por favor, inténtelo de nuevo.');
      } else if (error.request) {
        setError('No hay respuesta del servidor. Por favor, inténtelo más tarde.');
      } else {
        setError('Ocurrió un error. Por favor, inténtelo de nuevo.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login">
      <img 
        src="https://zx5f5b.n3cdn1.secureserver.net/wp-content/uploads/2019/08/logo-exe-300-01.png" 
        alt="logo-exe" 
        title="logo-exe" 
        className="home-logo"
      />
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Iniciando sesión...' : 'Login'}
        </button>
      </form>
    </section>
  );
};

export default Login;
