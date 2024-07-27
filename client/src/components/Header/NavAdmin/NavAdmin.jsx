import { Link } from "react-router-dom";

const Nav = ({ menuOpen }) => {
  return (
    <nav className={menuOpen ? 'open' : ''}>
      <ul>
        <h3>Hola, Admin</h3>
        <li>
          <Link to="/candidaturas">Candidaturas</Link>
        </li>
        <li>
          <Link to="/estadisticas-empleado">Estadisticas Empleado</Link>
        </li>
        <li>
          <Link to="/lista-empleados">Empleados</Link>
        </li>
        <li>
          <Link to="/lista-candidatos">Candidatos</Link>
        </li>
        <li>
          <Link to="/estadisticas-admin">Estadisticas Admin</Link>
        </li>
        <button className="logout">Logout</button>
      </ul>

    </nav>
  );
};

export default Nav;