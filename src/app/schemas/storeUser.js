import joi from '@hapi/joi';

export default joi.object({
  email: joi
    .string()
    .email()
    .required(),
  name: joi.string().required(),
  password: joi
    .string()
    .min(6)
    .required(),
  provider: joi.bool(),
});
