const { Timestamp } = require('mongodb');
const {
	createTaskModel,
	taskModelGetAll
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

module.exports = {
	createTaskService,
	getAllService
}