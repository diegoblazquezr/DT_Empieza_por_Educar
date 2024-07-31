import React, { useEffect, useState, useCallback, useContext } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";
import TarjetaCandidatura from "./TarjetaCandidatura";
import { v4 as uuidv4 } from "uuid";
import { AuthContext } from "../../../../context/AuthContext";
import { ProgressBar } from 'react-loader-spinner';


axios.defaults.withCredentials = true;

const ListaCandidaturas = ({ candidaturas, setCandidaturas }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [inputSearch, setInputSearch] = useState('');
  const debouncedSearchTerm = useDebounce(inputSearch, 500);
  const [selectStatus, setSelectStatus] = useState('');
  const [selectFilter, setSelectFilter] = useState('fecha_registro');
  const [selectOrder, setSelectOrder] = useState('desc');
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);

  const URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  const { logged, rol, id } = useContext(AuthContext);

  console.log('ListaCandidaturas:', logged, rol, id);

  const updateURL = useCallback((page) => {
    navigate(`/candidaturas?page=${page}`);
  }, [navigate]);

  function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);

    return debouncedValue;
  }

  const getCandidaturas = useCallback(async (search, id, status, filter, order, limit, offset) => {
    console.log('getCandidaturas called with id:', id);
    try {
      const res = await axios.get(`${URL}/api/candidaturas`, {
        params: { search, id_empleado: id, status, filter, order, limit, offset }
      });
      console.log('API response:', res.data);
      const json = res.data;
      setCandidaturas(json.items);
      setTotalItems(json.totalCount);
    } catch (e) {
      setLoading(false);
      console.error('Error in getCandidaturas:', e);
      setCandidaturas([]);
      setTotalItems(0);
    }
    setLoading(false);
  }, [URL, setCandidaturas]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const newOffset = (page - 1) * limit;
  
    console.log('setId_empleado:', id);
  
    setCurrentPage(page);
    setOffset(newOffset);
  }, [location.search, limit, rol, id]);

  useEffect(() => {
    console.log('Calling getCandidaturas with id:', id);
    getCandidaturas(debouncedSearchTerm, rol === 'admin' ? '' : id, selectStatus, selectFilter, selectOrder, limit, offset);
  }, [getCandidaturas, debouncedSearchTerm, id, rol, selectStatus, selectFilter, selectOrder, limit, offset]);

  useEffect(() => {
    if (debouncedSearchTerm !== inputSearch) {
      setCurrentPage(1);
      navigate(`/candidaturas?page=1`);
    }
  }, [debouncedSearchTerm, inputSearch, navigate]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputSearch(value);
  };

  const handleStatusChange = (e) => {
    const value = e.target.value === 'All' ? '' : e.target.value;
    setSelectStatus(value);
    setCurrentPage(1);
    updateURL(1);
    getCandidaturas(inputSearch, rol === 'admin' ? '' : id, value, selectFilter, selectOrder, limit, 0);
  };
  
  const handleFilterChange = (e) => {
    const value = e.target.value;
    const [filter, order] = value.split('-');
    setSelectFilter(filter);
    setSelectOrder(order);
    setCurrentPage(1);
    updateURL(1);
    getCandidaturas(inputSearch, rol === 'admin' ? '' : id, selectStatus, filter, order, limit, 0);
  };
  
  const resetFilters = () => {
    setInputSearch('');
    setSelectStatus('');
    setSelectFilter('fecha_registro');
    setSelectOrder('desc');
    setLimit(10);
    setOffset(0);
    setCurrentPage(1);
    updateURL(1);
    getCandidaturas('', rol === 'admin' ? '' : id, '', 'fecha_registro', 'desc', 10, 0);
  };
  
  const handlePageChange = (newPage) => {
    const totalPages = Math.ceil(totalItems / limit);
    if (newPage >= 1 && newPage <= totalPages) {
      const newOffset = (newPage - 1) * limit;
      setCurrentPage(newPage);
      setOffset(newOffset);
      updateURL(newPage);
      getCandidaturas(inputSearch, rol === 'admin' ? '' : id, selectStatus, selectFilter, selectOrder, limit, newOffset);
    }
  };

  const renderCandidaturas = () =>
    candidaturas.map((candidatura) => (
      <TarjetaCandidatura
        key={uuidv4()}
        dataCandidatura={candidatura}
      />
    ));

  const renderPagination = () => {
    const totalPages = Math.ceil(totalItems / limit);
    const pageNumbers = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    window.scrollTo(0, 0);

    return (
      <div className="pagination">
        <button className="prev" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => handlePageChange(number)}
            className={currentPage === number ? 'active' : ''}
          >
            {number}
          </button>
        ))}
        <button className="next" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    );
  };

  return (
    <>
      <section className="listaCandidaturas">
          <form className="search-form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            name="inputCandidaturasSearch"
            id="inputCandidaturasSearch"
            placeholder="Buscar por nombre y apellido..."
            value={inputSearch}
            onChange={handleInputChange}
          />

          <select
            name="selectCandidaturasStatus"
            id="selectCandidaturasStatus"
            value={selectStatus}
            onChange={handleStatusChange}
          >
            <option value="">Todos los Status</option>
            <option value="Registro">Registro</option>
            <option value="CentroEvaluación">Centro de Evaluación</option>
            <option value="Solicitud">Solicitud</option>
            <option value="Descartado">Descartado</option>
            <option value="Entrevista1">Entrevista 1</option>
            <option value="Entrevista2">Entrevista 2</option>
            <option value="Ofertado">Ofertado</option>
            <option value="Abandona">Abandona</option>
          </select>

          <select
            name="selectCandidaturasFilter"
            id="selectCandidaturasFilter"
            value={`${selectFilter}-${selectOrder}`}
            onChange={handleFilterChange}
          >
            <option value="fecha_registro-desc">Fecha Registro: Más Reciente</option>
            <option value="fecha_registro-asc">Fecha Registro: Más Antiguo</option>
            <option value="nombre_candidato-asc">Nombre: A/Z</option>
            <option value="nombre_candidato-desc">Nombre: Z/A</option>
            <option value="apellidos_candidato-asc">Apellidos: A/Z</option>
            <option value="apellidos_candidato-desc">Apellidos: Z/A</option>
          </select>

          <button type="button" onClick={resetFilters}>Reiniciar Filtros</button>
        </form>

      <article className="listaCandidaturas">
      {loading ? (
          <div className="spinner"><ProgressBar
            visible={true}
            height="150"
            width="200"
            color="#4fa94d"
            barColor='#FFCC00'
            borderColor='#11654d'
            ariaLabel="progress-bar-loading"
            wrapperStyle={{}}
            wrapperClass=""
          /></div>
        ) : (renderCandidaturas())}
      </article>
      </section>

      {renderPagination()}
    </>
  );
};

export default ListaCandidaturas;
