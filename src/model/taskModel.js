const { getConnection } = require('./connection');

const createTaskModel = async (task, time) => {
  const conn = await getConnection();
	const {insertedId: id} = await conn.collection('task').insertOne({ task, created_at:time });
	return id;
}

module.exports = {
	createTaskModel,
}