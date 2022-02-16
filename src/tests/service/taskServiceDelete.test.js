const { expect } = require('chai');
const sinon = require('sinon');

const taskService = require('../../services/taskService');
const taskModel = require('../../model/taskModel');

describe('Delete a task by ID', () => {
  const ID_EXAMPLE = '604cb554311d68f491ba5781';
  const fakeId = '11aa1111aa11a1111a1111a1';
  

	describe('Is not possible when', () => {
	before(() => {
		sinon.stub(taskModel, 'deleteTask').resolves(null);
	});

	after(() => {
		taskModel.deleteTask.restore();
	});

	it('The id is invalid', async() =>{
		const response = await taskService.deleteTaskService('12345');		

		const { status, message } = response;

		expect(status).to.be.equal(400);
		expect(message).to.be.equal('Wrong id format')
	});

	// it('There is no task with the id', async () => {
	// 	const response = await taskService.deleteTaskService(fakeId);

	// 	//PRECISO FAZER O GETBYID ANTES DE VALIDAR ESTE TESTE
	// })
});

  describe('When the product is successfully deleted', async () => { 
		const taskMessage = { message: 'Task excluida com succeso'};

		before(() => {
			sinon.stub(taskModel, 'deleteTask').resolves(taskMessage);
		});

		after(() => {
			taskModel.deleteTask.restore();
		});

		it('return an object', async () => {
			const response = await taskService.deleteTaskService(ID_EXAMPLE);
			
			expect(response).to.be.an('object');
		});


		it('This object has a property message', async () => {
			const response = await taskService.deleteTaskService(ID_EXAMPLE);
			
			expect(response).to.be.a.property('message');
		});

		it('This property have a message "Task excluida com sucesso" ', async () => {
			const response = await taskService.deleteTaskService(ID_EXAMPLE);
			const { message } = response;
			expect(message).to.be.equals('Task excluida com sucesso');
		});






	})
	


})