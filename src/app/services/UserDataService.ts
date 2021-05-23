import User from '@schemas/User';

class UserLoginService {
  async execute({ id }: { id: string }) {
    const user = await User.get(id);

    const { tenant_id, user_id, email } = user;

    return { tenant_id, user_id, email };
  }
}

export default new UserLoginService();
