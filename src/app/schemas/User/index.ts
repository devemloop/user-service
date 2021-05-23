import { IUser, IUserCreate } from '@interfaces/user';

import Schema, { INDEXES } from './schema';

class User {
  create(user: IUserCreate) {
    return Schema.create(user);
  }

  get(userId: string): Promise<IUser> {
    return Schema.get(userId);
  }

  async getByEmail(email: string): Promise<IUser | undefined> {
    const [user] = await Schema.query('email')
      .eq(email)
      .using(INDEXES.USER_EMAIL_INDEX)
      .limit(1)
      .exec();

    if (!user) return undefined;

    return this.get(user.user_id);
  }
}

export default new User();
