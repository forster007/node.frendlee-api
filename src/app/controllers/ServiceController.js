import { Service } from '../models';

class AppointmentController {
  async index(req, res) {
    const services = await Service.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      where: { enabled: true },
    });

    return res.json(services);
  }

  async store(req, res) {
    try {
      const service = await Service.create(req.body);

      return res.json(service);
    } catch (e) {
      return res.status(e.status || 400).json({
        error: e.message || 'Service already exists',
      });
    }
  }
}

export default new AppointmentController();
