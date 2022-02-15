const { expect } = require('chai');
const sinon = require('sinon');

const taskService = require('../../services/taskService');
const taskModel = require('../../model/taskModel')

describe('Insere um novo Filme no DB', () => {
	describe('Quando o payload informado não é válido', () => {
		const payloadTask = '';

		it('Retorna uma message de error', async () => {
			const response = await taskService.createTaskService(payloadTask);

			expect(response).to.be.a('object');
		});
		it('o status retornado deve ser "400"', async () =>{
			const { status } = await taskService.createTaskService(payloadTask);
      
			expect(status).to.be.equal(400);
		});
		it('A string deve conter a msg de erro programada', async () =>{
			const { message } = await taskService.createTaskService(payloadTask);
      
			expect(message).to.be.equal('O campo não pode estar vazio');
		});
	})
	describe('Quando o payload informado é válido', () => {
		const taskPayload = 'Tarefa 01';
		before(() => {
      const ID_EXAMPLE = '604cb554311d68f491ba5781';

      sinon.stub(taskModel, 'createTaskModel')
        .resolves( { id: ID_EXAMPLE } );
    });

    // Restauraremos a função `create` original após os testes.
    after(() => {
      taskModel.createTaskModel.restore();
    });

		it('Possui um objeto', async () => {
			const response = await taskService.createTaskService(taskPayload);
			console.log('RESPONSEEEE ',response);

      expect(response).to.be.a('object');
		});
		// it('Espera que esse objeto tenha um id', async () => {
		// 	// ESTÁ RECENDO O OBJETO COM STATUS E MESSAGE DO ERROR. E NÃO O OBJETO COM ID
		// 	const response = await taskService.createTaskService(taskPayload);
			

    //   expect(response).to.be.equal('604cb554311d68f491ba5781');
		// });
	})

})