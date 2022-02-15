const { expect } = require('chai');
const sinon = require('sinon');

/* vamos importar o MongoClient e o mock da conexão que criamos anteriormente. */
const { MongoClient } = require('mongodb');
const {getConnection} = require('./mongoMockConnection');


const taskModel = require('../../model/taskModel');

describe('List all task', () => {

  describe('when the task list is empty', async () => {
    let connectionMock;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    });


    after(async () => {
      MongoClient.connect.restore();
    });

    it('should return an array', async () => {
      const list = await taskModel.taskModelGetAll();

      expect(list).to.be.an('array');
    });

    it('that is empty', async () => {
    const list = await taskModel.taskModelGetAll();

    expect(list).to.be.empty;
    })

  });

  describe('when the task list is not empty', async () => {
    const newProd = { task: 'product1', status: 'pendente'};

    let connectionMock;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    });


    after(() => {
      MongoClient.connect.restore();
    });

    it('should return an array', async () => {
      await connectionMock.db('EBTRY').collection('task').insertOne(newProd)
      const list = await taskModel.taskModelGetAll();

      expect(list).to.be.an('array');
    });

    it('that is not empty', async () => {
      const list = await taskModel.taskModelGetAll();

      expect(list).to.be.not.empty;
    });

  });
});