import React, { useState, useEffect } from "react";
import { ResponsiveRadar } from '@nivo/radar'
import { CirclesWithBar } from 'react-loader-spinner';

const GraficaCandidatura = ({ competencias }) => {
  const [searching, setSearching] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [error, setError] = useState('');
  //const layoutVariable = screenWidth > 768 ? "vertical" : "horizontal";
  const isMobile = screenWidth < 600;

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const data = competencias.map(comp => ({
    "competencia": comp.nombre_competencia === "HabilidadesSociales" ? comp.nombre_competencia="H.Sociales" : comp.nombre_competencia,
    "puntuación": comp.nota
  }));

  return (
    <>
      <div className="estadisticas-candidato">
        <h3>Competencias del candidato</h3>
        {searching ? (
          <div className="spinner">
            <CirclesWithBar
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
        ) : error && error.length > 0 ? (
          <p>{error}</p>
        ) : (
          <article className="grafica-competencias">
            {data && data.length > 0 ? (
              <ResponsiveRadar
                data={data} 
                keys={[ 'puntuación' ]}
                indexBy="competencia"
                maxValue={5}
                valueFormat=" >-.2f"
                margin={{ top: 70, right: 75, bottom: 40, left: 85 }}
                borderWidth={3}
                borderColor={{ from: 'color', modifiers: [] }}
                gridLevels={7}
                gridLabelOffset={isMobile ? 20 : 25}
                dotSize={10}
                dotColor={{ theme: 'background' }}
                dotBorderWidth={2}
                enableDotLabel={true}
                dotLabelYOffset={-5}
                colors={{ scheme: 'accent' }}
                blendMode="multiply"
                motionConfig="molasses"
                legends={[
                  {
                    anchor: 'top',
                    direction: 'column',
                    translateX: -50,
                    translateY: -60,
                    itemWidth: 80,
                    itemHeight: 20,
                    itemTextColor: 'black',
                    symbolSize: 12,
                    symbolShape: 'circle',
                    effects: [
                      {
                        on: 'hover',
                        style: {
                          itemTextColor: '#000',
                        },
                      },
                    ],
                  },
                ]}
              />
            ) : (
              <p>No hay estadísticas disponibles.</p>
            )}
          </article>
        )}
      </div>
    </>
  );
};

export default GraficaCandidatura;
