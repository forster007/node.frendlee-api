import { Clock } from '../models';

const attributes = ['id', 'name', 'state'];

class ClockController {
  async index(req, res) {
    const { account_type } = req.headers;

    switch (account_type) {
      case 'administrator': {
        attributes.push('enabled');

        const clocks = await Clock.findAll({ attributes });
        return res.json(clocks);
      }

      default: {
        const clocks = await Clock.findAll({
          attributes,
          where: { enabled: true },
        });
        return res.json(clocks);
      }
    }
  }

  async store(req, res) {
    const clock = await Clock.create(req.body);

    return res.json(clock);
  }

  async update(req, res) {
    try {
      const { body, params } = req;
      const { id } = params;
      const clock = await Clock.findByPk(id, {
        attributes: ['id', 'state', 'name', 'enabled'],
      });

      await clock.update(body);
      delete clock.dataValues.updatedAt;

      return res.json(clock);
    } catch (e) {
      return res.json(e);
    }
  }
}

export default new ClockController();
