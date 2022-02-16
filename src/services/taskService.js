const { Timestamp } = require('mongodb');
const {
	createTaskModel,
	taskModelGetAll,
	deleteTask
} = require('../model/taskModel');

const { taskSchemas } = require('../schemas/validate');

const createTaskService = async (task) => {	
	const {error} = taskSchemas.validate(task);
	
	if (error) return { status: 400, message: 'O campo não pode estar vazio'};

	const time = new Date();		
  const result = await createTaskModel(task, time);

	return result;
};

const getAllService = async () => {
	const task = await taskModelGetAll();

	return task;
}

const deleteTaskService = async (id) => {
	if (id.length !== 24) return { status:400, message: 'Wrong id format'}

	const result = await deleteTask(id);

	return result;
}

module.exports = {
	createTaskService,
	getAllService,
	deleteTaskService
}