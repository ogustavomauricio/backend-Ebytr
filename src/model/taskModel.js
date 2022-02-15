const { getConnection } = require('./connection');

const createTaskModel = async (task, time) => {
  const conn = await getConnection();
	const {insertedId: id} = await conn.collection('task').insertOne({ task, created_at:time });
	
	return id;
};

const taskModelGetAll = async () => {
  const conn = await getConnection();
  const query = await conn.collection('task').find({}).toArray();
  console.log(query);
	return query;
}

module.exports = {
	createTaskModel,
	taskModelGetAll,
}