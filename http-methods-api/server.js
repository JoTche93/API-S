const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json()); // Para leer JSON en el cuerpo de las peticiones
app.use(express.static(path.join(__dirname, 'public'))); // Sirve archivos de la carpeta /public

// Datos de ejemplo
let user = { id: 1, name: "Juan", email: "juan@email.com" };

// Métodos HTTP

app.get('/user', (req, res) => {
  res.json(user);
});

app.post('/user', (req, res) => {
  user = req.body;
  res.status(201).json({ message: "Usuario creado", user });
});

app.put('/user', (req, res) => {
  user = req.body;
  res.json({ message: "Usuario reemplazado", user });
});

app.patch('/user', (req, res) => {
  user = { ...user, ...req.body };
  res.json({ message: "Usuario actualizado parcialmente", user });
});

app.delete('/user', (req, res) => {
  user = {};
  res.json({ message: "Usuario eliminado" });
});

app.head('/user', (req, res) => {
  res.status(user.name ? 200 : 404).end();
});

app.options('/user', (req, res) => {
  res.set('Allow', 'GET,POST,PUT,PATCH,DELETE,HEAD,OPTIONS');
  res.send();
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor activo en http://localhost:${port}`);
});
