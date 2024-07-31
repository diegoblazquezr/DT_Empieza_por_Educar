import axios from 'axios';
import { useEffect, useState } from 'react';
import TarjetaEmpleado from './TarjetaEmpleado';
import { v4 as uuidv4 } from 'uuid';
import { ProgressBar } from 'react-loader-spinner';

const ListaEmpleados = ({ empleadoEmail }) => {
  const [empleadoDetails, setEmpleadoDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  const getEmpleadoDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${URL}/api/empleados?email_empleado=${empleadoEmail}`);
      console.log(response.data[0]);
      return response.data[0];
    } catch (error) {
      console.error('Error obteniendo empleados', error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchEmpleado = async () => {
      if (empleadoEmail) {
        const details = await getEmpleadoDetails(empleadoEmail);
        setEmpleadoDetails(details);
      } else {
        setEmpleadoDetails(null);
      }
    };
    fetchEmpleado();
  }, [empleadoEmail]);

  const handleUpdate = (updatedEmpleado) => {
    if (empleadoDetails && empleadoDetails.id_empleado === updatedEmpleado.id_empleado) {
      setEmpleadoDetails(updatedEmpleado);
    }
  };

  const handleDelete = (id_empleado) => {
    if (empleadoDetails && empleadoDetails.id_empleado === id_empleado) {
      setEmpleadoDetails(null);
    }
  };

  return (
    !loading ? <section className="ListaEmpleados">
      {empleadoDetails ? (
        <TarjetaEmpleado
          empleado={empleadoDetails}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      ) : (
        <p>No se encontraron empleados.</p>
      )}
    </section> : <ProgressBar
          visible={true}
          height="100"
          width="100"
          color="#4fa94d"
          barColor='#FFCC00'
          borderColor='#11654d'
          ariaLabel="progress-bar-loading"
          wrapperStyle={{}}
          wrapperClass=""
          />
  );
};

export default ListaEmpleados;
