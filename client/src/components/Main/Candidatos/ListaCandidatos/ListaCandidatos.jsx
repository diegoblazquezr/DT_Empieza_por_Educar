import React, { useEffect, useState, useCallback } from "react";
import TarjetaCandidatos from "./TarjetaCandidatos";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const ListaCandidatos = ({ candidatosName }) => {
  const [candidatosDetails, setCandidatosDetails] = useState([]);
  const [filteredCandidatosDetails, setFilteredCandidatosDetails] = useState([]);
  const URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  const getCandidatosDetails = async () => {
    try {
      const response = await axios.get(`${URL}/api/candidatos?limit=20&offset=1000`);
      return response.data || [];
    } catch (error) {
      console.error("Error obteniendo candidatos", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchCandidatos = async () => {
      const details = await getCandidatosDetails();
      setCandidatosDetails(details);
      setFilteredCandidatosDetails(details);
    };
    fetchCandidatos();
  }, []);

  useEffect(() => {
    if (candidatosName) {
      const filteredDetails = candidatosDetails.filter((candidato) =>
        candidato.nombre_candidato && candidato.nombre_candidato.toLowerCase().includes(candidatosName.toLowerCase())
      );
      console.log("Filtered details:", filteredDetails);
      setFilteredCandidatosDetails(filteredDetails);
    } else {
      setFilteredCandidatosDetails(candidatosDetails);
    }
  }, [candidatosName, candidatosDetails]);

  const handleUpdate = useCallback((updatedCandidato) => {
    console.log("Updating candidate:", updatedCandidato);
    setCandidatosDetails(prevCandidatos => 
      prevCandidatos.map(candidato => 
        candidato.id_candidato === updatedCandidato.id_candidato ? updatedCandidato : candidato
      )
    );

    setFilteredCandidatosDetails(prevCandidatos =>
      prevCandidatos.map(candidato =>
        candidato.id_candidato === updatedCandidato.id_candidato ? updatedCandidato : candidato
      )
    );
  }, []);

  const handleDelete = (id_candidato) => {
    setCandidatosDetails((prevDetails) =>
      prevDetails.filter((candidato) => candidato.id_candidato !== id_candidato)
    );
  };

  return (
    <section className="listaCandidatos">
      {filteredCandidatosDetails.length > 0 ? (
        filteredCandidatosDetails.map((candidato) => (
          <TarjetaCandidatos
            candidatos={candidato}
            key={candidato.id_candidato}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))
      ) : (
        <p>No se encontraron candidatos.</p>
      )}
    </section>
  );
};

export default ListaCandidatos;