import Database from '../shared/database';
import CacheService from './service/Cache';

(async () => {
  try {
    const App = require('./app').default;
    const redisClient = new CacheService();
    redisClient.client.on('connect', () => {
      console.log('Redis Connected.');
    });
    redisClient.client.on('ready', async () => {
      console.log('Redis ready for connection');

      const database = new Database();

      await database.connect();
      const app = new App();
      app.listen();
    });
  } catch (err: any) {
    console.log(err);
    console.error('Something went wrong when initializing the server:\n', err.stack);
  }
})();
