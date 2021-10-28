import { Request, Response } from 'express';
import * as yup from 'yup';

import ServiceException from '@error/ServiceException';

const userLoginValidator = (
  req: Request,
  _: Response,
  next: Function
): void => {
  const schema = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required(),
  });

  try {
    schema.validateSync(req.body);
    next();
  } catch (err) {
    throw new ServiceException({
      message: 'Validation failed',
      status: 400,
      category: 'INPUT_VALIDATE_FAILURE',
      messages: err.errors,
    });
  }
};

export default userLoginValidator;
