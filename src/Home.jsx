import React, { useEffect } from 'react';
import './Home.css';

export default function Home({ loadGrafico }) {
  
  useEffect(() => {
    loadGrafico('atendimento-cores', '#container-1');
    loadGrafico('ocupacao', '#container-2');
    loadGrafico('atendimento-cores', '#container-3');
  }, [loadGrafico]);

  return (
    <div className="dashboard1">
      {/* Cards menores no topo */}
      <div className="cardss">
        <div className="card small-card" style={{ backgroundColor: '#4b3f72' }}>
          <h3></h3>
          <p>12%</p>
        </div>
        <div className="card small-card" style={{ backgroundColor: '#417b5a' }}>
          <h3></h3>
          <p>12%</p>
        </div>
        <div className="card small-card" style={{ backgroundColor: '#d0ceba' }}>
          <h3></h3>
          <p>12%</p>
        </div>
        
      </div>

      {/* Cards dos gráficos */}
      <div className="charts">
        <div className="chart-card">
         
          <div id="container-1" className="chart-container"></div>
        </div>
        <div className="chart-card">
          
          <div id="container-2" className="chart-container"></div>
        </div>
        <div className="chart-card">
          
          <div id="container-3" className="chart-container"></div>
        </div>
      </div>
    </div>
  );
}
