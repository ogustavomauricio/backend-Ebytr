const sinon = require('sinon');
const { expect } = require('chai');
const taskController = require('../../controllers/taskControllers');
const taskService = require('../../services/taskService');

describe('CONTROLLER 2 - When calls the controller of getAll', () => {
  describe('When the product list is empty', () => {
    const response = {};
    const request = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(taskService, 'getAllService')
        .resolves([]);
    });

    after(() => {
      taskService.getAllService.restore();
    });

    it('its called with a status code 200', async () => {
      await taskController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('its called a json with an object ', async () => {
      await taskController.getAll(request, response);
      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });

    it('its called a json with a propery products and a empty array', async () => {
      await taskController.getAll(request, response);
			console.log(response.json);
      expect(response.json.calledWith({ task: []})).to.be.equal(true);
    });
  });
});

describe('When the product list is not empty', () => {
	const response = {};
	const request = {};
	const ID_EXAMPLE = '604cb554311d68f491ba5781';
	const task = { _id: ID_EXAMPLE, task: 'product', status: 'feito'}

	before(() => {
		response.status = sinon.stub().returns(response);
		response.json = sinon.stub().returns();

		sinon.stub(taskService, 'getAllService')
			.resolves([task]);
	});

	after(() => {
		taskService.getAllService.restore();
	});

	it('its called with a status code 200', async () => {
		await taskController.getAll(request, response);
		expect(response.status.calledWith(200)).to.be.equal(true);
	});

	it('its called a json with an object ', async () => {
		await taskController.getAll(request, response);
		expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
	});

	it('its called a json with a propery products and a empty array', async () => {
		await taskController.getAll(request, response);
		expect(response.json.calledWith({ task: [task]})).to.be.equal(true);
	});
});

// describe('When calls the controller of getAll', () => {
// 	describe('When the task list is empty', () => {
// 		const res = {};
// 		const req = {};

// 		before(() => {
// 			res.status = sinon.stub().returns(res);
// 			res.json = sinon.stub().returns();

// 			sinon.stub(taskService, 'getAllService').resolves([]);
// 		});

// 		after(() => {
// 			taskService.getAll.restore();
// 		});


// 		it('its called with a status code 200', async () => {
// 			await taskController.getAll(req, res);

// 			expect(res.status.calledWith(200)).to.be.equal(true)
// 		});


// 		it('its called a json with an object', async () => {
// 			await taskController.getAll(req,res);
			
// 			expect(res.json.calledWith(sinon.match.object)).to.be.equal(true);
// 		});

// 	});
// });