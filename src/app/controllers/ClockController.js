import { Clock } from '../models';

class ClockController {
  async index(req, res) {
    try {
      const { headers } = req;
      const clocks = await Clock.findAll({
        attributes: ['enabled', 'id', 'name', 'state'],
      }).map(clock => {
        if (headers.account_type === 'administrator') {
          return clock;
        }

        delete clock.dataValues.enabled;
        return clock;
      });

      return res.json(clocks);
    } catch (e) {
      return res.json(e);
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
