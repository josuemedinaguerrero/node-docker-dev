const express = require('express');
const mysql = require('mysql2');

// Crea la conexión a la base de datos
const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

const app = express();
app.use(express.json());

// Conexión a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err);
    process.exit();
  }
  console.log('Conectado a la base de datos MySQL');
});

// Ruta para obtener todos los usuarios
app.get('/usuarios', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener usuarios' });
    }

    res.json(results);
  });
});

// Ruta para obtener un usuario por ID
app.get('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener el usuario' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(results[0]);
  });
});

// Ruta para crear un nuevo usuario
app.post('/usuarios', (req, res) => {
  const { nombre, correo } = req.body;
  db.query('INSERT INTO users (nombre, correo) VALUES (?, ?)', [nombre, correo], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al crear el usuario' });
    }
    res.status(201).json({ id: results.insertId, nombre, correo });
  });
});

// Ruta para actualizar un usuario
app.put('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, correo } = req.body;
  db.query('UPDATE users SET nombre = ?, correo = ? WHERE id = ?', [nombre, correo, id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
    res.json({ message: 'Usuario actualizado' });
  });
});

// Ruta para eliminar un usuario
app.delete('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM users WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
    res.json({ message: 'Usuario eliminado' });
  });
});

// Inicia el servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
