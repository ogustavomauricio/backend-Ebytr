const sinon = require('sinon');
const { expect } = require('chai');

const { MongoClient } = require('mongodb');
const { getConnection } = require('./mongoMockConnection');

const taskModelCreate = require('../../model/taskModel');

describe('Insert a new task in DB', () => {
	let connectionMock;

	const newTask = {
		task: 'Projeto EBYTR',
		status: 'pendente',
	};

	before(async () => {
		connectionMock = await getConnection();
		sinon.stub(MongoClient, 'connect').resolves(connectionMock);
	})

	after(async () => {
		MongoClient.connect.restore();
	});


	describe('when is successefully inserted', () => {
		it('should return a object', async () => {
			const response = await taskModelCreate.createTaskModel(newTask);

			expect(response).to.be.a('object');
		});

		it('That should have an id', async () => {
			const response = await taskModelCreate.createTaskModel(newTask);

			expect(response).to.be.a.property('id');
		});

		it('That should have an status', async () => {
			const response = await taskModelCreate.createTaskModel(newTask);

			expect(response).to.be.a.property('status');
		})
	});	
});

