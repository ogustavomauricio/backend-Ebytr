const { expect } = require('chai');
const sinon = require('sinon');

const taskService = require('../../services/taskService');
const taskModel = require('../../model/taskModel')

describe('Insert a new task on DB', () => {
	describe('When the informed payload is not valid', () => {
		it('Returns a message error when the "task" is not informed', async () => {
			const response = await taskService.createTaskService({task: '', status: 'pendente'});
			const { status, message } = response;


			expect(status).to.be.equal(400);
			expect(message).to.be.equal('O campo não pode estar vazio');
		});

		it('Returns a message error when the "status" is not informed', async () => {
			const response = await taskService.createTaskService({task: 'projeto EBYTR', status: ''});
			const { status, message } = response;


			expect(status).to.be.equal(400);
			expect(message).to.be.equal('O campo não pode estar vazio');
		});
	})

	describe('when the reported payloads are valid', () => {

		const taskPayload = {
			task: 'Project EBYTR',
			status: 'pendente',
		};


		before(() => {
      const ID_EXAMPLE = '604cb554311d68f491ba5781';

      sinon.stub(taskModel, 'createTaskModel')
        .resolves( { id: ID_EXAMPLE,...taskPayload } );
    });

    // Restauraremos a função `create` original após os testes.
    after(() => {
      taskModel.createTaskModel.restore();
    });

		it('Has an object', async () => {
			const response = await taskService.createTaskService({task: 'project', status: 'pendente'});		

      expect(response).to.be.a('object');
		});
		
		it('The object has an "id" property', async () => {
			const response = await taskService.createTaskService({task: 'project', status: 'pendente'});

      expect(response).to.be.have.a.property('id');
		});

		it('The object has an "status" property', async () => {
			const response = await taskService.createTaskService({task: 'project', status: 'pendente'});

      expect(response).to.be.have.a.property('status');
		});

		it('The object has an "task" property', async () => {
			const response = await taskService.createTaskService({task: 'project', status: 'pendente'});

      expect(response).to.be.have.a.property('task');
		});
	});
});
