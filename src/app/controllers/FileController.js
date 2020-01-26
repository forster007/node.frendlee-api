import { Customer } from '../models';
import isEmpty from '../../lib/Helpers';

class FileController {
  async store(req, res) {
    try {
      const { files, headers } = req;
      const { picture_profile } = files;

      const { id } = headers;
      const customer = await Customer.findByPk(id);
      const body = {};

      if (!isEmpty(picture_profile)) {
        body.picture_profile = picture_profile[0].filename;
      }

      await customer.update(body);

      return res.json(customer);
    } catch (e) {
      return res.status(e.status || 400).json({
        error: e.message || 'Internal server error',
      });
    }
  }
}

export default new FileController();
