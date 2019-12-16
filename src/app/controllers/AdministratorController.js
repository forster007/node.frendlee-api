import { Administrator, User } from '../models';

class ProviderController {
  async store(req, res) {
    try {
      const administrator = await Administrator.create(req.body, {
        include: [{ as: 'user', model: User }],
      });

      return res.json(administrator);
    } catch (e) {
      console.log(e);
      return res.json(e);
    }
  }
}

export default new ProviderController();
