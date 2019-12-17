import { Stuff } from '../models';

class StuffController {
  async store(req, res) {
    const stuff = await Stuff.create(req.body);

    return res.json(stuff);
  }
}

export default new StuffController();
