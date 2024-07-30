import axios from 'axios';
import { useEffect, useState } from 'react';
import TarjetaEmpleado from './TarjetaEmpleado';
import { v4 as uuidv4 } from 'uuid';

const ListaEmpleados = ({ empleadoName }) => {
  const [empleadoDetails, setEmpleadoDetails] = useState([]);
  const [filteredEmpleadoDetails, setFilteredEmpleadoDetails] = useState([]);
  const URL = import.meta.env.VITE_API_DATA || 'http://localhost:3000';

  const getEmpleadoDetails = async () => {
    try {
      const response = await axios.get(`${URL}/all_empleados?offset=0&limit=10`);
      // console.log('Datos obtenidos de la API:', response.data.empleados);
      return response.data.empleados;
    } catch (error) {
      console.error('Error obteniendo empleados', error);
      return [];
    }
  };

  useEffect(() => {
    const fetchEmpleados = async () => {
      const details = await getEmpleadoDetails();
      // console.log('Detalles de empleados:', details);
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


  const handleUpdate = (updatedEmpleado) => {
    setEmpleadoDetails((prevDetails) =>
      prevDetails.map((empleado) =>
        empleado.id_empleado === updatedEmpleado.id_empleado ? updatedEmpleado : empleado
      )
    );
    setFilteredEmpleadoDetails((prevDetails) =>
      prevDetails.map((empleado) =>
        empleado.id_empleado === updatedEmpleado.id_empleado ? updatedEmpleado : empleado
      )
    );
  };

  const handleDelete = (id_empleado) => {
    setEmpleadoDetails((prevDetails) =>
      prevDetails.filter((empleado) => empleado.id_empleado !== id_empleado)
    );
    setFilteredEmpleadoDetails((prevDetails) =>
      prevDetails.filter((empleado) => empleado.id_empleado !== id_empleado)
    );
  };

  return (
    <section className="ListaEmpleados">
      {Array.isArray(filteredEmpleadoDetails) && filteredEmpleadoDetails.length > 0 ? (
        filteredEmpleadoDetails.map((empleado) => (
          <TarjetaEmpleado
            empleado={empleado}
            key={uuidv4()}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))
      ) : (
        <p>No se encontraron empleados.</p>
      )}
    </section>
  );
};

export default ListaEmpleados;
