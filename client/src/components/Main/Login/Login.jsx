import React from "react";

const Login = () => {
  return (
    <section className="login">
      <img 
        src="https://zx5f5b.n3cdn1.secureserver.net/wp-content/uploads/2019/08/logo-exe-300-01.png" 
        alt="logo-exe" 
        title="logo-exe" 
        className="home-logo"
      />
      <h2>Login</h2>
      <form /* onSubmit={handleSubmit} */ >
        <input
          type="email"
          // value={email}
          // onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          // value={password}
          // onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      <a href="/signup">Registrarse</a>
    </section>
  );
};

export default Login;
