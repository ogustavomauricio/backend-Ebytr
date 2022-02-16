const { getConnection } = require('./connection');
const { ObjectId } = require('mongodb')


const createTaskModel = async (payload, time) => {
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

module.exports = {
	createTaskModel,
	taskModelGetAll,
	deleteTask,
}