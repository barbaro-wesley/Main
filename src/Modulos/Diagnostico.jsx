import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import hcrLogo from "../assets/hcr-Logo.png";

export default function Diagostico() {
  const [open, setOpen] = useState(false);
  const [selectedChart, setSelectedChart] = useState({ title: '', description: '', id: '' });

  const userName = import.meta.env.VITE_USER_NAME;
  const userPassword = import.meta.env.VITE_USER_PASSWORD;

  const getFormattedDate = () => {
    const today = new Date();
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return today.toLocaleDateString('pt-BR', options);
  };

  const handleOpenPopup = (title, description, id) => {
    setSelectedChart({ title, description, id });
    setOpen(true);
  };

  const handleClosePopup = () => {
    setOpen(false);
  };

  // Função para exportar como PNG
  const exportAsPNG = async () => {
    const container = document.getElementById("popup-chart-container");
    if (container) {
      const canvas = await html2canvas(container);
      const link = document.createElement("a");
      link.download = `${selectedChart.title}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    }
  };

  // Função para exportar como PDF
  const generatePDF = async () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const logoWidth = 70;
    const logoHeight = 30;
    const logoX = (pageWidth - logoWidth) / 2;

    doc.addImage(hcrLogo, 'PNG', logoX, 10, logoWidth, logoHeight);

    const container = document.getElementById("popup-chart-container");
    if (container) {
      const canvas = await html2canvas(container);
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const imgData = canvas.toDataURL('image/png');
      doc.addImage(imgData, 'PNG', 10, 50, imgWidth, imgHeight);
      doc.save('relatorio-hospital.pdf');
    }
  };

  const loadGrafico = (chartId, containerId) => {
    window.visualize(
      {
        auth: { name: userName, password: userPassword },
      },
      function (v) {
        v(containerId).adhocView({
          resource: `/adhoc/HCR__Marau_/Estatísticas/${chartId}`,
          error: (e) => console.error("Erro ao carregar gráfico", e),
        });
      }
    );
  };

  useEffect(() => {
    if (open && selectedChart.id) {
      loadGrafico(selectedChart.id, '#popup-chart-container');
    }
  }, [open, selectedChart]);

  const chartData = [
    { title: 'Atendimento', percentage: 12, color: '#4b3f72', description: 'Descrição do gráfico de atendimento', id: 'Atendimentos___Por_Escala_Manchester' },
    { title: 'Ocupação', percentage: 15, color: '#417b5a', description: 'Descrição do gráfico de ocupação', id: 'HCR____Ocupação' },
    { title: 'Recuperação', percentage: 20, color: '#d0ceba', description: 'Descrição do gráfico de recuperação', id: 'recuperacao' },
    { title: 'Financeiro', percentage: 18, color: '#ffffff', description: 'Descrição do gráfico financeiro', id: 'financeiro' },
    { title: 'Desempenho', percentage: 25, color: '#ffffff', description: 'Descrição do gráfico de desempenho', id: 'desempenho' },
    { title: 'Desempenho', percentage: 25, color: '#ffffff', description: 'Descrição do gráfico de desempenho', id: 'desempenho' },
    { title: 'Desempenho', percentage: 25, color: '#ffffff', description: 'Descrição do gráfico de desempenho', id: 'desempenho' },
    { title: 'Desempenho', percentage: 25, color: '#ffffff', description: 'Descrição do gráfico de desempenho', id: 'desempenho' },
    { title: 'Desempenho', percentage: 25, color: '#ffffff', description: 'Descrição do gráfico de desempenho', id: 'desempenho' },
    { title: 'Desempenho', percentage: 25, color: '#ffffff', description: 'Descrição do gráfico de desempenho', id: 'desempenho' },
    { title: 'Desempenho', percentage: 25, color: '#ffffff', description: 'Descrição do gráfico de desempenho', id: 'desempenho' },
    { title: 'Desempenho', percentage: 25, color: '#ffffff', description: 'Descrição do gráfico de desempenho', id: 'desempenho' },
  ];

  const renderCard = (title, percentage, color, description, id) => (
    <Card sx={{ minWidth: 150, backgroundColor: color, color: color === '#ffffff' ? '#000000' : '#FFFFFF' }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body1">
          {percentage}%
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Atualizado em {getFormattedDate()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" sx={{ color: color === '#ffffff' ? '#000000' : '#FFFFFF' }} onClick={() => handleOpenPopup(title, description, id)}>
          Visualizar gráfico
        </Button>
      </CardActions>
    </Card>
  );

  return (
    <div>
      <Sidebar />
      <Box sx={{ padding: 10, overflowY: 'auto', maxHeight: '100vh', mt: 5 }}>
        <Grid container spacing={2}>
          {chartData.map((chart, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              {renderCard(chart.title, chart.percentage, chart.color, chart.description, chart.id)}
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Popup Dialog */}
      <Dialog open={open} onClose={handleClosePopup} fullWidth maxWidth="lg">
        <DialogTitle>{selectedChart.title}</DialogTitle>
        <DialogContent dividers sx={{ minHeight: '500px' }}>
          <Typography>{selectedChart.description}</Typography>
          <div id="popup-chart-container" style={{ width: '100%', height: '400px', marginTop: '20px' }}></div>
        </DialogContent>
        <DialogActions>
          <Button onClick={generatePDF} color="primary" startIcon={<PictureAsPdfIcon />} >Exportar como PDF</Button>
          <Button onClick={exportAsPNG} color="primary" startIcon={<ImageIcon />} >Exportar como PNG</Button>
          <Button onClick={handleClosePopup} color="primary">Fechar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
