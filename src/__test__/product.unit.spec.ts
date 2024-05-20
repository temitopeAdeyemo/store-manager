import request from 'supertest';
import App from '../shared/app';
import TestGlobal from '../config/test';
const app = new App().getApp();

describe('PRODUCT', () => {
  describe('POST /api/v1/product/create', () => {
    it('should create a product successfully', async () => {
      await TestGlobal.signUp();
      const signInResponse = await TestGlobal.signIn();
      const categoryResponse = await TestGlobal.createCategory();
      console.log('****************************************************************', categoryResponse.body);
      const mockdata = {
        product_name: 'BULB',
        category: categoryResponse.body.data.id,
        product_code: 'BLB',
        amount: '40',
        discount: '10',
        images: '/',
        quantity: '5',
      };

      const { status, body } = await request(app)
        .post('/api/v1/product/create')
        .set('Authorization', signInResponse.body.data.access_token)
        .send(mockdata);

      expect(status).toBe(201);
      expect(body.data.id).toBeTruthy();
    });
  });

  describe('/api/v1/product/single?product_id=', () => {
    it('should get a product successfully', async () => {
      await TestGlobal.signUp();

      const response = await TestGlobal.createProduct();
      const signInResponse = await TestGlobal.signIn();
      const { status, body } = await request(app)
        .get(`/api/v1/product/single?product_id=${response.body.data.id}`)
        .set('Authorization', signInResponse.body.data.access_token);

      expect(status).toBe(200);
      expect(body.data._id).toBeTruthy();
    });
  });

  describe('/api/v1/product/all', () => {
    it('should get all product successfully', async () => {
      await TestGlobal.signUp();

      await TestGlobal.createProducts();
      const signInResponse = await TestGlobal.signIn();
      const { status, body } = await request(app).get(`/api/v1/product/all`).set('Authorization', signInResponse.body.data.access_token);

      expect(status).toBe(200);
      expect(body.data.products[0]._id).toBeDefined();
    });
  });

  describe('/api/v1/product/delete/{{product_id}}', () => {
    it('should delete a product successfully', async () => {
      await TestGlobal.signUp();

      const response = await TestGlobal.createProduct();
      const signInResponse = await TestGlobal.signIn();
      const { status, body } = await request(app)
        .delete(`/api/v1/product/delete/${response.body.data.id}`)
        .set('Authorization', signInResponse.body.data.access_token);

      expect(status).toBe(200);
      expect(body.success).toBeTruthy();
    });
  });

  describe('/api/v1/product/delete/{{product_id}}', () => {
    it('should throw error when deleting a product.', async () => {
      await TestGlobal.signUp();

      await TestGlobal.createProduct();
      const signInResponse = await TestGlobal.signIn();
      const { status, body } = await request(app)
        .delete(`/api/v1/product/delete/6649f5c764dc6701877f8ea1`)
        .set('Authorization', signInResponse.body.data.access_token);

      expect(status).toBe(400);
      expect(body.success).toBeFalsy();
    });
  });

  describe('/api/v1/product/update/{{product_id}}', () => {
    it('should update a product successfully', async () => {
      const categoryResponse = await TestGlobal.createCategory();

      const updateData = {
        product_name: 'BULB',
        category: categoryResponse.body.data.id,
        product_code: 'BLB',
        amount: '40',
        discount: '10',
        images: '/',
        quantity: '5',
      };

      await TestGlobal.signUp();

      const response = await TestGlobal.createProduct();
      const signInResponse = await TestGlobal.signIn();

      const { status, body } = await request(app)
        .patch(`/api/v1/product/update/${response.body.data.id}`)
        .set('Authorization', signInResponse.body.data.access_token)
        .send(updateData);

      expect(status).toBe(200);
      expect(body.success).toBeTruthy();
    });
  });

  describe('/api/v1/product/update/{{product_id}}', () => {
    it('should throw err when updating a product', async () => {
      const updateData = {
        product_name: 'BULB',
        category: '6649f18559baf81f9979353a',
        product_code: 'BLB',
        amount: '40',
        discount: '10',
        images: '/',
        quantity: '5',
      };

      await TestGlobal.signUp();

      const response = await TestGlobal.createProduct();
      const signInResponse = await TestGlobal.signIn();

      const { status, body } = await request(app)
        .patch(`/api/v1/product/update/${response.body.data.id}`)
        .set('Authorization', signInResponse.body.data.access_token)
        .send(updateData);

      expect(status).toBe(400);
      expect(body.success).toBeFalsy();
    });
  });
});
