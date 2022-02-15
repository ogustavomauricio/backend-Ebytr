const { expect } = require('chai');
const sinon = require('sinon');

const taskService = require('../../services/taskService');
const taskModel = require('../../model/taskModel')

describe('Busca Tasks no Banco de Dados', () => {
	// before(async() => {
  
	// });
	describe('Quando não possui tarefas no Bando de Dados', () => {
		before(async() => {
     sinon.stub(taskModel, 'taskModelGetAll').resolves([]);
		});

		it('Retorna um array', async () => {
			const response = await taskService.getAllService();

			expect(response).to.be.a('array');
		});
		it('O array deve estar vazio', async () =>{
			const response = await taskService.getAllService();
      
			expect(response).to.be.empty;
		});		
	});
	// describe('Quando o payload informado é válido', () => {
	// 	const taskPayload = 'Tarefa 01';
	// 	before(() => {
  //     const ID_EXAMPLE = '604cb554311d68f491ba5781';

  //     sinon.stub(taskModel, 'createTaskModel')
  //       .resolves( { id: ID_EXAMPLE } );
  //   });

  //   // Restauraremos a função `create` original após os testes.
  //   after(() => {
  //     taskModel.createTaskModel.restore();
  //   });

	// 	it('Possui um objeto', async () => {
	// 		const response = await taskService.createTaskService(taskPayload);
	// 		console.log('RESPONSEEEE ',response);

  //     expect(response).to.be.a('object');
	// 	});
		// it('Espera que esse objeto tenha um id', async () => {
		// 	// ESTÁ RECENDO O OBJETO COM STATUS E MESSAGE DO ERROR. E NÃO O OBJETO COM ID
		// 	const response = await taskService.createTaskService(taskPayload);
			

    //   expect(response).to.be.equal('604cb554311d68f491ba5781');
		// });
	// })

});