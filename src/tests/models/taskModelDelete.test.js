const sinon = require('sinon');
const { expect } = require('chai');

const { MongoClient } = require('mongodb');
const { getConnection } = require('./mongoMockConnection');

const taskModel = require('../../model/taskModel');

describe('Delete a task by ID', () => {
	const task = { task: 'project', status:'pendente'};

	let connectionMock;
	const fakeId = '11aa1111aa11a1111a1111a1';

	before(async () => {
		connectionMock = await getConnection();
		sinon.stub(MongoClient, 'connect').resolves(connectionMock);
	});

	after(async () => {
		MongoClient.connect.restore();
	});

	describe('When is successfully deleted', () => {
		it('Should return object', async() => {
			const {_id} = await taskModel.createTaskModel(task);

			const result = await taskModel.deleteTask(_id);

			expect(result).to.be.an('object');
		});

		it('Should return a property message', async() => {
			const {_id} = await taskModel.createTaskModel(task);

			const result = await taskModel.deleteTask(_id);

			expect(result).to.be.a.property('message');
		});
		it('Should return a message', async() => {
			const {_id} = await taskModel.createTaskModel(task);

			const result = await taskModel.deleteTask(_id);
			const { message } = result;

			expect(message).to.be.equal('Task excluida com sucesso');
		});
	})







})