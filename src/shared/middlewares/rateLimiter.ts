import { Request, Response, NextFunction } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import ip from 'ip';
import AppError from '../../shared/utils/AppError';
import JwtClient from '../service/JWT';
import Redis from 'ioredis';
import config from '../../config/environments.config';
import { systemLogs } from '../utils/Logger';

const redisClient = new Redis({
  host: config.redisHost,
  port: config.redisPort,
  password: config.redisPassword,
  connectionName: 'REDIS_RATE_LIMITER',
  connectTimeout: 30 * 1000,
  name: 'REDIS_RATE_LIMITER',
});

redisClient.on('end', () => {
  console.log('Redis ended');
});
redisClient.on('error', () => {
  console.log('Redis Error');
});
redisClient.on('SIGINT', () => {
  console.log('SIGINT ERR');
});

export default async function rateLimiter(request: Request, response: Response, next: NextFunction): Promise<void> {
  let key: any;
  let controlledPath = ['/create', '/update', '/reset', '/login', '/register'];
  let isControlledPath = false;
  
  try {
    const limiter = new RateLimiterRedis({
      points: 5,
      duration: 2,
      storeClient: redisClient,
    });

    key = ip.address() || request.ip;

    if (request.headers['authorization'] && request.headers['authorization'].split(' ')[1]) key = request.headers['authorization'].split(' ')[1];

    for (let path of controlledPath) {
      if (request.path.includes(path)) {
        console.log('HITTING CONTROLLED ENDPOINT...');
        isControlledPath = true;
        limiter.points = 2;
        limiter.duration = 2;

        await limiter.consume(`trans-${path}-${key}`);
        return next();
      }
    }

    await limiter.consume(`trans-${key}`);

    return next();
  } catch (error) {
    if (request.headers['authorization'] && request.headers['authorization'].split(' ')[1]) {
      const jwtClient = new JwtClient();
      const user = jwtClient.verifyAccessToken(key);
      systemLogs.warn('ERROR: Too many requests on path: ' + request.path + ' from: ' + user.email + '. Please try again later.');
    }

    throw new AppError(`System busy, Try again in a moment.`, 429);
  }
}
