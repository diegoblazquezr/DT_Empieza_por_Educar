import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Nav from "./Nav/Nav";

const Header = () => {
  const { logged, setLogged, rol, setRol, id, setId } = useContext(AuthContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  // if (location.pathname === '/login' /*|| location.pathname === '/'*/) {
  //   return null; // No renderiza nada si estás en la página de inicio
  // }
  return logged === true ? (
    <header>
      <button className="hamburger-menu" onClick={toggleMenu}>
        ☰
      </button>
      <div className="imgLogo">
        <img
          src="https://zx5f5b.n3cdn1.secureserver.net/wp-content/uploads/2019/08/logo-exe-300-01.png"
          alt="logo-exe"
          title="logo-exe"
        ></img>
      </div>
      <div className="nav">
        <Nav menuOpen={menuOpen} />
      </div>
    </header>
  ) : null;
};

export default Header;
