import joi from '@hapi/joi';

export default joi
  .object({
    date: joi.date().required(),
    provider_id: joi
      .number()
      .integer()
      .required(),
  })
  .required();
