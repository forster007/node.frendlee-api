import { Period } from '../models';

class PeriodController {
  async index(req, res) {
    try {
      const { headers } = req;
      const periods = await Period.findAll({
        attributes: ['enabled', 'id', 'name', 'state'],
      }).map(period => {
        if (headers.account_type === 'administrator') {
          return period;
        }

        delete period.dataValues.enabled;
        return period;
      });

      return res.json(periods);
    } catch (e) {
      return res.json(e);
    }
  }

  async store(req, res) {
    const period = await Period.create(req.body);

    return res.json(period);
  }

  async update(req, res) {
    try {
      const { body, params } = req;
      const { id } = params;
      const period = await Period.findByPk(id, {
        attributes: ['id', 'state', 'name', 'enabled'],
      });

      await period.update(body);
      delete period.dataValues.updatedAt;

      return res.json(period);
    } catch (e) {
      return res.json(e);
    }
  }
}

export default new PeriodController();
