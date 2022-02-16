const express = require('express');
const { route } = require('express/lib/application');
const routes = express.Router();

const {
  createTaskController,
  getAll,
  deleteTaskController
} = require('../controllers/taskControllers');

//ROTA PARA CRIAR UMA NOVA TAREFA
routes.post('/task',createTaskController);
routes.get('/task',getAll);
routes.delete('/task/:id', deleteTaskController )

//ROTA DE TESTE DO SERVIDOR;
routes.get('/', (req, res) => res.send('Hello World!'))

module.exports = routes;