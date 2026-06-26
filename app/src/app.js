const express = require("express");
const client = require("prom-client");
const path = require("path")

const app = express();
const PORT = 3001;

const register = new client.Registry();
client.collectDefaultMetrics({ register });

const httpRequests = new client.Counter({
  name: 'http_requests_total',
  help: 'Total HTTP Requests',
  labelNames: ['method', 'route', 'status'],
  registers: [register]
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Health check
app.get('/health', (req, res) => {
  httpRequests.inc({ method: 'GET', route: '/health', status: 200 });
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.send(await register.metrics());
});

// Home
app.get('/', (req, res) => {
  httpRequests.inc({ method: 'GET', route: '/', status: 200 });
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
