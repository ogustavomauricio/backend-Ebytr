const { expect } = require('chai');
const sinon = require('sinon');

const taskService = require('../../services/taskService');
const taskModel = require('../../model/taskModel')

describe('List all task', () => {
	describe('when the task list is empty', async () => {
		
	  before(async () => {
		sinon.stub(taskModel, 'taskModelGetAll')
		  .resolves([]);
	  });  
  
	  after(async () => {
		taskModel.taskModelGetAll.restore();
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
});