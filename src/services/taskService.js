const {
	createTask,
} = require('../model/taskModel');

const createTaskService = async (task) => {
  const task = await createTask(task);

	return task;
};

module.exports = {
	createTaskService,
}