import React, { createContext, useState, useCallback } from 'react';
import axios from 'axios';

export const CandidaturasContext = createContext();

export const CandidaturasProvider = ({ children }) => {
  const [candidaturas, setCandidaturas] = useState([]);
  const [selectedCandidatura, setSelectedCandidatura] = useState(null);
  const URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  const fetchCandidaturas = useCallback(async (params = {}) => {
    try {
      const response = await axios.get(`${URL}/api/candidaturas`, { params });
      setCandidaturas(response.data);
    } catch (error) {
      console.error("Error fetching candidaturas:", error);
    }
  }, [URL]);

  const updateCandidatura = (updatedCandidatura) => {
    setCandidaturas(prevCandidaturas =>
      prevCandidaturas.map(candidatura =>
        candidatura.id_candidatura === updatedCandidatura.id_candidatura
          ? updatedCandidatura
          : candidatura
      )
    );
  };

  const deleteCandidatura = (id_candidatura) => {
    setCandidaturas(prevCandidaturas =>
      prevCandidaturas.filter(candidatura => candidatura.id_candidatura !== id_candidatura)
    );
    setSelectedCandidatura(null);
  };

  return (
    <CandidaturasContext.Provider
      value={{
        candidaturas,
        setCandidaturas,
        selectedCandidatura,
        setSelectedCandidatura,
        fetchCandidaturas,
        updateCandidatura,
        deleteCandidatura,
      }}
    >
      {children}
    </CandidaturasContext.Provider>
  );
};
