import axios from "axios";
import { useEffect, useState } from "react";
import TarjetaEmpleado from "./TarjetaEmpleado";
import { v4 as uuidv4 } from "uuid";

const ListaEmpleados = ({ empleadoName }) => {
  const [empleadoDetails, setEmpleadoDetails] = useState([]);
  const [filteredEmpleadoDetails, setFilteredEmpleadoDetails] = useState([]);
  const URL = import.meta.env.VITE_API_DATA;

  const getEmpleadoDetails = async (name) => {
    try {
      const response = await axios.get(`${URL}/api/empleados`);
      return response.data;
    } catch (error) {
      console.error("Error obteniendo empleados", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchEmpleados = async () => {
      const details = await getEmpleadoDetails();
      setEmpleadoDetails(details);
      setFilteredEmpleadoDetails(details); // Mostrar todos las empleados inicialmente
    };
    fetchEmpleados();
  }, []);

  useEffect(() => {
    if (empleadoName) {
      const filteredDetails = empleadoDetails.filter((empleado) =>
        empleado.nombre.toLowerCase().includes(empleadoName.toLowerCase())
      );
      setFilteredEmpleadoDetails(filteredDetails);
    } else {
      setFilteredEmpleadoDetails(empleadoDetails); // Mostrar todos las empleados si no hay nombre
    }
  }, [empleadoName, empleadoDetails]);

  return (
    <section className="ListaEmpleados">
      {filteredEmpleadoDetails.map((empleado) => (
        <TarjetaEmpleado empleado={empleado} key={uuidv4()} />
      ))}
    </section>
  );
};

export default ListaEmpleados;
