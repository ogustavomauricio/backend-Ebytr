const { getConnection } = require('./connection');

const createTaskModel = async (payload, time) => {
  const conn = await getConnection();
  const { task, status } = payload;
	const {insertedId: id } = await conn.collection('task').insertOne({ task, created_at:time, status });
	
	return { id, status, task };
};

// const taskModelGetAll = async () => {
//   const conn = await getConnection();
//   const query = await conn.collection('task').find({}).toArray();
// //   console.log(query);
// 	return query;
// }

module.exports = {
	createTaskModel,
	// taskModelGetAll,
}