import { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";
import TarjetaCandidatura from "./TarjetaCandidatura";
import { v4 as uuidv4 } from "uuid";
import debounce from "debounce";

axios.defaults.withCredentials = true;

const ListaCandidaturas = ({ candidaturas, setCandidaturas }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [inputSearch, setInputSearch] = useState('');
  const [id_empleado, setId_empleado] = useState('');
  const [selectStatus, setSelectStatus] = useState('');
  const [selectFilter, setSelectFilter] = useState('fecha_registro');
  const [selectOrder, setSelectOrder] = useState('desc');
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  const updateURL = useCallback((params) => {
    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value !== '')
    );
    console.log(filteredParams);
    const searchParams = new URLSearchParams(filteredParams);
    navigate(`/candidaturas?${searchParams.toString()}`);
  }, [navigate]);

  const getCandidaturas = useCallback(async (search, id_empleado, status, filter, order, limit, offset) => {
    try {
      const res = await axios.get(`${URL}/api/candidaturas`, {
        params: { search, id_empleado, status, filter, order, limit, offset }
      });
      const json = res.data;
      console.log(json);
      setCandidaturas(json);
    } catch (e) {
      console.error(e);
      setCandidaturas([]);
    }
  }, [URL, setCandidaturas]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const search = searchParams.get('search') || '';
    const id_empleado = searchParams.get('id_empleado') || '';
    const statusCandidatura = searchParams.get('status') || '';
    const filter = searchParams.get('filter') || 'fecha_registro';
    const order = searchParams.get('order') || 'desc';
    const newLimit = parseInt(searchParams.get('limit') || '10', 10);
    const newOffset = parseInt(searchParams.get('offset') || '0', 10);

    setInputSearch(search);
    setId_empleado(id_empleado);
    setSelectStatus(statusCandidatura);
    setSelectFilter(filter);
    setSelectOrder(order);
    setLimit(newLimit);
    setOffset(newOffset);

    getCandidaturas(search, id_empleado, statusCandidatura, filter, order, newLimit, newOffset);
  }, [location.search, getCandidaturas]);

  const debouncedUpdateURL = useCallback(
    debounce((params) => updateURL(params), 500),
    [updateURL]
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputSearch(value);
    console.log(">>>" + value + ">>>" + inputSearch);
    debouncedUpdateURL({
      search: value.trim(),
      id_empleado,
      status: selectStatus,
      filter: selectFilter,
      order: selectOrder,
      limit,
      offset
    });
  };

  const handleStatusChange = (e) => {
    const value = e.target.value === 'All' ? '' : e.target.value;
    setSelectStatus(value);
    console.log(">>>" + value + ">>>" + selectStatus);
    updateURL({
      search: inputSearch,
      id_empleado,
      status: value,
      filter: selectFilter,
      order: selectOrder,
      limit,
      offset
    });
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    const [filter, order] = value.split('-');
    setSelectFilter(filter);
    setSelectOrder(order);
    console.log(inputSearch, selectStatus);
    updateURL({
      search: inputSearch,
      id_empleado,
      status: selectStatus,
      filter,
      order,
      limit,
      offset
    });
  };

  const resetFilters = () => {
    setInputSearch('');
    setSelectStatus('');
    setSelectFilter('fecha_registro');
    setSelectOrder('desc');
    setLimit(10);
    setOffset(0);
    updateURL({
      search: '',
      id_empleado: '',
      status: '',
      filter: 'fecha_registro',
      order: 'desc',
      limit: 10,
      offset: 0
    });
  };

  const renderCandidaturas = () =>
    candidaturas.map((candidatura) => (
      <TarjetaCandidatura
        key={uuidv4()}
        dataCandidatura={candidatura}
      />
    ));

  return (
    <>
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

      <section className="listaCandidaturas">
        {renderCandidaturas()}
      </section>
    </>
  );
};

export default ListaCandidaturas;