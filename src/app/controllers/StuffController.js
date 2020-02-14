import { Stuff } from '../models';

class StuffController {
  async index(req, res) {
    const stuffs = await Stuff.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      where: { enabled: true },
    });

    return res.json(stuffs);
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
