import Joi from 'joi';

const register = Joi.object({
    first_name: Joi.string().max(30).required(),
    last_name: Joi.string().max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string(),
    phone: Joi.string(),
    address: Joi.string(),
    orders: Joi.array(),
});

const login = Joi.object({
    email: Joi.string().email().required(),

    password: Joi.string().required(),
});

export default { register, login };