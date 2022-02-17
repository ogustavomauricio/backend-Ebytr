const { Timestamp } = require('mongodb');
const {
	createTaskModel,
	taskModelGetAll,
	deleteTask,
	getByIdTask,
	updateTaskModel,
	verifyIdModel
} = require('../model/taskModel');

const { taskSchemas } = require('../schemas/validate');

const createTaskService = async (task) => {
	console.log('TASK', task);
	// const {error} = taskSchemas.validate(task);
	
	// if (error) return { status: 400, message: 'O campo não pode estar vazio'};

	const time = new Date();		
  const result = await createTaskModel(task, time);

	return result;
};

const getAllService = async () => {
	const task = await taskModelGetAll();

	return task;
}

const deleteTaskService = async (id) => {
	console.log(id);
	if (id.length !== 24) {
		return { err: { status:400, message: 'Wrong id format'}}
	}

	const result = await deleteTask(id);

	return result;
};

const getByIdTaskService = async (id) => {
const result = await getByIdTask(id);

return result;
};

//REQUISIÇÃO PARA ATUALIZAR CLIENTE
const updateTaskService = async (id, duties) => {
  console.log(id,duties);

    const verifyId = await verifyIdModel(id);
		// console.log(verifyId);
    if (!verifyId) return { status: 400, message: 'Cliente Não Existe'};
  
    const result =  await updateTaskModel(id, duties);

    return result
};

module.exports = {
	createTaskService,
	getAllService,
	deleteTaskService,
	getByIdTaskService,
	updateTaskService
}