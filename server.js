const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.disable('x-powered-by');

// Servir archivos estáticos (index.html, style.css, app.js)
app.use(express.static(__dirname));

// Health check
app.get('/health', (req, res) => {
  res.send({
    status: 'running',
    service: 'Depro Tech IA Solutions - Official Web Portfolio',
    uptime_seconds: Math.floor(process.uptime())
  });
});

// Todas las rutas cargan el portafolio
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Depro Tech IA Solutions Portfolio running on port ${PORT}`);
});
