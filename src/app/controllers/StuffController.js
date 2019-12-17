import { Stuff } from '../models';

class StuffController {
  async index(req, res) {
    const stuffs = await Stuff.findAll({
      attributes: ['id', 'name', 'state'],
    });

    return res.json(stuffs);
  }

  async store(req, res) {
    const stuff = await Stuff.create(req.body);

    return res.json(stuff);
  }
}

export default new StuffController();
