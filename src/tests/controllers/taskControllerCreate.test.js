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

describe('When calling the taskCreateController', () => {
  describe('When the payload report is not valid', () => {
		const res = {};
		const req = {};

		before(() => {
			req.body = {};

			res.status = sinon.stub().returns(res);
			res.json = sinon.stub().returns();

			sinon.stub(taskService,'createTaskService').resolves({ status: 'status', message:'message' })
		});

		after(() => {
			taskService.createTaskService.restore();
		});

		it('when task is not sent return request with code "400"', async() => {

			req.body = { task: '', status: 'pendente'};
			await taskController.createTaskController(req, res);

			expect(res.status.calledWith(400)).to.be.equal(true);
		});

		it('The json calling with message "O campo não pode estar vazio"', async() => {
			await taskController.createTaskController(req, res);

			expect(res.json.calledWith({ message: 'O campo não pode estar vazio'})).to.be.equal(true);
		});
	});

	describe('When it is successfully entered', () => {
		const res = {};
		const req = {};

		before(() => {
			req.body = {
				task: "Tarefa 01",
				status: 'pendente',
			};

			res.status = sinon.stub().returns(res);
			res.json = sinon.stub().returns();

			sinon
			.stub(taskService, 'createTaskService')
			.resolves({id:'154545454', task: 'Tarefa 01', status: 'pendente'});
		});

		after(() => {
			taskService.createTaskService.restore();
		});

		it('is called with status "201"?', async () => {
			await taskController.createTaskController(req,res);
console.log(res.status);
			expect(res.status.calledWith(201)).to.be.equal(true);
		});
	 });
});