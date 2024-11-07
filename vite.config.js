// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Este caminho ('/jasperserver-pro') será redirecionado para o servidor JasperReports
      '/jasperserver-pro': {
        target: 'https://painel-bi.inovadora.com.br:8443/jasperserver-pro/login.html', // URL do backend
        changeOrigin: true, // Modifica o cabeçalho de origem da requisição para corresponder ao destino
        secure: false, // Use 'false' para aceitar certificados SSL auto-assinados
        rewrite: (path) => path.replace(/^\/jasperserver-pro/, '/jasperserver-pro') // Reescreve o caminho
      }
    }
  }
});

