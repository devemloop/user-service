import jwt from 'jsonwebtoken';

import ServiceException from '@error/ServiceException';
import User from '@schemas/User';

import { cryptPassword } from '../utils';

const { USER_TOKEN_SECRET = '' } = process.env;

class UserLoginService {
  async execute({ email, password }: { email: string; password: string }) {
    const passwordCrypt = cryptPassword({ password });

    const user = await User.getByEmail(email);

    if (!user || user.password !== passwordCrypt)
      throw new ServiceException({
        status: 403,
        message: 'Email and/or password is incorrect.',
        category: 'EMAIL_OR_PASSWORD_INCORRECT',
      });

    const { user_id, tenant_id } = user;

    const expiresIn = '7d';

    const token = jwt.sign(
      {
        user_id,
        tenant_id,
        email,
      },
      USER_TOKEN_SECRET,
      {
        expiresIn,
      }
    );

    return { token, expiresIn };
  }
}

export default new UserLoginService();
