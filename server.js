// server.js
const express = require('express');

const server = express();
const PORT = 3000;

const API_PREFIX = '/api/v1';

server.use('/', express.static(__dirname + '/dist'));

server.use('*', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});

server.listen(PORT, () => {
  console.log(`Server works on: ${PORT}!`);
});
