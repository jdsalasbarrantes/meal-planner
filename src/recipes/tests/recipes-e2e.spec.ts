import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { signInUser } from './utils/user.utils';
import { createRecipesApp } from './utils/app-creator.utils';
import { Recipe } from '../entities/recipe.entity';

let app: INestApplication;
let testingModule: TestingModule;
let userRepository: Repository<User>;
let recipeRepository: Repository<Recipe>;
let user: { username: string; password: string; accessToken: string };
let recipe: Recipe;

describe('Recipes e2e', () => {
    beforeAll(async () => {
        ({ app, module: testingModule } = await createRecipesApp());
        user = {
            username: 'recipes-e2e',
            password: 'testPassword!',
            accessToken: '',
        };
        user.accessToken = await signInUser(app, user);
        userRepository = testingModule.get('UserRepository');
        recipeRepository = testingModule.get('RecipeRepository');
    });

    afterAll(async () => {
        await userRepository.clear();
        await recipeRepository.clear();
        await app.close();
    });

    describe('POST /recipes', () => {
        it('should fail to create a recipe when no auth', async () => {
            const recipe = { name: 'recipe' };
            await request(app.getHttpServer())
                .post('/recipes')
                .send(recipe)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(401);
        });

        it('should fail to create a recipe when invalid data', async () => {
            const recipe = {
                name: '',
            };
            await request(app.getHttpServer())
                .post('/recipes')
                .send(recipe)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${user.accessToken}`)
                .expect('Content-Type', /json/)
                .expect(400);
        });

        it('should create a valid recipe', async () => {
            const recipeData = {
                name: 'recipe',
                description: 'test',
                resources: 'recipes.com/test',
                preparationTime: 5,
            };
            await request(app.getHttpServer())
                .post('/recipes')
                .send(recipeData)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${user.accessToken}`)
                .expect('Content-Type', /json/)
                .expect(201)
                .then(({ body }) => {
                    expect(body).toHaveProperty('id');
                    expect(body.name).toBe(body.name);
                    expect(body.description).toBe(body.description);
                    expect(body.resources).toBe(body.resources);
                    expect(body.preparationTime).toBe(body.preparationTime);
                    recipe = body;
                });
        });
    });

    describe('GET /recipes/:id', () => {
        it('should fail to get a non existing recipe', async () => {
            await request(app.getHttpServer())
                .get('/recipes/99999')
                .set('Authorization', `Bearer ${user.accessToken}`)
                .expect('Content-Type', /json/)
                .expect(404);
        });

        it('should fail to get a recipe with invalid id', async () => {
            await request(app.getHttpServer())
                .get('/recipes/invalid')
                .set('Authorization', `Bearer ${user.accessToken}`)
                .expect('Content-Type', /json/)
                .expect(400);
        });

        it('should fail to get a recipe when no auth', async () => {
            await request(app.getHttpServer())
                .get(`/recipes/${recipe.id}`)
                .expect('Content-Type', /json/)
                .expect(401);
        });

        it('should get a recipe by id', async () => {
            await request(app.getHttpServer())
                .get(`/recipes/${recipe.id}`)
                .set('Authorization', `Bearer ${user.accessToken}`)
                .expect('Content-Type', /json/)
                .expect(200)
                .then(({ body }) => {
                    expect(body).toHaveProperty('id');
                    expect(body.name).toBe(recipe.name);
                    expect(body.description).toBe(recipe.description);
                    expect(body.resources).toBe(recipe.resources);
                    expect(body.preparationTime).toBe(recipe.preparationTime);
                });
        });
    });

    describe('DELETE /recipes/:id', () => {
        it('should fail to delete a recipe when no auth', async () => {
            await request(app.getHttpServer())
                .delete(`/recipes/${recipe.id}`)
                .expect('Content-Type', /json/)
                .expect(401);
        });

        it('should fail to delete a non existing recipe', async () => {
            await request(app.getHttpServer())
                .delete('/recipes/99999')
                .set('Authorization', `Bearer ${user.accessToken}`)
                .expect('Content-Type', /json/)
                .expect(404);
        });

        it('should fail to delete a recipe with invalid id', async () => {
            await request(app.getHttpServer())
                .delete('/recipes/invalid')
                .set('Authorization', `Bearer ${user.accessToken}`)
                .expect('Content-Type', /json/)
                .expect(400);
        });

        it('should delete a recipe by id', async () => {
            await request(app.getHttpServer())
                .delete(`/recipes/${recipe.id}`)
                .set('Authorization', `Bearer ${user.accessToken}`)
                .expect(200);
        });
    });
});
