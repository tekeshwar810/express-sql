const Joi = require('joi');

const companeyUserSchema = Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string().email(),
    address: Joi.string().allow(''),
    image: Joi.string().allow(''),
});

const addCompaneyValidation = Joi.object({
    companeyName: Joi.string().required(),
    companeyEmail: Joi.string().email().required(),
    companeyPhone: Joi.string().required(),
    companeyAddress: Joi.string().required(),
    companeyUsers: Joi.array().items(companeyUserSchema).min(1).required(),
    companeyDoc: Joi.string().required(),
}).required();

const updateCompaneyValidation = Joi.object({
    companeyName: Joi.string().optional(),
    companeyEmail: Joi.string().email().optional(),
    companeyPhone: Joi.string().optional(),
    companeyAddress: Joi.string().optional(),
    companeyDoc: Joi.string().optional(),
    companeyUsers: Joi.array().items(companeyUserSchema).optional(),
})

module.exports = { addCompaneyValidation, updateCompaneyValidation };
