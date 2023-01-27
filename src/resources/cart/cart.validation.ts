import Joi from 'joi';

const createCart = Joi.object({
    clientId: Joi.string().max(30).required(),
    productId: Joi.string().max(30).required(),
    price: Joi.number().required(),
    quantity: Joi.number(),
    order: Joi.boolean()
});

export default { createCart };