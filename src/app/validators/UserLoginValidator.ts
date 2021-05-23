import { Request, Response } from 'express';
import * as yup from 'yup';

const userLoginValidator = (
  req: Request,
  _: Response,
  next: Function
): void => {
  const schema = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required(),
  });

  schema.validateSync(req.body);
  next();
};

export default userLoginValidator;
