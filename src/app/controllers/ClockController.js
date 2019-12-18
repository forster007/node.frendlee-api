import { Clock } from '../models';

class ClockController {
  async index(req, res) {
    const clocks = await Clock.findAll({
      attributes: ['id', 'name', 'state'],
    });

    return res.json(clocks);
  }

  async store(req, res) {
    const clock = await Clock.create(req.body);

    return res.json(clock);
  }

  async update(req, res) {
    return res.json(req.body);
  }
}

export default new ClockController();
