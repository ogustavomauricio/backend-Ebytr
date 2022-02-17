const res = require('express/lib/response');
const {
	createTaskService,
   getAllService,
   deleteTaskService,
   getByIdTaskService,
   updateTaskService
} = require('../services/taskService');

const createTaskController = async (req, res) => {
  console.log(req.body);
  const response = await createTaskService(req.body);

  const { message, status } = response;

  if (message) {
    return res.status(status).json({ message });
  } 
  
	 return res.status(201).json( response );
};

const getAll = async (req, res) => {
const getTask = await getAllService();

return res.status(200).json({ task: getTask });
};

const deleteTaskController = async(req, res) => {
  const { id } = req.params;
  console.log('TESTEEEEE',id);
const { message, err } = await deleteTaskService(id);
if ( err ) {
  return res.status(err.status).json({ message: err.message })
}
return res.status(200).json({ message });
};

const getByIdTaskController = async (req, res) => {
 const { id } = req.params;

 const result = await getByIdTaskService(id);

 return res.status(200).json(result);
};

//FUNÇÃO PARA ATUALIZAR O CLIENTE
const updateTaskController = async(req, res) => {
  const { id } = req.params;
  
  const updateTask = await updateTaskService(id, req.body, {new:true})
  const {status, message} = updateTask;
  if (message) {
    return res.status(status).json(message)
  }
  return res.status(200).json(updateTask);
};

module.exports = {
	createTaskController,
  getAll,
  deleteTaskController,
  getByIdTaskController,
  updateTaskController
}