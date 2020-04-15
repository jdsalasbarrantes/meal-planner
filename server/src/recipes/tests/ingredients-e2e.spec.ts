import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { signInUser } from './utils/user.utils';
import { createRecipesApp } from './utils/app-creator.utils';
import { Product } from '../entities/product.entity';
import { ProductUnitScale } from '../enums/product-unit-scale.enum';
import { Ingredient } from '../entities/ingredient.entity';
import { Recipe } from '../entities/recipe.entity';

let app: INestApplication;
let testingModule: TestingModule;
let userRepository: Repository<User>;
let productRepository: Repository<Product>;
let ingredientRepository: Repository<Ingredient>;
let user: { username: string; password: string; accessToken: string };
let product: Product;
let recipe: Recipe;
let ingredient: Ingredient;

describe('Ingredients e2e', () => {
    beforeAll(async () => {
        ({ app, module: testingModule } = await createRecipesApp());
        userRepository = testingModule.get('UserRepository');
        productRepository = testingModule.get('ProductRepository');
        ingredientRepository = testingModule.get('IngredientRepository');

        user = {
            username: 'ingredients-e2e',
            password: 'testPassword!',
            accessToken: '',
        };
        user.accessToken = await signInUser(app, user);

        product = new Product();
        product.name = 'product';
        product.unitScale = ProductUnitScale.GRAMS.toString();
        product.unitQuantity = 500;
        await product.save();

        recipe = new Recipe();
        recipe.name = 'recipe';
        await recipe.save();
    });

    afterAll(async () => {
        await userRepository.clear();
        await productRepository.clear();
        await ingredientRepository.clear();
        await app.close();
    });

    describe('POST /ingredients', () => {
        it('should fail to create a ingredient when no auth', async () => {
            const ingredient = {
                quantity: 250,
                recipeId: recipe.id,
                productId: product.id,
            };
            await request(app.getHttpServer())
                .post('/ingredients')
                .send(ingredient)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(401);
        });

        it('should fail to create a ingredient when invalid data', async () => {
            const ingredient = {
                quantity: -1,
            };
            await request(app.getHttpServer())
                .post('/ingredients')
                .send(ingredient)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${user.accessToken}`)
                .expect('Content-Type', /json/)
                .expect(400);
        });

        it('should create a valid ingredient', async () => {
            const ingredientData = {
                quantity: 250,
                recipeId: recipe.id,
                productId: product.id,
            };
            await request(app.getHttpServer())
                .post('/ingredients')
                .send(ingredientData)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${user.accessToken}`)
                .expect('Content-Type', /json/)
                .expect(201)
                .then(({ body }) => {
                    expect(body).toHaveProperty('id');
                    expect(body.quantity).toBe(body.quantity);
                    expect(body.recipeId).toBe(body.recipeId);
                    expect(body.productId).toBe(body.productId);
                    expect(body.createdAt).toBeDefined();
                    ingredient = body;
                });
        });
    });

    describe('DELETE /ingredients/:id', () => {
        it('should fail to delete a ingredient when no auth', async () => {
            await request(app.getHttpServer())
                .delete(`/ingredients/${ingredient.id}`)
                .expect('Content-Type', /json/)
                .expect(401);
        });

        it('should fail to delete a non existing ingredient', async () => {
            await request(app.getHttpServer())
                .delete('/ingredients/99999')
                .set('Authorization', `Bearer ${user.accessToken}`)
                .expect('Content-Type', /json/)
                .expect(404);
        });

        it('should fail to delete a ingredient with invalid id', async () => {
            await request(app.getHttpServer())
                .delete('/ingredients/invalid')
                .set('Authorization', `Bearer ${user.accessToken}`)
                .expect('Content-Type', /json/)
                .expect(400);
        });

        it('should delete a ingredient by id', async () => {
            await request(app.getHttpServer())
                .delete(`/ingredients/${ingredient.id}`)
                .set('Authorization', `Bearer ${user.accessToken}`)
                .expect(200);
        });
    });
});
