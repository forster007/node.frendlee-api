import { Service } from '../models';

class AppointmentController {
  async index(req, res) {
    try {
      const services = await Service.findAll({
        where: { enabled: true },
      });

      return res.json(services);
    } catch (e) {
      console.log(e);
      return res.status(e.status || 400).json({
        error: e.message || 'Service already exists',
      });
    }
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
