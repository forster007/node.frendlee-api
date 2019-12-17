import { Period } from '../models';

class PeriodController {
  async index(req, res) {
    const periods = await Period.findAll({
      attributes: ['id', 'name', 'state'],
    });

    return res.json(periods);
  }

  async store(req, res) {
    const period = await Period.create(req.body);

    return res.json(period);
  }
}

export default new PeriodController();
