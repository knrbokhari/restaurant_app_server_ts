import Joi from 'joi';

const createOrder = Joi.object({
    clientId: Joi.string().max(30).required(),
    clientName: Joi.string().max(30).required(),
    orderIds: Joi.array().required(),
    totalPrice: Joi.number().max(30).required(),
    number: Joi.string().max(30).required(),
    status: Joi.string().max(30).required(),
});

export default { createOrder };