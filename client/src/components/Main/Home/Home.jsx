import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="home-container">
      <img 
        src="https://zx5f5b.n3cdn1.secureserver.net/wp-content/uploads/2019/08/logo-exe-300-01.png" 
        alt="logo-exe" 
        title="logo-exe" 
        className="home-logo"
      />
      <h2>¡Bienvenid@! </h2>
      <h3>Si quieres acceder a la web:</h3>
      <button 
        onClick={navigateToLogin} 
        className="home-button"
      >
        Inicia Sesión
      </button>
    </div>
  );
};

export default Home;
