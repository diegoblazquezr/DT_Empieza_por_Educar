import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThreeCircles } from "react-loader-spinner";
import axios from "axios";

const BuscadorEmpleados = ({ setEmpleado }) => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseModelo, setResponseModelo] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmpleado(value);
  };

  const handleRegisterClick = () => {
    navigate("/signup");
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const responseModelo = await axios.post(`https://api-empleados-2nuf.onrender.com/retrain`);
      console.log(responseModelo.data.detail);
      setResponseModelo(responseModelo.data.detail);
      setTimeout(() => {
        setResponseModelo('');
      }, 5000); 
    } catch (error) {
      console.error('Error al enviar el correo de registro:', error);
      setLoading(false);
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <>
      <article className="buscadorEmpleados">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            name="topic"
            placeholder="Busca un empleado por email"
          />
          <button type="submit">Buscar</button>
        </form>
      {loading ? (
        <div className="spinner-empleados"><ThreeCircles
        visible={true}
        height="100"
        width="100"
        color="#11654d"
        ariaLabel="three-circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        /></div>
      ) : (<p>{responseModelo ? responseModelo : ''}</p>)}
      <div className="botonesEmpleado">
        <button onClick={handleRegisterClick}>Registrar nuevo empleado</button>
        <button onClick={handleClick} disabled={loading}>{loading ? 'Entrenando modelo...' : 'Aprendizaje modelo'}</button>
      </div>
      </article>
    </>
  );
};

export default BuscadorEmpleados;
