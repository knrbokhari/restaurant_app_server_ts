import Joi from 'joi';

const createReview = Joi.object({
    name: Joi.string().max(30).required(),
    email: Joi.string().max(30).required(),
    review: Joi.string().max(255).required(),
    rating: Joi.string().required(),
});

const updateReview = Joi.object({
    _id: Joi.string(),
    review: Joi.string().max(255).required(),
    rating: Joi.string().required(),
});

export default { createReview, updateReview };