import { Service } from '../models';

class AppointmentController {
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
