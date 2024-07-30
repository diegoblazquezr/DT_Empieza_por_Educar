import React, { useState, useEffect } from "react";
import { ResponsiveBar } from '@nivo/bar';
import { ResponsivePie } from '@nivo/pie';
import axios from 'axios';
import { CirclesWithBar } from 'react-loader-spinner';

const Estadisticas = () => {
  // make sure parent container have a defined height when using
  // responsive component, otherwise height will be 0 and
  // no chart will be rendered.
  // website examples showcase many properties,
  // you'll often use just a few of them.
  //https://api-empleados-2nuf.onrender.com/candidaturas_status 
  //const [statsAno, setStatsAno] = useState([]);
  const [stats, setStats] = useState([]);
  const [statsCarrera, setStatsCarrera] = useState([]);
  const [statsNotas, setStatsNotas] = useState([]);
  const [statsEdad, setStatsEdad] = useState([]);
  const [searching, setSearching] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [error, setError] = useState('');

  useEffect(() => {
    getStats();
  }, []);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, []);

  const layoutVariable = screenWidth > 768 ? "vertical" : "horizontal";
  const isMobile = screenWidth < 600;

  const getStats = async () => {
    setSearching(true);

    try {
      const res = await axios.get('https://api-empleados-2nuf.onrender.com/candidaturas_status');
      console.log(res);

      if (res) {
        setStats([res.data]);
        setError('');
        try {
          const res2 = await axios.get('https://api-empleados-2nuf.onrender.com/estadisticas/carrera');
          console.log(res2);

          if (res2) {
            setStatsCarrera([res2.data]);
            setError('');
            try {
              const res3 = await axios.get('https://api-empleados-2nuf.onrender.com/estadisticas/notas');
              console.log(res3);

              if (res3) {
                setStatsNotas([res3.data]);
                setError('');
                try {
                  const res4 = await axios.get('https://api-empleados-2nuf.onrender.com/estadisticas/edad');
                  console.log(res4);
                  setStatsEdad([res4.data]);

                } catch (error) {
                  console.error('Error al traer las estadísticas de la base de datos', err);
                  setStats([]);
                  setStatsCarrera([]);
                  setStatsNotas([]);
                  statsEdad([]);
                  setError('Error al traer las estadísticas de la base de datos. Inténtalo de nuevo.');
                  setTimeout(() => {
                    setError('');
                  }, 3000);
                }
              }

            } catch (error) {
              console.error('Error al traer las estadísticas de la base de datos', err);
              setStats([]);
              setStatsCarrera([]);
              setStatsNotas([]);
              statsEdad([]);
              setError('Error al traer las estadísticas de la base de datos. Inténtalo de nuevo.');
              setTimeout(() => {
                setError('');
              }, 3000);
            }
            setError('');

          }
        } catch (error) {
          console.error('Error al traer las estadísticas de la base de datos', err);
          setStats([]);
          setStatsCarrera([]);
          setStatsNotas([]);
          statsEdad([]);
          setError('Error al traer las estadísticas de la base de datos. Inténtalo de nuevo.');
          setTimeout(() => {
            setError('');
          }, 3000);
        }


      }
      setError('');
    } catch (err) {
      console.error('Error al traer las estadísticas de la base de datos', err);
      setStats([]);
      setStatsCarrera([]);
      setStatsNotas([]);
      statsEdad([]);
      setError('Error al traer las estadísticas de la base de datos. Inténtalo de nuevo.');
      setTimeout(() => {
        setError('');
      }, 3000);
    } finally {
      setSearching(false);
    }
  };

  const dataOK = stats;
  const dataFINAL = stats.length > 0 ? [
    { user: "admin", type: "Abandona", value: dataOK[0].Abandona, color: "hsl(165, 100%, 25%)" },
    { user: "admin", type: "Centro Eval.", value: dataOK[0].CentroEvaluación, color: "hsl(61, 100%, 42%)" },
    { user: "admin", type: "Descartado", value: dataOK[0].Descartado, color: "hsl(137, 55%, 37%)" },
    { user: "admin", type: "Entrevista 1", value: dataOK[0].Entrevista1, color: "hsl(61, 100%, 44%)" },
    { user: "admin", type: "Entrevista 2", value: dataOK[0].Entrevista2, color: "hsl(101, 55%, 42%)" },
    { user: "admin", type: "Ofertado", value: dataOK[0].Ofertado, color: "hsl(60, 87%, 53%)" },
    { user: "admin", type: "Registro", value: dataOK[0].Registro, color: "hsl(81, 77%, 41%)" }
  ] : [];


  //Transformación para adaptar lo que viene del endpoint a NIVO
  const dataEdades = statsEdad.length > 0 ? Object.entries(statsEdad[0]).map(([rangoEdad, porcentaje]) => ({
    id: rangoEdad,
    value: porcentaje
  })) : [];
  console.log(dataEdades)

  const colorScale = [
    '#EEEF20', 
    '#DDDF00',
    '#D4D700',
    '#BFD200',
    '#AACC00',
    '#80B918',
    '#55A630',
    '#2B9348',
    '#108B6C' 
  ];

  const legendProps = {
    anchor: 'bottom',
    direction: 'row',
    justify: false,
    translateX: 0,
    translateY: 56,
    itemsSpacing: 0,
    itemWidth: 100,
    itemHeight: 18,
    itemDirection: 'left-to-right',
    itemTextColor: '#333333',
    itemOpacity: 3,
    symbolSize: 18,
    symbolShape: 'diamond',
  };

  const pieChartProps = {
    data: dataEdades,
    margin: isMobile
      ? { top: 20, right: 20, bottom: 20, left: 20 }
      : { top: 40, right: 40, bottom: 40, left: 40 },
    innerRadius: 0.5,
    padAngle: 0.7,
    cornerRadius: 3,
    activeOuterRadiusOffset: 8,
    colorBy: 'id',    
    borderWidth: isMobile ? 3 : 6,
    enableArcLinkLabels: isMobile ? false : true,
    arcLinkLabelsSkipAngle: 10,
    arcLinkLabelsTextColor: "#333333",
    arcLinkLabelsThickness: 2,
    arcLinkLabelsColor: { from: 'color' },
    arcLabelsSkipAngle: 10,
    arcLabelsTextColor: "black",
    arcLinkLabel: d => `${d.id} años`,
    responsive: true,
    legends: [],
    colors: ({ id }) => colorScale[dataEdades.findIndex(d => d.id === id) % colorScale.length]

  };

  const dataCarreraNota = statsNotas.length > 0 ? [
    {
      "carrera": "ADE",
      "candidaturas": statsCarrera[0].ade || 0,
      "nota media": statsNotas[0].ade || 0,
    },
    {
      "carrera": "Arquitectura",
      "candidaturas": statsCarrera[0].arquitectura || 0,
      "nota media": statsNotas[0].arquitectura || 0,
    },
    {
      "carrera": "Biología",
      "candidaturas": statsCarrera[0].biología || 0,
      "nota media": statsNotas[0].biología || 0,
    },
    {
      "carrera": "Derecho",
      "candidaturas": statsCarrera[0].derecho || 0,
      "nota media": statsNotas[0].derecho || 0,
    },
    {
      "carrera": "Economía",
      "candidaturas": statsCarrera[0].economía || 0,
      "nota media": statsNotas[0].economía || 0,
    },
    {
      "carrera": "E. Infantil",
      "candidaturas": statsCarrera[0].educación_infantil || 0,
      "nota media": statsNotas[0].educación_infantil || 0,
    },
    {
      "carrera": "E. Primaria",
      "candidaturas": statsCarrera[0].educación_primaria || 0,
      "nota media": statsNotas[0].educación_primaria || 0,
    },
    {
      "carrera": "E. Social",
      "candidaturas": statsCarrera[0].educación_social || 0,
      "nota media": statsNotas[0].educación_social || 0,
    },
    {
      "carrera": "Filosofía",
      "candidaturas": statsCarrera[0].filosofía || 0,
      "nota media": statsNotas[0].filosofía || 0,
    },
    {
      "carrera": "Física",
      "candidaturas": statsCarrera[0].física || 0,
      "nota media": statsNotas[0].física || 0,
    },
    {
      "carrera": "Historia",
      "candidaturas": statsCarrera[0].historia || 0,
      "nota media": statsNotas[0].historia || 0,
    },
    {
      "carrera": "Informática",
      "candidaturas": statsCarrera[0].informática || 0,
      "nota media": statsNotas[0].informática || 0,
    },
    {
      "carrera": "Ingeniería",
      "candidaturas": statsCarrera[0].ingeniería || 0,
      "nota media": statsNotas[0].ingeniería || 0,
    },
    {
      "carrera": "Literatura",
      "candidaturas": statsCarrera[0].literatura || 0,
      "nota media": statsNotas[0].literatura || 0,
    },
    {
      "carrera": "Matemáticas",
      "candidaturas": statsCarrera[0].matemáticas || 0,
      "nota media": statsNotas[0].matemáticas || 0,
    },
    {
      "carrera": "Medicina",
      "candidaturas": statsCarrera[0].medicina || 0,
      "nota media": statsNotas[0].medicina || 0,
    },
    {
      "carrera": "Otra",
      "candidaturas": statsCarrera[0].otra || 0,
      "nota media": statsNotas[0].otra || 0,
    },
    {
      "carrera": "Pedagogía",
      "candidaturas": statsCarrera[0].pedagogía || 0,
      "nota media": statsNotas[0].pedagogía || 0,
    },
    {
      "carrera": "Periodismo",
      "candidaturas": statsCarrera[0].periodismo || 0,
      "nota media": statsNotas[0].periodismo || 0,
    },
    {
      "carrera": "Psicología",
      "candidaturas": statsCarrera[0].psicología || 0,
      "nota media": statsNotas[0].psicología || 0,
    },
    {
      "carrera": "Psicopedagogía",
      "candidaturas": statsCarrera[0].psicopedagogía || 0,
      "nota media": statsNotas[0].psicopedagogía || 0,
    },
    {
      "carrera": "Química",
      "candidaturas": statsCarrera[0].química || 0,
      "nota media": statsNotas[0].química || 0,
    },
    {
      "carrera": "Sociología",
      "candidaturas": statsCarrera[0].sociología || 0,
      "nota media": statsNotas[0].sociología || 0,
    },
  ] : [];
  const filteredData = dataCarreraNota.filter(item => item.candidaturas > 0 || item['nota media'] > 0);


  return <> <section className="estadisticas">
    <h2>Estadísticas Generales</h2>
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
    ) : (<article className="estadisticas-admin">
      {stats.length > 0 ? (
        <>
          <h3>Número de candidaturas por status</h3>
          <div className="grafica-admin-container">
            <ResponsiveBar
              data={dataFINAL}
              keys={['value']}
              indexBy="type"
              margin={{ top: 30, right: 20, bottom: 50, left: 100 }}
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
      {statsEdad.length > 0 ? (
        <>
          <h3>% de candidaturas por rango de edad</h3>
          <div className="piechart">
            <ResponsivePie {...pieChartProps} />
          </div>
        </>
      ) : (
        <p>No hay estadísticas disponibles.</p>
      )}
      {statsNotas.length > 0 ? (
        <>
          <h3>Nº de candidat@s por carrera y nota media</h3>
          <div className="grafica-combinada">
            <ResponsiveBar
              data={filteredData}
              keys={['candidaturas', 'nota media']}
              indexBy="carrera"
              margin={isMobile
                ? { top: 50, right: 30, bottom: 50, left: 100 }
                : { top: 50, right: 50, bottom: 70, left: 100 }}
              padding={0.1}
              groupMode="stacked"
              layout={layoutVariable}
              colors={({ id }) => (id === 'candidaturas' ? '#11654d' : '#FFCC00')}
              borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 10,
                tickValues: 4,
                tickPadding: 5,
                tickRotation: 35,

              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,

              }}
              labelSkipWidth={15}
              labelSkipHeight={15}
              labelTextColor="black"
              legends={[
                {
                  dataFrom: 'keys',
                  anchor: 'top-left',
                  direction: 'row',
                  justify: false,
                  translateX: 20,
                  translateY: -20,
                  itemsSpacing: 20,
                  itemWidth: 80,
                  itemHeight: 20,
                  itemDirection: 'left-to-right',
                  itemOpacity: 0.85,
                  symbolSize: 20,
                  effects: [
                    {
                      on: 'hover',
                      style: {
                        itemOpacity: 1
                      }
                    }
                  ]
                }
              ]}
              role="application"
              isFocusable={true}
              ariaLabel="Gráfico de barras agrupadas"
            />
          </div>
        </>
      ) : (
        <p>No hay estadísticas disponibles.</p>
      )}
    </article>
    )}
  </section>
  </>;
};

export default Estadisticas;