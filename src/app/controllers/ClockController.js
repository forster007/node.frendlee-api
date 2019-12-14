import { Clock } from '../models';

class ClockController {
  async store(req, res) {
    const clock = await Clock.create(req.body);

    return res.json(clock);
  }
}

export default new ClockController();
