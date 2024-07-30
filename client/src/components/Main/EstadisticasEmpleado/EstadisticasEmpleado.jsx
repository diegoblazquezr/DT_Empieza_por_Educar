import React, { useState, useEffect, useContext } from "react";
import { ResponsiveBar } from '@nivo/bar';
import axios from 'axios';
import { CirclesWithBar } from 'react-loader-spinner';
import { AuthContext } from "../../../context/AuthContext";

const EstadisticasEmpleado = () => {
  const { id } = useContext(AuthContext);
  const [stats, setStats] = useState([]);
  const [searching, setSearching] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [error, setError] = useState('');
  const URL = import.meta.env.VITE_API_URL;
  const layoutVariable = screenWidth > 768 ? "vertical" : "horizontal";
  const isMobile = screenWidth < 600;

  useEffect(() => {
    getStats();
  }, []);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, []);

  const getStats = async () => {
    setSearching(true);

    try {
      const res = await axios.get(`https://api-empleados-2nuf.onrender.com/candidaturas_por_empleado?id_empleado=${id}`);
      console.log(res);
      if (res.data.message) {
        setError(res.data.message);
        console.log(res.data.message)
      } else {
        setStats([res.data]);
      setError('');
      }
      
    } catch (err) {
      console.error('Error al traer las estadísticas de la base de datos', err);
      setStats([]);
      setError('Error al traer las estadísticas de la base de datos. Inténtalo de nuevo.');
      setTimeout(() => {
        setError('');
      }, 3000);
    } finally {
      setSearching(false);
    }
  };

  console.log(stats)

  const dataFinal = stats.length > 0 ? [
    { user: "reclutador", type: "Abandona", value: stats[0].Abandona, color: "hsl(165, 100%, 25%)" },
    { user: "reclutador", type: "Centro Eval.", value: stats[0].CentroEvaluación, color: "hsl(61, 100%, 42%)" },
    { user: "reclutador", type: "Descartado", value: stats[0].Descartado, color: "hsl(137, 55%, 37%)" },
    { user: "reclutador", type: "Entrevista 1", value: stats[0].Entrevista1, color: "hsl(61, 100%, 44%)" },
    { user: "reclutador", type: "Entrevista 2", value: stats[0].Entrevista2, color: "hsl(101, 55%, 42%)" },
    { user: "reclutador", type: "Ofertado", value: stats[0].Ofertado, color: "hsl(60, 87%, 53%)" },
    { user: "reclutador", type: "Registro", value: stats[0].Registro, color: "hsl(81, 77%, 41%)" }
  ] : [];

  console.log(dataFinal)


  return <><section className="estadisticas-empleado">
    <h2>Tus estadísticas</h2>
    {searching ? (
      <div className="spinner"><CirclesWithBar
        height="150"
        width="150"
        color="#11654d"
        outerCircleColor="#11654d"
        innerCircleColor="#FFCC00"
        barColor="#FFCC00"
        ariaLabel="circles-with-bar-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
      </div>
    ) : (error.length > 0 ? (<p>{error}</p>) : (<><article className="estadisticas-empleado">
      {stats.length > 0 ? (
        <>
          <h3>Número de candidaturas por status</h3>
          <div className="grafica-reclutador-container">
            <ResponsiveBar
              data={dataFinal}
              keys={['value']}
              indexBy="type"
              margin={{ top: 30, right: 20, bottom: 50, left: 80 }}
              padding={0.3}
              groupMode="grouped"
              layout={layoutVariable}
              valueScale={{ type: 'linear' }}
              indexScale={{ type: 'band', round: true }}
              colors={({ data }) => data.color}
              borderColor="green"
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 5,
                tickValues: 9,
                tickPadding: 5,
                tickRotation: 0,
                truncateTickAt: 0,
              }}
              labelSkipWidth={12}
              labelSkipHeight={12}
              labelTextColor="black"
              legends={[]}
              role="application"
              isFocusable={true}
              ariaLabel="Gráfica de nº de candidaturas por status"
              barAriaLabel={e => `${e.id}: ${e.formattedValue} in user: ${e.indexValue}`}
            />
          </div>
        </>
      ) : (
        <p>No hay estadísticas disponibles.</p>
      )}
    </article></>
    ))}
  </section></>
};

export default EstadisticasEmpleado;
