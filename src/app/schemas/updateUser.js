import joi from '@hapi/joi';

export default joi.object({
  avatar_id: joi.number(),
  email: joi.string().email(),
  name: joi.string(),
  oldPassword: joi.string().min(6),
  password: joi.when('oldPassword', {
    is: joi.string(),
    then: joi.string().min(6),
    otherwise: joi.any().forbidden(),
  }),
  provider: joi.bool(),
});
