import ServiceException from '@error/ServiceException';
import { IUserCreate } from '@interfaces/user';
import User from '@schemas/User';

import { cryptPassword } from '../utils';

class CreateTenantService {
  async execute({ user_id, tenant_id, email, password }: IUserCreate) {
    const passwordCrypt = cryptPassword({ password });

    const user = await User.getByEmail(email);

    if (user)
      throw new ServiceException({
        status: 400,
        message: 'User already exists',
        category: 'USER_ALREADY_EXISTS',
      });

    return User.create({
      user_id,
      tenant_id,
      email,
      password: passwordCrypt,
    });
  }
}

export default new CreateTenantService();
