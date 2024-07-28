import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import Candidaturas from "./Candidaturas/Candidaturas";
import EstadisticasEmpleado from "./EstadisticasEmpleado/EstadisticasEmpleado";
import DetallesCandidatura from "./DetallesCandidatura/DetallesCandidatura";
import ListaEmpleados from "./ListaEmpleados/ListaEmpleados";
import Estadisticas from "./Estadisticas/Estadisticas";
import Home from "./Home/Home";
import ProtectedRoutes from "../../utils/ProtectedRoutes/ProtectedRoutes";
import RolManager from "../../utils/RolManager/RolManager";
import { AuthContext } from "../../context/AuthContext";

const Main = () => {
  const { logged, setLogged, rol, setRol, id, setId } = useContext(AuthContext);

  console.log('MAIN', logged, rol);

  return (
    <main className="main">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/candidaturas" element={
          <ProtectedRoutes
            component={<RolManager
              component={<Candidaturas />}
              role={rol}
              allowedRoles={["Recruiter", "recruiter", "admin"]}
            />}
            logged={logged}
          />
        } />

        <Route path="/estadisticas-empleado" element={
          <ProtectedRoutes
            component={<RolManager
              component={<EstadisticasEmpleado />}
              role={rol}
              allowedRoles={["admin"]}
            />}
            logged={logged}
          />
        } />

        <Route path="/vista-detalle" element={
          <ProtectedRoutes
            component={<RolManager
              component={<DetallesCandidatura />}
              role={rol}
              allowedRoles={["recruiter", "admin"]}
            />}
            logged={logged}
          />
        } />

        <Route path="/lista-empleados" element={
          <ProtectedRoutes
            component={<RolManager
              component={<ListaEmpleados />}
              role={rol}
              allowedRoles={["admin"]}
            />}
            logged={logged}
          />
        } />

        <Route path="/estadisticas-admin" element={
          <ProtectedRoutes
            component={<RolManager
              component={<Estadisticas />}
              role={rol}
              allowedRoles={["admin"]}
            />}
            logged={logged}
          />
        } />

        <Route path="/*" element={<Home />} />
      </Routes>
    </main>
  );
}

export default Main;
