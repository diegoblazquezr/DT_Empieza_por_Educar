import { Link } from "react-router-dom";

const Nav = ({ menuOpen }) => {
  return (
    <nav className={menuOpen ? 'open' : ''}>
      <ul>
        <h3>Hola, Admin</h3>
        <li>
          <Link to="/listaCandidaturas">Candidaturas</Link>
        </li>
        <li>
          <Link to="/estadisticas">Estadisticas</Link>
        </li>
        <button className="logout">Logout</button>
      </ul>

    </nav>
  );
};

export default Nav;