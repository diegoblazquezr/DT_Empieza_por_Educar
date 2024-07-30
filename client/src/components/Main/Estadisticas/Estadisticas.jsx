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
  const [searching, setSearching] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [error, setError] = useState('');
  const URL = import.meta.env.VITE_API_URL;

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
      //console.log(res);

      if (res) {
        setStats([res.data]);
        setError('');
        const res2 = await axios.get('https://api-empleados-2nuf.onrender.com/estadisticas/carrera');
        //console.log(res2);
        if (res2) {
          setStatsCarrera([res2.data]);
          setError('');
          const res3 = await axios.get('https://api-empleados-2nuf.onrender.com/estadisticas/notas');
          //console.log(res3);
          setStatsNotas([res3.data]);
        }
      }
      setError('');
    } catch (err) {
      console.error('Error al traer las estadísticas de la base de datos', err);
      setStats([]);
      setStatsCarrera([]);
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

  const dataCarrera = statsCarrera.length > 0 ? [
    {
      "id": "ADE",
      "label": "ADE",
      "value": statsCarrera[0].ade ||0,
      "color": "hsl(350, 70%, 50%)"
    },
    {
      "id": "Arquitectura",
      "label": "Arquitectura",
      "value": statsCarrera[0].arquitectura ||0,
      "color": "hsl(273, 70%, 50%)"
    },
    {
      "id": "Biología",
      "label": "Biología",
      "value": statsCarrera[0].biología ||0,
      "color": "hsl(350, 70%, 50%)"
    },
    {
      "id": "Derecho",
      "label": "Derecho",
      "value": statsCarrera[0].derecho ||0,
      "color": "hsl(264, 70%, 50%)"
    },
    {
      "id": "Economía",
      "label": "Economía",
      "value": statsCarrera[0].economía ||0,
      "color": "hsl(122, 70%, 50%)"
    },
    {
      "id": "E. Infantil",
      "label": "E. Infantil",
      "value": statsCarrera[0].educación_infantil||0,
      "color": "hsl(258, 70%, 50%)"
    },
    {
      "id": "E. Primaria",
      "label": "E. Primaria",
      "value": statsCarrera[0].educación_primaria||0,
      "color": "hsl(273, 70%, 50%)"
    },
    {
      "id": "E. Social",
      "label": "E. Social",
      "value": statsCarrera[0].educación_social||0,
      "color": "hsl(273, 70%, 50%)"
    },
    {
      "id": "Filosofía",
      "label": "Filosofía",
      "value": statsCarrera[0].filosofía||0,
      "color": "hsl(273, 70%, 50%)"
    },
    {
      "id": "física",
      "label": "física",
      "value": statsCarrera[0].física||0,
      "color": "hsl(273, 70%, 50%)"
    },
    {
      "id": "historia",
      "label": "historia",
      "value": statsCarrera[0].historia||0,
      "color": "hsl(273, 70%, 50%)"
    },
    {
      "id": "informática",
      "label": "informática",
      "value": statsCarrera[0].informática||0,
      "color": "hsl(273, 70%, 50%)"
    },
    {
      "id": "ingeniería",
      "label": "ingeniería",
      "value": statsCarrera[0].ingeniería||0,
      "color": "hsl(273, 70%, 50%)"
    },
    {
      "id": "literatura",
      "label": "literatura",
      "value": statsCarrera[0].literatura||0,
      "color": "hsl(273, 70%, 50%)"
    },
    {
      "id": "matemáticas",
      "label": "matemáticas",
      "value": statsCarrera[0].matemáticas||0,
      "color": "hsl(273, 70%, 50%)"
    },
    {
      "id": "Medicina",
      "label": "Medicina",
      "value": statsCarrera[0].medicina||0,
      "color": "hsl(258, 70%, 50%)"
    }, 
    {
      "id": "otra",
      "label": "otra",
      "value": statsCarrera[0].otra||0,
      "color": "hsl(273, 70%, 50%)"
    },
    {
      "id": "pedagogía",
      "label": "pedagogía",
      "value": statsCarrera[0].pedagogía||0,
      "color": "hsl(273, 70%, 50%)"
    },
    {
      "id": "Periodismo",
      "label": "Periodismo",
      "value": statsCarrera[0].periodismo||0,
      "color": "hsl(273, 70%, 50%)"
    },
    {
      "id": "psicología",
      "label": "psicología",
      "value": statsCarrera[0].psicología||0,
      "color": "hsl(273, 70%, 50%)"
    },
    {
      "id": "psicopedagogía",
      "label": "psicopedagogía",
      "value": statsCarrera[0].psicopedagogía||0,
      "color": "hsl(273, 70%, 50%)"
    },
    {
      "id": "química",
      "label": "química",
      "value": statsCarrera[0].química||0,
      "color": "hsl(273, 70%, 50%)"
    },
    {
      "id": "sociología",
      "label": "sociología",
      "value": statsCarrera[0].sociología||0,
      "color": "hsl(273, 70%, 50%)"
    }
  ] : [];

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
    data: dataCarrera,
    margin: isMobile
      ? { top: 20, right: 20, bottom: 20, left: 20 }
      : { top: 40, right: 80, bottom: 80, left: 80 },
    innerRadius: 0.5,
    padAngle: 0.7,
    cornerRadius: 3,
    activeOuterRadiusOffset: 8,
    colors: { scheme: 'greens' },
    borderWidth: isMobile ? 3 : 6,
    enableArcLinkLabels: isMobile ? false : true,
    arcLinkLabelsSkipAngle: 10,
    arcLinkLabelsTextColor: "#333333",
    arcLinkLabelsThickness: 2,
    arcLinkLabelsColor: { from: 'color' },
    arcLabelsSkipAngle: 10,
    arcLabelsTextColor: { from: 'color', modifiers: [['darker', 2]] },
    arcLinkLabel: d => `${d.id} (${d.value}%)`,
    responsive: true,
    legends: []
  };

  const dataCarreraNota = [
    {
        "carrera": "I. Informática",
        "candidaturas": 7.26,
        "nota media": 8.5
    },
    {
        "carrera": "Medicina",
        "candidaturas": 6.5,
        "nota media": 9.2
    },
    // más datos
];
  


  return <> <section className="estadisticas">
    <h2>Estadisticas Generales</h2>
    {searching ? (
      <div className="spinner"><CirclesWithBar
        height="150"
        width="150"
        color="#4fa94d"
        outerCircleColor="#4fa94d"
        innerCircleColor="#4fa94d"
        barColor="#4fa94d"
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
              margin={{ top: 50, right: 20, bottom: 50, left: 100 }}
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
                truncateTickAt: 0
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
      {statsCarrera.length > 0 ? (
        <>
          <h3>Nº de candidat@s por carrera</h3>
          <div className="piechart">
            <ResponsivePie {...pieChartProps} />
          </div>
        </>
      ) : (
        <p>No hay estadísticas disponibles.</p>
      )}
      
        <>
          <h3>Nº de candidatos por carrera y nota media</h3>
          <div className="grafica-combinada">
          <ResponsiveBar
        data={dataCarreraNota}
        keys={['candidaturas', 'nota media']}
        indexBy="carrera"
        margin={{ top: 50, right: 50, bottom: 50, left: 100 }}
        padding={0.3}
        groupMode="grouped"
        layout="horizontal"
        colors={{ scheme: 'yellow_green' }}
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
                translateY: 0,
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
    
    </article>
    )}
  </section>
  </>;
};

export default Estadisticas;