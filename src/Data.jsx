import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Home from './Home';
import Faturamento from './Modulos/Faturamento';

export default function Data() {
  const [selectedMenu, setSelectedMenu] = useState('home');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const userName = import.meta.env.VITE_USER_NAME;
  const userPassword = import.meta.env.VITE_USER_PASSWORD;

  // Links dos gráficos
  const graficoLinks = {
    'atendimento-cores': {
      resource: "/adhoc/HCR__Marau_/Estatísticas/Atendimentos___Por_Escala_Manchester",
      auth: { name: userName, password: userPassword },
    },
    'ocupacao': {
      resource: "/adhoc/HCR__Marau_/Estatísticas/HCR____Ocupação",
      auth: { name: userName, password: userPassword },
    },
  };

  // Função de carregamento do gráfico
  const loadGrafico = (graficoId, containerId) => {
    const grafico = graficoLinks[graficoId];
    if (grafico) {
      window.visualize(
        {
          auth: { name: userName, password: userPassword },
        },
        function (v) {
          v(containerId).adhocView({
            resource: grafico.resource,
            error: (e) => console.error("Erro ao carregar gráfico", e),
          });
        }
      );
    } else {
      console.error(`Gráfico com ID ${graficoId} não encontrado.`);
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar setMessage={setSelectedMenu} setIsSidebarCollapsed={setIsSidebarCollapsed} />
      <div
        style={{
          marginLeft: isSidebarCollapsed ? '60px' : '260px',
          padding: '20px',
          width: '100%',
          transition: 'margin-left 0.3s ease',
        }}
      >
        {selectedMenu === 'home' && <Home loadGrafico={loadGrafico} />}
        {selectedMenu === 'faturamento' && <Faturamento loadGrafico={loadGrafico} />}
      </div>
    </div>
  );
}
