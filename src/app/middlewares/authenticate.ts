import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import ServiceException from '@error/ServiceException';
import { ITokenData } from '@interfaces/login';

const { USER_TOKEN_SECRET = '' } = process.env;

const createTenantValidator = (
  req: Request,
  _: Response,
  next: NextFunction
): void => {
  const auth = req.headers.authorization;

  if (!auth)
    throw new ServiceException({
      status: 403,
      message: 'The token was not provided',
      category: 'INVALID_TOKEN',
    });

  const [type, token] = auth.split(' ');

  if (type !== 'Bearer')
    throw new ServiceException({
      status: 403,
      message: 'Invalid token format',
      category: 'INVALID_TOKEN',
    });

  try {
    const tokenData = jwt.verify(token, USER_TOKEN_SECRET) as ITokenData;
    req.tokenData = tokenData;
    next();
  } catch (_e) {
    throw new ServiceException({
      status: 403,
      message: 'Authentication failed',
      category: 'INVALID_TOKEN',
    });
  }
};

export default createTenantValidator;
