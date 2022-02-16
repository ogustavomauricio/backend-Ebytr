const sinon = require('sinon');
const { expect } = require('chai');
const taskController = require('../../controllers/taskControllers');
const taskService = require('../../services/taskService');

describe('When calls the controller of delete', () => {
	//id com menos de 24 caracteres para parar no erro
	const fakeIdMenor = '11aa1111aa11a1111a11';

  describe('With an invalid input', () => {
  	const req = {};
	  const res = {};
	
	before(() => {
		res.status = sinon.stub().returns(res);
		res.json = sinon.stub().returns();

		sinon.stub(taskService, 'deleteTaskService').resolves({
			message: 'message'
		});	
	});

	after(() => {
		taskService.deleteTaskService.restore();
	});
  
	it(' id is invalid', async () => {
		req.params = {id: fakeIdMenor}
		await taskController.deleteTaskController(req, res);

		expect(res.status.calledWith(400)).to.be.equal(true);
	});
 });

	describe('with a valid input', () => {
		const fakeId = '11aa1111aa11a1111a1111a1';
		const res = {};
		const req = {};

		before(() => {
			req.params = { id:fakeId }

			res.status = sinon.stub().returns(res);
			res.json = sinon.stub().returns();

			sinon.stub(taskService, 'deleteTaskService').resolves({ message: 'message'})
		});

		after(() => {
			taskService.deleteTaskService.restore();
		});

		it('its called with a status code 200', async () => {
			await taskController.deleteTaskController(req, res);

			expect(res.status.calledWith(200)).to.be.equal(true);
		});
	});
});
