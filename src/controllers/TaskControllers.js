const {
	createTaskService,
} = require('../services/taskService');

const createTaskController = async (req, res) => {
  const task = await createTaskService(req.body);

	return res.status(201).json({ task });
};

module.exports = {
	createTaskController,
}