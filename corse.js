const express = require('express');
const app = express();

// Obsługa żądań CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});

// Kod obsługujący żądanie
app.get('/example', (req, res) => {
  res.send('Przykładowa odpowiedź');
});

app.listen(5000);