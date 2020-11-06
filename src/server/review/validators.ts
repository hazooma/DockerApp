import * as Joi from 'joi'



export const createReview: Joi.SchemaMap = {
  content: Joi.string().required(),
  movie_id: Joi.number().required()
}
