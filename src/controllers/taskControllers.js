const res = require('express/lib/response');
const {
	createTaskService,
   getAllService,
   deleteTaskService
} = require('../services/taskService');

const createTaskController = async (req, res) => {
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
}

module.exports = {
	createTaskController,
  getAll,
  deleteTaskController,
}