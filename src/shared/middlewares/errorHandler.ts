import { Request, Response, NextFunction } from 'express';
import { CelebrateError } from 'celebrate';
import AppError from '../utils/AppError';
import { MongooseError } from 'mongoose';
import { systemLogs } from '../utils/Logger';
import { JsonWebTokenError } from 'jsonwebtoken';

export default function errorHandler(error: Error, request: Request, response: Response, _: NextFunction): Response {
  console.log(error);
  systemLogs.bind(systemLogs)().error(error);

  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      success: false,
      message: error.message,
      data: null,
    });
  }

  if (error.name == 'MongooseError') {
    console.log('MONGOOSE ERROR:::::::::::::::::::::::::::::::::::::: ' );
    return response.status(400).json({
      success: false,
      message: error.message,
      data: null,
    });
  }

  if (error instanceof JsonWebTokenError) {
    return response.status(401).json({
      success: false,
      message: 'Token invalid',
      data: null,
    });
  }

  if (error instanceof CelebrateError) {
    const bodyMessage = error.details.get('body')?.message;
    const queryMessage = error.details.get('query')?.message;
    const paramsMessage = error.details.get('params')?.message;
    const headersMessage = error.details.get('headers')?.message;

    return response.status(400).json({
      success: false,
      message: bodyMessage || queryMessage || paramsMessage || headersMessage,
      data: null,
    });
  }

  return response.status(500).json({
    success: false,
    message: 'Internal server error',
    data: null,
  });
}
