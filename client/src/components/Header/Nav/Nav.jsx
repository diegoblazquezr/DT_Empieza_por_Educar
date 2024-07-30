import React, { useContext } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from 'react-router-dom';

const Nav = ({ menuOpen }) => {
  const { logged, setLogged, rol, setRol, id, setId } = useContext(AuthContext);
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  const handleLogout = async () => {
    try {
      // console.log(Cookies.get('token'));
      await axios.post(`${URL}/api/empleados/logout`);
      setLogged(false);
      setRol('');
      setId('');
      navigate('/');
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };

  return (
    rol === 'admin' ? <nav className={menuOpen ? 'open' : ''}>
      <ul>
        <h3>Hola, Admin</h3>
        <li>
          <Link to="/candidaturas">Candidaturas</Link>
        </li>
        {/* <li>
          <Link to="/estadisticas-empleado">Estadisticas Empleado</Link>
        </li> */}
        <li>
          <Link to="/empleados">Empleados</Link>
        </li>
        <li>
          <Link to="/candidatos">Candidatos</Link>
        </li>
        <li>
          <Link to="/estadisticas-admin">Estadisticas Admin</Link>
        </li>
        <button onClick={handleLogout} className="logout">Logout</button>
      </ul>
    </nav> : 
    <nav className={menuOpen ? 'open' : ''}>
    <ul>
      <h3>Hola, Empleado</h3>
      <li>
        <Link to="/candidaturas">Candidaturas</Link>
      </li>
      {<li>
        <Link to="/estadisticas-empleado">Estadísticas Empleado</Link>
      </li>}
      <button onClick={handleLogout} className="logout">Logout</button>
    </ul>

  </nav>
  );
};

export default Nav;
