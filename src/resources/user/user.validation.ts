import Joi from 'joi';

const register = Joi.object({
    first_name: Joi.string().max(30).required(),
    last_name: Joi.string().max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().max(30).required(),
    phone: Joi.string().max(30),
    address: Joi.string().max(30),
    orders: Joi.array(),
});

const login = Joi.object({
    email: Joi.string().required(),

    password: Joi.string().required(),
});

export default { register, login };