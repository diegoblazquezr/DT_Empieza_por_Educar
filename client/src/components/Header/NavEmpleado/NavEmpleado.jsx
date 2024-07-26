import { Link } from "react-router-dom";

const Nav = ({ menuOpen }) => {
  return (
    <nav className={menuOpen ? 'open' : ''}>
      <ul>
        <h3>Hola, Empleado</h3>
        <li>
          <Link to="/candidaturas">Candidaturas</Link>
        </li>
        <li>
          <Link to="/estadisticas-empleado">Estadisticas Empleado</Link>
        </li>
        <button className="logout">Logout</button>
      </ul>

    </nav>
  );
};

export default Nav;