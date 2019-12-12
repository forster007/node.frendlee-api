import joi from '@hapi/joi';

export default joi.object({
  email: joi
    .string()
    .email()
    .required(),
  password: joi.string().required(),
});
