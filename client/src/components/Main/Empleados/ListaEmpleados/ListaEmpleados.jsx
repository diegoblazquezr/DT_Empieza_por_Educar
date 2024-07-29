import axios from 'axios';
import { useEffect, useState } from 'react';
import TarjetaEmpleado from './TarjetaEmpleado';
import { v4 as uuidv4 } from 'uuid';

const ListaEmpleados = ({ empleadoName }) => {
  const [empleadoDetails, setEmpleadoDetails] = useState([]);

  const getEmpleadoDetails = async () => {
    const URL = '/api/all_empleados?offset=0&limit=50';
    try {
      const response = await axios.get(URL);
      console.log('Datos obtenidos de la API:', response.data.empleados);
      return response.data.empleados;
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
    };
    fetchEmpleados();
  }, []);

  const filteredEmpleadoDetails = empleadoName
    ? empleadoDetails.filter((empleado) =>
        empleado.nombre_empleado && empleado.nombre_empleado.toLowerCase().includes(empleadoName.toLowerCase())
      )
    : [];

  return (
    <div className="container">
      <section className="ListaEmpleados">
        {Array.isArray(filteredEmpleadoDetails) && filteredEmpleadoDetails.length > 0 ? (
          filteredEmpleadoDetails.map((empleado) => (
            <TarjetaEmpleado empleado={empleado} key={uuidv4()} />
          ))
        ) : (
          <p>Busca un empleado para poder ver sus detalles.</p>
        )}
      </section>
    </div>
  );
};

export default ListaEmpleados;
