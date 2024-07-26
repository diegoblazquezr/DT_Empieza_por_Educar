import { useEffect, useState } from "react";
import axios from "axios";
import TarjetaCandidatura from "./TarjetaCandidatura";
import { v4 as uuidv4 } from "uuid";
axios.defaults.withCredentials = true;


const ListaCandidaturas = ({ nombreCandidatura }) => {

  const [candidaturas, setCandidaturas] = useState([]);
  const [paginaActual, setPaginaActual] = useState(0);
  const [paginasTotales, setPaginasTotales] = useState(1);
  const [inputSearch, setInputSearch] = useState('');
  const candidaturasPorPagina = 15;
  const URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const getCandidaturas = async () => {
      try {
        // const res = await axios.get(`http://localhost:3000/api/candidaturas?search=&limit=10&offset=0`);
        const res = await axios.get(`${URL}/api/candidaturas?search=${inputSearch}&limit=${candidaturasPorPagina}&offset=${paginaActual}`,);
        console.log(res.data);
        // setCandidaturas(res.data);

      } catch (e) {
        console.error(e);
      }
    };
    getCandidaturas();
  }, []); 
  return (
    <section className="listaCandidaturas">
        <TarjetaCandidatura key={uuidv4()} />
    </section>
  );
};


export default ListaCandidaturas;
