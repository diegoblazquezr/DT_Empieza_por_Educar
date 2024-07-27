import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../Main/Login/Login";
import Signup from "../Main/Signup/Signup";
import Candidaturas from "../Main/Candidaturas/Candidaturas";
import EstadisticasEmpleado from "../Main/EstadisticasEmpleado/EstadisticasEmpleado";
import DetallesCandidatura from "../Main/DetallesCandidatura/DetallesCandidatura";
import ListaEmpleados from "../Main/ListaEmpleados/ListaEmpleados";
import Estadisticas from "../Main/Estadisticas/Estadisticas";
import Home from "../Main/Home/Home";
import ListaCandidatos from "../Main/ListaCandidatos/ListaCandidatos"


const Main = () => {
  return (
    <main className="main">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/candidaturas" element={<Candidaturas />} />
        <Route path="/candidatura" element={<DetallesCandidatura />} />
        <Route path="/estadisticas-empleado" element={<EstadisticasEmpleado />} />
        <Route path="/lista-empleados" element={<ListaEmpleados />} />
        <Route path="/lista-candidatos" element={<ListaCandidatos />} />
        <Route path="/estadisticas-admin" element={<Estadisticas />} />
        <Route path="/*" element={"/"} />
      </Routes>

    </main>
  )
}

export default Main;
