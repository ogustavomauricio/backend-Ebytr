const {
	createTaskService,
} = require('../services/taskService');

const createTaskController = async (req, res) => {
  const response = await createTaskService(req.body);
  if (response.message) {
return res.status(response.status).json({ message: response.message })
  } 
	 return res.status(201).json({ response });
};

module.exports = {
	createTaskController,
}