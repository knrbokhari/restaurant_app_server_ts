import Joi from 'joi';

const createProduct = Joi.object({
    name: Joi.string().max(30).required(),
    price: Joi.string().max(30).required(),
    discription: Joi.string().max(255).required(),
    stock_out: Joi.boolean().required(),
    discount: Joi.number().max(30).required(),
    time: Joi.string().max(30).required(),
    size: Joi.string().max(30).required(),
    image: Joi.array().required(),
});

const updateProduct = Joi.object({
    _id: Joi.string(),
    name: Joi.string().max(30).required(),
    price: Joi.string().max(30).required(),
    discription: Joi.string().max(255).required(),
    stock_out: Joi.boolean().required(),
    discount: Joi.number().max(30).required(),
    time: Joi.string().max(30).required(),
    size: Joi.string().max(30).required(),
    image: Joi.array().required(),
});

export default { createProduct, updateProduct };