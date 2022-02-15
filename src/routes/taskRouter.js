const express = require('express');
const routes = express.Router();

const {
  createTaskController,
  // getAllTaskController
} = require('../controllers/taskControllers');

//ROTA PARA CRIAR UMA NOVA TAREFA
routes.post('/task',createTaskController);
// routes.get('/task',getAllTaskController);

//ROTA DE TESTE DO SERVIDOR;
routes.get('/', (req, res) => res.send('Hello World!'))

module.exports = routes;