import { Customer, Parent, Provider } from '../models';
import isEmpty from '../../lib/Helpers';

class FileController {
  async storeCustomer(req, res) {
    try {
      const { files, headers, params } = req;
      const { picture_profile } = files;
      const { id } = headers;

      if (Number(params.id) !== id) {
        return res.status(403).json({
          status: 'Access denied',
          success: false,
          message: 'Unauthorized access',
        });
      }

      const customer = await Customer.findByPk(id);
      const body = {};

      if (!isEmpty(picture_profile)) {
        body.picture_profile = picture_profile[0].filename;
      }

      await customer.update(body);

      return res.json(customer);
    } catch (error) {
      return res.status(500).json({
        error: 'Internal server error',
      });
    }
  }

  async storeParent(req, res) {
    try {
      const { files, headers, params } = req;
      const { picture_profile } = files;
      const { id } = headers;

      if (Number(params.id) !== id) {
        return res.status(403).json({
          status: 'Access denied',
          success: false,
          message: 'Unauthorized access',
        });
      }

      const parent = await Parent.findByPk(id);
      const body = {};

      if (!isEmpty(picture_profile)) {
        body.picture_profile = picture_profile[0].filename;
      }

      await parent.update(body);

      return res.json(parent);
    } catch (error) {
      return res.status(500).json({
        error: 'Internal server error',
      });
    }
  }

  async storeProvider(req, res) {
    try {
      const { files, headers, params } = req;
      const { picture_address, picture_certification, picture_license, picture_profile } = files;
      const { id } = headers;

      if (Number(params.id) !== id) {
        return res.status(403).json({
          status: 'Access denied',
          success: false,
          message: 'Unauthorized access',
        });
      }

      const provider = await Provider.findByPk(id);
      const body = {};

      if (!isEmpty(picture_address)) {
        body.picture_address = picture_address[0].filename;
      }

      if (!isEmpty(picture_certification)) {
        body.picture_certification = picture_certification[0].filename;
      }

      if (!isEmpty(picture_license)) {
        body.picture_license = picture_license[0].filename;
      }

      if (!isEmpty(picture_profile)) {
        body.picture_profile = picture_profile[0].filename;
      }

      await provider.update(body);

      return res.json(provider);
    } catch (error) {
      return res.status(500).json({
        error: 'Internal server error',
      });
    }
  }
}

export default new FileController();
