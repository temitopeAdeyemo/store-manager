import { Request, Response, NextFunction } from 'express';
import JwtClient from '../../shared/service/JWT';
import AppError from '../../shared/utils/AppError';
import UserRepository from '../../modules/auth/models/repositories/UserRepository';

const auth = async (request: Request, response: Response, next: NextFunction) => {
  let token = request.headers['authorization'];

  if (!token) throw new AppError('No token provided', 401);

  token = token.replace('Bearer ', '');

  const { id } = new JwtClient().verifyAccessToken(token);

  const userRepository = new UserRepository();
  
  const user = await userRepository.findByUniqueData('_id', id);

  if (!user) throw new AppError('Not Authorised', 403);

  if (!user.authorization_token || user.authorization_token !== token) throw new AppError('Session Expired, Please Login.', 401);

  request.user = id;

  return next();
};

export default auth;
