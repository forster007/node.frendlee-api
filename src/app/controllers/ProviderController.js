import { File, Service, User, UsersServices } from '../models';

class ProviderController {
  async index(req, res) {
    const providers = await User.findAll({
      attributes: ['avatar_id', 'email', 'id', 'name'],
      include: [
        {
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
          model: File,
        },
        {
          as: 'services',
          include: [],
          model: Service,
          through: {
            as: 'service_value',
            attributes: ['value'],
            model: UsersServices,
          },
        },
      ],
      where: {
        provider: true,
      },
    });

    return res.json(providers);
  }
}

export default new ProviderController();
