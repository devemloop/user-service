import { Request, Response } from 'express-serve-static-core';
import { v4 as uuid } from 'uuid';

import CreateUserService from '../services/CreateUserService';
import UserDataService from '../services/UserDataService';
import UserLoginService from '../services/UserLoginService';

class UserController {
  async index(req: Request, res: Response) {
    const { user_id } = req.tokenData;

    const userData = await UserDataService.execute({ id: user_id });
    return res.json(userData);
  }

  async createWithToken(req: Request, res: Response) {
    const { tenant_id } = req.tokenData;
    const { email, password } = req.body;

    const user = await CreateUserService.execute({
      user_id: uuid(),
      email,
      password,
      tenant_id,
    });

    return res.json(user);
  }

  async create(req: Request, res: Response) {
    const { tenant_id, email, password } = req.body;

    const user = await CreateUserService.execute({
      user_id: uuid(),
      email,
      password,
      tenant_id,
    });

    return res.json(user);
  }

  async login(req: Request, res: Response) {
    const { email, password }: { email: string; password: string } = req.body;
    const loginData = await UserLoginService.execute({ email, password });

    return res.json(loginData);
  }
}

export default new UserController();
