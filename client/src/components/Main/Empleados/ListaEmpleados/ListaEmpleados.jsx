import axios from 'axios';
import { useEffect, useState } from 'react';
import TarjetaEmpleado from './TarjetaEmpleado';
import { v4 as uuidv4 } from 'uuid';

const ListaEmpleados = ({ empleadoName }) => {
  const [empleadoDetails, setEmpleadoDetails] = useState([]);
  const [filteredEmpleadoDetails, setFilteredEmpleadoDetails] = useState([]);

  const getEmpleadoDetails = async () => {
    const URL = '/api/all_empleados?offset=0&limit=10';
    try {
      const response = await axios.get(URL);
      console.log('Datos obtenidos de la API:', response.data.empleados);
      return response.data.empleados; // Acceder a la propiedad 'empleados'
    } catch (error) {
      console.error('Error obteniendo empleados', error);
      return [];
    }
  };

  useEffect(() => {
    const fetchEmpleados = async () => {
      const details = await getEmpleadoDetails();
      console.log('Detalles de empleados:', details);
      setEmpleadoDetails(details);
      setFilteredEmpleadoDetails(details);
    };
    fetchEmpleados();
  }, []);

  useEffect(() => {
    if (empleadoName) {
      const filteredDetails = empleadoDetails.filter((empleado) =>
        empleado.nombre.toLowerCase().includes(empleadoName.toLowerCase())
      );
      console.log('Detalles de empleados filtrados:', filteredDetails);
      setFilteredEmpleadoDetails(filteredDetails);
    } else {
      setFilteredEmpleadoDetails(empleadoDetails);
    }
  }, [empleadoName, empleadoDetails]);

  return (
    <section className="ListaEmpleados">
      {Array.isArray(filteredEmpleadoDetails) && filteredEmpleadoDetails.length > 0 ? (
        filteredEmpleadoDetails.map((empleado) => (
          <TarjetaEmpleado empleado={empleado} key={uuidv4()} />
        ))
      ) : (
        <p>No se encontraron empleados.</p>
      )}
    </section>
  );
};

export default ListaEmpleados;
