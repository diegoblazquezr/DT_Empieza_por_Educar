import React, { useState } from 'react';
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
      <h2>¡Registrate!</h2>
    <form 
    // onSubmit={handleSubmit}
    >
      <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" required />
      <input type="text" value={apellidos} onChange={(e) => setNombre(e.target.value)} placeholder="Apellidos" required />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" required />
      <button type="submit">Registrar</button>
    </form>
    <a href="/login">O inicia sesión...</a>
    </section>
  );
};

export default Signup;
