// const crypto = require('crypto');

// const obj = {
//   institution_number: 'I0000000001',
//   channel: '1',
//   bank_number: '999070',
//   account_number: '5050138001',
//   timestamp: '1581312432',
//   // sign: '64B3A8ED8647064F5A0F830EE195F845',
// };

// const keys = Object.keys(obj);

// function sortStringsByAscii(strings) {
//   return strings.slice().sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }));
// }

// // const items = ['institution_number', 'channel', 'bank_number', 'account_number', 'timestamp'];

// const sortedItems = sortStringsByAscii(keys);
// console.log('Sorted items:', sortedItems);

// let keyValArr = [];
// let shaper = ''

// for (let i of sortedItems) {
//   console.log("hhhh");
//   shaper = `${i}=${obj[i]}`

//   keyValArr.push(shaper);
//   shaper = '';
//   console.log(shaper)
// }

// const key = 'QER5HKWePAFeFRM7RD8wPjwdWAfWPQHR';
// console.log(keyValArr.join('&') + key);

// const stringVal = keyValArr.join('&') + key;

// // const dataToEncrypt =
// //   'account_number=5050138001&bank_number=999070&channel=1&institution_number=I0000000001&timestamp=1581312432QER5HKWePAFeFRM7RD8wPjwdWAfWPQHR';

// // Create a hash object
// const md5Hash = crypto.createHash('md5');

// // Update the hash object with the data
// md5Hash.update(stringVal);

// // Calculate the hash and convert it to hexadecimal representation
// const md5Hex = md5Hash.digest('hex');

// console.log('MD5 Hash:', md5Hex.toUpperCase());

// // const a = "apple";

// // console.log(a.slice());

// // const v = [1, 2, 3, 7, 5];

// // // console.log(v.sort((a, b) => a - b))

// // function sortStringsByAscii(strings) {
// //   return strings.slice().sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }));
// // }

// // const items = ['institution_number', 'channel', 'bank_number', 'account_number', 'timestamp'];

// // const sortedItems = sortStringsByAscii(items);
// // console.log('Sorted items:', sortedItems);

import mongoose, { Collection } from 'mongoose';
import request from 'supertest';
import UserRepository from '../modules/auth/models/repositories/UserRepository';
import environment from '../config/environments.config';
import App from '../shared/app';
import Redis from 'ioredis';
import { redisClient } from '../shared/middlewares/rateLimiter';
const app = new App().getApp();

describe('Auth', () => {
  beforeAll(async () => {
    console.log('***********', environment.testdburl);
    await mongoose.connect(environment.testdburl);
    console.log('Database Connected');
  });

  beforeEach(async () => {
    await new UserRepository().deleteMany();
  });

  afterAll(async () => {
    await mongoose.connection.close();
    redisClient.disconnect();
  });

  describe('POST /api/v1/auth/register', () => {
    it('should create a user successfully.', async () => {
      const mockUser = {
        password: 'Temitope12@#',
        first_name: 'Temitope',
        last_name: 'Julius',
        email: 'temitope@gmail.com',
      };

      const { status, body } = await request(app).post('/api/v1/auth/register').send(mockUser);
      console.log(body);
      expect(status).toBe(201);
      expect(body.data.id).toBeTruthy();
    });

    it('should fail with password validation error', async () => {
      const mockUser = {
        password: 'Temitope12',
        first_name: 'Temitope',
        last_name: 'Julius',
        email: 'temitope@gmail.com',
      };

      const { status, body } = await request(app).post('/api/v1/auth/register').send(mockUser);
      console.log(body);
      expect(status).toBe(400);
      expect(body.success).toBeFalsy();
    });

    it('should fail with email validation error', async () => {
      const mockUser = {
        password: 'Temitope12@#',
        first_name: 'Temitope',
        last_name: 'Julius',
        email: 'temitope33',
      };

      const { status, body } = await request(app).post('/api/v1/auth/register').send(mockUser);
      console.log(body);
      expect(status).toBe(400);
      expect(body.success).toBeFalsy();
    });

    it('should return an error while a user attribute missing', async () => {
      const mockUser = {
        password: 'Temitope12@#',
        first_name: 'Temitope',
        last_name: 'Julius',
      };

      const { status, body } = await request(app).post('/api/v1/auth/register').send(mockUser);
      console.log(body);

      expect(status).toBe(400);
      expect(body.message).toMatch('"email" is required');
      expect(body.success).toBeFalsy();
    });
  });

  describe('POST /api/v1/auth/login', async () => {
    const mockUser = {
      password: 'Temitope12@#',
      first_name: 'Temitope',
      last_name: 'Julius',
      email: 'temitope@gmail.com',
    };

    it('should log a user in successfully.', async () => {
      const loginCredential = {
        password: 'Temitope12@#',
        email: 'temitope@gmail.com',
      };
      await request(app).post('/api/v1/auth/register').send(mockUser);
      const { status, body } = await request(app).post('/api/v1/auth/login').send(loginCredential);

      console.log(body);
      expect(status).toBe(200);
      expect(body.data.access_token).toBeTruthy();
    });

    it('should unauthorize a login with incorrect credentials.', async () => {
      await request(app).post('/api/v1/auth/register').send(mockUser);
      const loginCredential = {
        password: 'Temitope1#',
        email: 'temitope@gmail.com',
      };

      const { status, body } = await request(app).post('/api/v1/auth/login').send(loginCredential);

      console.log(body);
      expect(status).toBe(200);
      expect(body.data.access_token).toBeTruthy();
    });

    it('should fail with password validation error', async () => {
      const mockUser = {
        password: 'Temitope12',
        email: 'temitope@gmail.com',
      };
      await request(app).post('/api/v1/auth/register').send(mockUser);

      const { status, body } = await request(app).post('/api/v1/auth/login').send(mockUser);
      console.log(body);
      expect(status).toBe(400);
      expect(body.success).toBeFalsy();
    });

    it('should fail with email validation error', async () => {
      const mockUser = {
        password: 'Temitope12@#',
        email: 'temitope33',
      };
      await request(app).post('/api/v1/auth/register').send(mockUser);

      const { status, body } = await request(app).post('/api/v1/auth/login').send(mockUser);
      console.log(body);
      expect(status).toBe(400);
      expect(body.success).toBeFalsy();
    });

    it('should return an error while a user attribute missing', async () => {
      const mockUser = {
        password: 'Temitope12@#',
      };

      const { status, body } = await request(app).post('/api/v1/auth/login').send(mockUser);
      console.log(body);

      expect(status).toBe(400);
      expect(body.message).toMatch('"email" is required');
      expect(body.success).toBeFalsy();
    });
  });
});
