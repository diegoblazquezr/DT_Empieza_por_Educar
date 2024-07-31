
import axios from 'axios';
import { useEffect, useState } from 'react';
import TarjetaCandidatos from './TarjetaCandidatos';
import { v4 as uuidv4 } from 'uuid';
import { ProgressBar } from 'react-loader-spinner';

const ListaCandidatos = ({ candidatoEmail }) => {
  const [candidatoDetails, setCandidatoDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  const getCandidatoDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${URL}/api/candidatos?email_candidato=${candidatoEmail}`);
      console.log(response.data[0]);
      return response.data[0];
    } catch (error) {
      console.error('Error obteniendo candidatos', error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCandidato = async () => {
      if (candidatoEmail) {
        const details = await getCandidatoDetails(candidatoEmail);
        setCandidatoDetails(details);
      } else {
        setCandidatoDetails(null);
      }
    };
    fetchCandidato();
  }, [candidatoEmail]);

  const handleUpdate = (updatedCandidato) => {
    if (candidatoDetails && candidatoDetails.id_candidato === updatedCandidato.id_candidato) {
      setCandidatoDetails(updatedCandidato);
    }
  };

  const handleDelete = (id_candidato) => {
    if (candidatoDetails && candidatoDetails.id_candidato === id_candidato) {
      setCandidatoDetails(null);
    }
  };

  return (
    !loading ? (
      <section className="ListaCandidatos">
        {candidatoDetails ? (
          <TarjetaCandidatos
            candidatos={candidatoDetails}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ) : (
          <p>No se encontraron candidatos.</p>
        )}
      </section>
    ) : (
      <ProgressBar
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
    )
  );
};

export default ListaCandidatos;