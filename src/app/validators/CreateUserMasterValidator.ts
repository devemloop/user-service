import { Request, Response } from 'express';
import * as yup from 'yup';

const createTenantValidator = (
  req: Request,
  _: Response,
  next: Function
): void => {
  const schema = yup.object().shape({
    tenant_id: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required(),
  });

  schema.validateSync(req.body);
  next();
};

export default createTenantValidator;
