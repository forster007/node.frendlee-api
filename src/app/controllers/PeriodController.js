import { Period } from '../models';

class PeriodController {
  async index(req, res) {
    const periods = await Period.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      where: { enabled: true },
    });

    return res.json(periods);
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
