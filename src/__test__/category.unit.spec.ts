import request from 'supertest';
import App from '../shared/app';
import TestGlobal from '../config/test';
const app = new App().getApp();

describe('Auth', () => {
  describe('POST /api/v1/auth/register', () => {
    it('should create a category successfully', async () => {
      await TestGlobal.signUp();
      const signInResponse = await TestGlobal.signIn();

      const mockUser = {
        category_name: 'dka',
        category_code: 'ELCRTR',
        discount: '10',
      };

      const { status, body } = await request(app)
        .post('/api/v1/category/create')
        .set('Authorization', signInResponse.body.data.access_token)
        .send(mockUser);

      expect(status).toBe(201);
      expect(body.data.id).toBeTruthy();
    });
  });

  describe('/api/v1/category/single?category_id=', () => {
    it('should get a category successfully', async () => {
      await TestGlobal.signUp();

      const response = await TestGlobal.createCategory();
      // console.log("_______________________________________", response.body);
      const signInResponse = await TestGlobal.signIn();
      const { status, body } = await request(app)
        .get(`/api/v1/category/single?category_id=${response.body.data.id}`)
        .set('Authorization', signInResponse.body.data.access_token);

      expect(status).toBe(200);
      expect(body.data._id).toBeTruthy();
    });
  });

  describe('/api/v1/category/all', () => {
    it('should get all category successfully', async () => {
      await TestGlobal.signUp();

      await TestGlobal.createCategories();
      const signInResponse = await TestGlobal.signIn();
      const { status, body } = await request(app).get(`/api/v1/category/all`).set('Authorization', signInResponse.body.data.access_token);

      expect(status).toBe(200);
      expect(body.data.categories[0]._id).toBeDefined();
    });
  });

  describe('/api/v1/category/delete/{{category_id}}', () => {
    it('should delete a category successfully', async () => {
      await TestGlobal.signUp();

      const response = await TestGlobal.createCategory();
      const signInResponse = await TestGlobal.signIn();
      const { status, body } = await request(app)
        .delete(`/api/v1/category/delete/${response.body.data.id}`)
        .set('Authorization', signInResponse.body.data.access_token);

      expect(status).toBe(200);
      expect(body.success).toBeTruthy();
    });
  });

  describe('/api/v1/category/delete/{{category_id}}', () => {
    it('should throw error when deleting a category.', async () => {
      await TestGlobal.signUp();

      const response = await TestGlobal.createCategory();
      const signInResponse = await TestGlobal.signIn();
      const { status, body } = await request(app)
        .delete(`/api/v1/category/delete/6649f5c764dc6701877f8ea1`)
        .set('Authorization', signInResponse.body.data.access_token);

      expect(status).toBe(400);
      expect(body.success).toBeFalsy();
    });
  });

  describe('/api/v1/category/update/{{category_id}}', () => {
    it('should update a category successfully', async () => {
      const updateData = {
        category_name: 'TV',
        category_code: 'ELCRTR',
        discount: '10',
      };

      await TestGlobal.signUp();

      const response = await TestGlobal.createCategory();
      const signInResponse = await TestGlobal.signIn();

      const { status, body } = await request(app)
        .patch(`/api/v1/category/update/${response.body.data.id}`)
        .set('Authorization', signInResponse.body.data.access_token)
        .send(updateData);

      expect(status).toBe(200);
      expect(body.success).toBeTruthy();
    });
  });

    describe('/api/v1/category/update/{{category_id}}', () => {
      it('should throw err when updating a category', async () => {
        const updateData = {
          category_name: 'TV',
          category_code: 'ELCRTR',
          discount: '10',
        };

        await TestGlobal.signUp();

        const response = await TestGlobal.createCategory();
        const signInResponse = await TestGlobal.signIn();

        const { status, body } = await request(app)
          .patch(`/api/v1/category/update/6649f5c764dc6701877f8ea1`)
          .set('Authorization', signInResponse.body.data.access_token)
          .send(updateData);

        expect(status).toBe(400);
        expect(body.success).toBeFalsy();
      });
    });
});
