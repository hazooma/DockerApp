import * as Joi from 'joi'

export const createMovie: Joi.SchemaMap = {
  name: Joi.string()
    .trim()
    .required(),
    description: Joi.string()
    .trim()
    .required(),
   
}


