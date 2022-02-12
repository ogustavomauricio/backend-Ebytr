const connection = require('./connection');

const createTask = async (task) => {
  const conn = await connection();
	const query = await conn.collection('task').insertOne({ task });

	return query;
}

module.exports = {
	createTask,
}