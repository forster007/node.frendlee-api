import { Stuff } from '../models';

class StuffController {
  async index(req, res) {
    try {
      const { headers } = req;
      const stuffs = await Stuff.findAll({
        attributes: ['enabled', 'id', 'name', 'state'],
      }).map(stuff => {
        if (headers.account_type === 'administrator') {
          return stuff;
        }

        delete stuff.dataValues.enabled;
        return stuff;
      });

      return res.json(stuffs);
    } catch (e) {
      return res.json(e);
    }
  }

  async store(req, res) {
    const stuff = await Stuff.create(req.body);

    return res.json(stuff);
  }

  async update(req, res) {
    try {
      const { body, params } = req;
      const { id } = params;
      const stuff = await Stuff.findByPk(id, {
        attributes: ['id', 'state', 'name', 'enabled'],
      });

      await stuff.update(body);
      delete stuff.dataValues.updatedAt;

      return res.json(stuff);
    } catch (e) {
      return res.json(e);
    }
  }
}

export default new StuffController();
