const Joi = require('joi');

const taskSchemas = Joi.object({
task: Joi.string().required(),
status: Joi.string().required(),
})
 


module.exports = {
    taskSchemas,
}