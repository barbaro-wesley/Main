import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';
import { IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import { Settings, Menu as MenuIcon, AttachMoney, Healing, LocalHospital, Inventory, BarChart } from '@mui/icons-material';
import hcrLogo from './assets/hcr-logo.png';

export default function Sidebar() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsPopupOpen(false);
  };

  const handleSettingsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseSettingsMenu = () => {
    setAnchorEl(null);
  };

  const handleDashboardClick = () => {
    navigate('/dashboard'); // Caminho para o dashboard
    handleCloseSettingsMenu();
  };

  const handleLogoutClick = () => {
    navigate('/login'); // Caminho para a tela de login
    handleCloseSettingsMenu();
  };

  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="header-logo-title">
          <img src={hcrLogo} alt="HCR Logo" className="header-logo" />
          <h1 className="header-title">ANALYST</h1>
          <IconButton onClick={togglePopup} color="inherit">
            <MenuIcon fontSize="large" />
          </IconButton>
        </div>
        <div className="header-search">
          <input type="text" placeholder="Search..." className="header-search-input" />
        </div>
        
        {/* Botão de Configurações com Menu Expandido */}
        <IconButton onClick={handleSettingsClick} color="inherit">
          <Settings fontSize="large" />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseSettingsMenu}
        >
          <MenuItem onClick={handleDashboardClick}>Voltar ao Dashboard</MenuItem>
          <MenuItem onClick={handleLogoutClick}>Sair</MenuItem>
        </Menu>
      </header>

      {/* Popup de Seleção de Módulos */}
      {isPopupOpen && (
        <div className="module-popup">
          <div className="module-grid">
            <button onClick={() => handleNavigation('/faturamento')} className="module-item" style={{ color: '#4caf50' }}>
              <AttachMoney fontSize="large" />
              <span>Faturamento</span>
            </button>
            <button onClick={() => handleNavigation('/bloco-cirurgico')} className="module-item" style={{ color: '#f44336' }}>
              <Healing fontSize="large" />
              <span>Bloco Cirúrgico</span>
            </button>
            <button onClick={() => handleNavigation('/pronto-atendimento')} className="module-item" style={{ color: '#2196f3' }}>
              <LocalHospital fontSize="large" />
              <span>Pronto Atendimento</span>
            </button>
            <button onClick={() => handleNavigation('/suprimentos')} className="module-item" style={{ color: '#ff9800' }}>
              <Inventory fontSize="large" />
              <span>Suprimentos</span>
            </button>
            <button onClick={() => handleNavigation('/diagnostico')} className="module-item" style={{ color: '#9c27b0' }}>
              <Healing fontSize="large" />
              <span>Diagnóstico</span>
            </button>
            <button onClick={() => handleNavigation('/estatisticas-gerais')} className="module-item" style={{ color: '#3f51b5' }}>
              <BarChart fontSize="large" />
              <span>Estatísticas Gerais</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
