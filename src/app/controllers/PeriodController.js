import { Period } from '../models';

class PeriodController {
  async store(req, res) {
    const period = await Period.create(req.body);

    return res.json(period);
  }
}

export default new PeriodController();
