import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

export const signInUser = async (
    app: INestApplication,
    user: object,
): Promise<string> => {
    await request(app.getHttpServer())
        .post('/auth/sign-up')
        .send(user)
        .set('Accept', 'application/json');

    const { body } = await request(app.getHttpServer())
        .post('/auth/sign-in')
        .send(user)
        .set('Accept', 'application/json');
    return body.accessToken;
};
