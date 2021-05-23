import { NextFunction, Request, Response } from 'express';

import ServiceException from '@error/ServiceException';

const errorHandler = (
  error: ServiceException,
  _request: Request,
  response: Response,
  _: NextFunction
): Response<unknown> => {
  if (error instanceof ServiceException) {
    const status = error.status || 500;
    const message = error.message || 'Algo deu errado...';

    return response.status(status).send({
      status,
      message,
    });
  }

  return response.status(500).send({
    status: 500,
    message: 'Internal Server Error',
  });
};

export default errorHandler;
