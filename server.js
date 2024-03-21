const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/sumar', (req, res) => {
  const matriz1 = req.body.matriz1;
  const matriz2 = req.body.matriz2;
  const filas = matriz1.length;
  const columnas = matriz1[0].length;
  const resultado = [];

  for (let i = 0; i < filas; i++) {
    const fila = [];
    for (let j = 0; j < columnas; j++) {
      fila.push(matriz1[i][j] + matriz2[i][j]);
    }
    resultado.push(fila);
  }

  res.json(resultado);
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

