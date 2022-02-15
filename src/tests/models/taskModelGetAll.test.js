const { expect } = require('chai');
const sinon = require('sinon');

/* vamos importar o MongoClient e o mock da conexão que criamos anteriormente. */
const { MongoClient } = require('mongodb');
const mongoConnection = require('./mongoMockConnection');


const taskModel = require('../../model/taskModel');
const { beforeEach, afterEach } = require('mocha');


describe('BUSCA AS TASK NO BANCO DE DADO', () => {
	let connectionMock;

	beforeEach(async() => {
		console.log('antes do teste');
	  connectionMock = await mongoConnection.getConnection();   
		  sinon.stub(MongoClient, 'connect').resolves(connectionMock);
	});
  
	  afterEach(async() => {
		console.log('acabou o teste');
	  MongoClient.connect.restore();
	});

  describe('QUANDO NÃO EXISTE NENHUMA TASK CRIADA', () => {	
  	it('RETORNA UM ARRAY', async () => {
			const response = await taskModel.taskModelGetAll();

			expect(response).to.be.an('array');
	  });

		it('O ARRAY É VAZIO', async () => {
			const response = await taskModel.taskModelGetAll();

			expect(response).to.be.empty;
	  });
	});

	describe('QUANDO EXISTIR TAREFAS CRIADAS', () => {
		before(async () => {
			console.log('TESTE 2');
      const taskCollection = await connectionMock;
      await taskCollection.db('EBTRY').collection('task').insertOne({ task: 'tarefa 55' });
    });

		after(async() => {
			console.log('ACABOU O TESTE 2');

        await connectionMock.db('EBTRY').collection('task').drop();
    });
		it('Retorna um Array', async () => {		
		  const getTask = await taskModel.taskModelGetAll();
			

			expect(getTask).to.be.an('array');
		});

		it('O array não pode estar vazio', async () => {
			const task = await taskModel.taskModelGetAll();

			expect(task).to.be.not.empty;
		});	
	});
});