const { expect } = require('chai');
const sinon = require('sinon');

/* vamos importar o MongoClient e o mock da conexão que criamos anteriormente. */
const { MongoClient } = require('mongodb');
const { getConnection } = require('./mongoMockConnection');

const taskModel = require('../../model/taskModel');

/* Vamos importar o módulo responsável para abrir a conexão nos nossos models para poder fazer o seu `double`.*/
const mongoConnection = require('../../model/connection');

describe('Insere uma nova tarefa no DB', () => {
  
	let connectionMock;
	const payloadTask = {
		task:'Tarefa 01',
	};
	
	/* Aqui colocamos o código para usar o banco montado pela lib `mongo-memory-server` */
	before(async () => {
		connectionMock = await getConnection();
		sinon.stub(MongoClient, 'connect').resolves(connectionMock);
	});

	/* Restauraremos a função `connect` original após os testes. */
	after(async () => {
		await connectionMock.db('EBTRY').collection('task').drop();
		MongoClient.connect.restore();
	});

	describe('quando é inserido com sucesso', () => {
		it('retorna um objeto', async () => {

			const response = await taskModel.createTaskModel(payloadTask);

			expect(response).to.be.a('object');   
		});

		it("Esse objeto possui a propriedade 'id'", async() => {
			const response = await taskModel.createTaskModel(payloadTask);

      expect(response).to.have.a.property('id');
		})
	})

})