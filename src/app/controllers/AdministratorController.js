import { Administrator, User } from '../models';

const attributes = [
  'id',
  'birthdate',
  'gender',
  'lastname',
  'name',
  'phone_number',
  'phone_number_is_whatsapp',
  'picture_profile',
  'ssn',
];

const userInclude = {
  as: 'user',
  attributes: ['email'],
  model: User,
};

class AdministratorController {
  async index(req, res) {
    try {
      const administrators = await Administrator.findAll({
        attributes,
        include: [userInclude],
      });

      return res.json(administrators);
    } catch (e) {
      return res.json(e);
    }
  }

  async store(req, res) {
    try {
      const { body } = req;
      const administrator = await Administrator.create(body, {
        include: [userInclude],
      });

      return res.json(administrator);
    } catch (e) {
      return res.json(e);
    }
  }

  async update(req, res) {
    try {
      const { body, headers, params } = req;
      const id = params.id || headers.id;
      const administrator = await Administrator.findByPk(id);

      await administrator.update(body);

      const updated = await Administrator.findByPk(id, {
        attributes,
        include: [userInclude],
      });

      return res.json(updated);
    } catch (e) {
      return res.json(e);
    }
  }
}

export default new AdministratorController();
