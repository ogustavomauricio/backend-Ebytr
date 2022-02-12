const { Timestamp } = require('mongodb');
const {
	createTaskModel,
} = require('../model/taskModel');

const createTaskService = async (task) => {
	const time = new Date()
		// console.log(mydate2);
  const createTask = await createTaskModel(task, time);

	return createTask;
};

module.exports = {
	createTaskService,
}