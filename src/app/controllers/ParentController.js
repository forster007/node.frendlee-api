import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { Parent, User } from '../models';
import { TokenVerification } from '../schemas';
import SignUpMail from '../jobs/SignUpMail';
import isEmpty from '../../lib/Helpers';
import Queue from '../../lib/Queue';
import { authConfig } from '../../config';

const attributes = ['id', 'avatar', 'birthdate', 'gender', 'lastname', 'name', 'onesignal', 'phone_number', 'phone_number_is_whatsapp', 'picture_profile'];

class ParentController {
  async index(req, res) {
    try {
      const { headers } = req;
      const { account_type, id } = headers;

      switch (account_type) {
        case 'administrator': {
          const parent = await Parent.findAll({
            attributes,
            include: [{ as: 'user', model: User }],
          });

          return res.json(parent);
        }

        case 'parent': {
          const parent = await Parent.findByPk(id, {
            attributes,
            include: [{ as: 'user', model: User, attributes: ['email', 'status'] }],
          });

          return res.json(parent);
        }

        default: {
          return res.status(403).json({
            status: 'Access denied',
            success: false,
            message: 'Unauthorized access',
          });
        }
      }
    } catch (error) {
      return res.status(500).json({
        error: 'Internal server error',
      });
    }
  }

  async show(req, res) {
    try {
      const { headers, params } = req;
      const { account_type, id } = headers;

      switch (account_type) {
        case 'administrator': {
          const parent = await Parent.findByPk(id, {
            attributes,
            include: [{ as: 'user', model: User }],
          });

          return res.json(parent);
        }

        case 'parent': {
          if (Number(params.id) !== id) {
            return res.status(403).json({ status: 'Access denied', success: false, message: 'Unauthorized access' });
          }

          const parent = await Parent.findByPk(id, {
            attributes,
            include: [{ as: 'user', model: User, attributes: ['email', 'status'] }],
          });

          return res.json(parent);
        }

        default: {
          return res.status(403).json({
            status: 'Access denied',
            success: false,
            message: 'Unauthorized access',
          });
        }
      }
    } catch (error) {
      return res.status(500).json({
        error: 'Internal server error',
      });
    }
  }

  async store(req, res) {
    try {
      const { body } = req;

      const parent = await Parent.create(body, {
        include: [{ as: 'user', model: User }],
      });

      parent.dataValues.token = jwt.sign({ account_type: 'parent', id: parent.id }, authConfig.secret, { expiresIn: authConfig.expiresIn });

      const tokenVerification = await TokenVerification.create({
        user: parent.dataValues.user.id,
        token: crypto.randomBytes(16).toString('hex'),
      });

      await Queue.add(SignUpMail.key, {
        name: parent.dataValues.name,
        url: `${process.env.APP_URL}/confirmation?token=${tokenVerification.token}`,
        email: parent.dataValues.user.email,
      });

      return res.json(parent);
    } catch (error) {
      return res.status(500).json({
        error: 'Internal server error',
      });
    }
  }

  async update(req, res) {
    try {
      const { body, files, headers, params } = req;
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
}

export default new ParentController();
