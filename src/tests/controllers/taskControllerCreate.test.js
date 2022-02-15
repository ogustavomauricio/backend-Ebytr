const sinon = require('sinon');
const { expect } = require('chai');
const taskController = require('../../controllers/taskControllers');
const taskService = require('../../services/taskService');

// 1 - Quando o payload informado não é válido:
// Retornar o código de status 400 - Bad Request ;
// Retornar a mensagem Dados inválidos .

// 2 - Quando o payload informado é válido:
// Retornar o código de status 201 - Created ;
// Retornar a mensagem Filme criado com sucesso! .

describe('Ao chamar o taskCreateController', () => {
  describe('Quando o payload informado não é válido', () => {
		const res = {};
		const req = {};

		before(() => {
			req.body = {};

			res.status = sinon.stub().returns(res);
			res.json = sinon.stub().returns();
		});

		after(() => {
			taskService.createTaskService.restore();
		});

		it('é chamado o status com o código 400', async() => {
			await taskController.createTaskController(req, res);

			expect(res.status.calledWith(400)).to.be.equal(true);
		});

		it('O json é chamado com a messagem "O campo não pode estar vazio"', async() => {
			await taskController.createTaskController(req, res);

			expect(res.json.calledWith({ message: 'O campo não pode estar vazio'})).to.be.equal(true);
		});
	});

	describe('Quando é inserido com sucesso', () => {
		const res = {};
		const req = {};

		before(() => {
			req.body = {
				task: "Tarefa 01",
			};

			res.status = sinon.stub().returns(res);
			res.json = sinon.stub().returns();
		});

		after(() => {
			taskService.createTaskService.restore();
		});

		it('É chamado com o status 201', async() => {
			await taskController.createTaskController(req,res);

			expect(res.status.calledWith(201)).to.be.equal(true);
		});

	// 	it('O json é chamado com o ID criado', async () => {
	// 		await taskController.createTaskController(req, res);

	// 		expect(res.json.calledWith({ message: ID_RESULT })).to.be.equal(true);
	// 	})
	 })
})