const { getConnection } = require('./connection');
const { ObjectId } = require('mongodb')


const createTaskModel = async (payload, time) => {
	console.log('MODEL', payload);
  const conn = await getConnection();
  const { task, status } = payload;
	const {insertedId: id } = await conn.collection('task').insertOne({ task, created_at:time, status });
	
	return { id, status, task };
};

const taskModelGetAll = async () => {
  const conn = await getConnection();
  const query = await conn.collection('task').find({}).toArray();
//   console.log(query);
	return query;
};

const deleteTask = async (id) => {
	const conn = await getConnection();
	await conn.collection('task').deleteOne({ _id: ObjectId(id)});

	return { message: 'Task excluida com sucesso'};
};

const getByIdTask = async (id) => {
	console.log('MODEL', id);
	const conn = await getConnection();
	const response = await conn.collection('task').findOne({ _id: ObjectId(id)});
console.log(response);
	return response;
}

module.exports = {
	createTaskModel,
	taskModelGetAll,
	deleteTask,
	getByIdTask,
}