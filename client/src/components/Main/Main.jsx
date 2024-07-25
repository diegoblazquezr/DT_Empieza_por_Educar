import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../Main/Login/Login";
import Signup from "../Main/Signup/Signup";
import ListaCandidaturas from "../Main/ListaCandidaturas/ListaCandidaturas";
import EstadisticasEmpleado from "../Main/EstadisticasEmpleado/EstadisticasEmpleado";
import DetallesCandidatura from "../Main/DetallesCandidatura/DetallesCandidatura";
import ListaEmpleados from "../Main/ListaEmpleados/ListaEmpleados";
import Estadisticas from "../Main/Estadisticas/Estadisticas";
import Home from "../Main/Home/Home";


const Main = () => {
  return (
    <main className="main">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/lista-candidaturas" element={<ListaCandidaturas />} />
        <Route path="/estadisticas-empleado" element={<EstadisticasEmpleado />} />
        <Route path="/vista-detalle" element={<DetallesCandidatura />} />
        <Route path="/lista-empleados" element={<ListaEmpleados />} />
        <Route path="/estadisticas-admin" element={<Estadisticas />} />
        <Route path="/*" element={"/"} />
      </Routes>

    </main>
  )
}

export default Main;
