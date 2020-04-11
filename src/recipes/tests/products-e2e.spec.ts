import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { signInUser } from './utils/user.utils';
import { createRecipesApp } from './utils/app-creator.utils';
import { Product } from '../entities/product.entity';
import { ProductUnitScale } from '../enums/product-unit-scale.enum';

let app: INestApplication;
let testingModule: TestingModule;
let userRepository: Repository<User>;
let productRepository: Repository<Product>;
let user: any;
let product: Product;

describe('Products e2e', () => {
    beforeAll(async () => {
        ({ app, module: testingModule } = await createRecipesApp());
        user = {
            username: 'test',
            password: 'testPassword!',
        };
        user.accessToken = await signInUser(app, user);
        userRepository = testingModule.get('UserRepository');
        productRepository = testingModule.get('ProductRepository');
    });

    afterAll(async () => {
        await userRepository.clear();
        await productRepository.clear();
        await app.close();
    });

    describe('POST /products', () => {
        it('should fail to create a product when no auth', async () => {
            const product = {
                name: 'product',
                unitQuantity: 5,
                unitScale: ProductUnitScale.GRAMS,
                price: 500,
            };
            await request(app.getHttpServer())
                .post('/products')
                .send(product)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(401);
        });

        it('should fail to create a product when invalid data', async () => {
            const product = {
                name: '',
                unitQuantity: null,
                unitScale: 'invalid',
            };
            await request(app.getHttpServer())
                .post('/products')
                .send(product)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${user.accessToken}`)
                .expect('Content-Type', /json/)
                .expect(400);
        });

        it('should create a valid product', async () => {
            const productData = {
                name: 'product',
                unitQuantity: 5,
                unitScale: ProductUnitScale.GRAMS,
                price: 500,
            };
            await request(app.getHttpServer())
                .post('/products')
                .send(productData)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${user.accessToken}`)
                .expect('Content-Type', /json/)
                .expect(201)
                .then(({ body }) => {
                    expect(body).toHaveProperty('id');
                    expect(body.name).toBe(body.name);
                    expect(body.unitQuantity).toBe(body.unitQuantity);
                    expect(body.unitScale).toBe(body.unitScale);
                    expect(body.price).toBe(body.price);
                    product = body;
                });
        });
    });

    describe('GET /products/:id', () => {
        it('should fail to get a non existing product', async () => {
            await request(app.getHttpServer())
                .get('/products/99999')
                .set('Authorization', `Bearer ${user.accessToken}`)
                .expect('Content-Type', /json/)
                .expect(404);
        });

        it('should fail to get a product with invalid id', async () => {
            await request(app.getHttpServer())
                .get('/products/invalid')
                .set('Authorization', `Bearer ${user.accessToken}`)
                .expect('Content-Type', /json/)
                .expect(400);
        });

        it('should fail to get a product when no auth', async () => {
            await request(app.getHttpServer())
                .get(`/products/${product.id}`)
                .expect('Content-Type', /json/)
                .expect(401);
        });

        it('should get a product by id', async () => {
            await request(app.getHttpServer())
                .get(`/products/${product.id}`)
                .set('Authorization', `Bearer ${user.accessToken}`)
                .expect('Content-Type', /json/)
                .expect(200)
                .then(({ body }) => {
                    expect(body).toHaveProperty('id');
                    expect(body.name).toBe(product.name);
                    expect(body.unitQuantity).toBe(product.unitQuantity);
                    expect(body.unitScale).toBe(product.unitScale);
                    expect(body.price).toBe(product.price);
                });
        });
    });

    describe('DELETE /products/:id', () => {
        it('should fail to delete a product when no auth', async () => {
            await request(app.getHttpServer())
                .delete(`/products/${product.id}`)
                .expect('Content-Type', /json/)
                .expect(401);
        });

        it('should fail to delete a non existing product', async () => {
            await request(app.getHttpServer())
                .delete('/products/99999')
                .set('Authorization', `Bearer ${user.accessToken}`)
                .expect('Content-Type', /json/)
                .expect(404);
        });

        it('should fail to delete a product with invalid id', async () => {
            await request(app.getHttpServer())
                .delete('/products/invalid')
                .set('Authorization', `Bearer ${user.accessToken}`)
                .expect('Content-Type', /json/)
                .expect(400);
        });

        it('should delete a product by id', async () => {
            await request(app.getHttpServer())
                .delete(`/products/${product.id}`)
                .set('Authorization', `Bearer ${user.accessToken}`)
                .expect(200);
        });
    });
});
