import Redis from 'ioredis';
import config from '../../config/environments.config';
const { redisHost, redisPassword, redisPort } = config;

class CacheService {
  client: Redis;

  constructor(connName?: string) {
    const redisClient = new Redis({
      host: redisHost,
      port: redisPort,
      password: redisPassword,
      connectionName: connName || undefined,
      connectTimeout: 10 * 1000,
      name: connName || undefined,
    });

    // redisClient.on('connect', () => {
    //   console.log('Redis Connected');
    // });
    // redisClient.on('ready', () => {
    //   console.log('Redis ready for connection.');
    // });
    redisClient.on('end', () => {
      console.log('Redis ended');
    });
    redisClient.on('error', (er) => {
      console.log(er);
      throw new Error('Redis Error');
    });
    redisClient.on('SIGINT', () => {
      console.log('SIGINT ERR');
    });

    this.client = redisClient
  }

  set(key: string, value: any, expiry = 72 * 60 * 60) {
    this.client.set(key, JSON.stringify(value), 'EX', expiry);
  }

  async get(key: string) {
    const value = await this.client.get(key);
    return value ? JSON.parse(value) : null;
  }

  delete(key: string) {
    this.client.del(key);
  }
}

export default CacheService;
