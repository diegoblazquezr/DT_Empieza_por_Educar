import axios from "axios";
import TarjetaCandidatura from "./TarjetaCandidatura";
import { v4 as uuidv4 } from "uuid";

const ListaCandidaturas = ({ nombreCandidatura }) => {

  return (
    <section className="listaCandidaturas">
        <TarjetaCandidatura key={uuidv4()} />
    </section>
  );
};


export default ListaCandidaturas;
