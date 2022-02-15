const res = require('express/lib/response');
const {
	createTaskService,
  //  getAllService,
} = require('../services/taskService');

const createTaskController = async (req, res) => {
  const response = await createTaskService(req.body);

  const { message, status } = response;

  if (message) {
    return res.status(status).json({ message });
  } 
  
	 return res.status(201).json( response );
};

// const getAllTaskController = async (req, res) => {
// const getTask = await getAllService();

// return res.status(200).json(getTask);
// }

module.exports = {
	createTaskController,
  // getAllTaskController
}