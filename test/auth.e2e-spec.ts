import * as request from 'supertest';
import {Test} from '@nestjs/testing';
import {AppModule} from '../src/app.module';
import {INestApplication} from '@nestjs/common';
import {setupApp} from "../src/setup-app";

describe('AuthController (e2e)', () => {
    let app: INestApplication;
    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        setupApp(app)
        await app.init();
    });

    it('/ (GET)', () => {
        return request(app.getHttpServer())
            .get('/')
            .expect(200)
            .expect('Hello World!');
    });

    it('/auth/signup (POST)', () => {
        const email = "me+11@luke.sx"
        return request(app.getHttpServer())
            .post('/auth/signup')
            .send({
                email,
                password: 'password'
            })
            .expect(201)
            .then((res) => {
                const { id, email} = res.body;
                expect(id).toBeDefined();
                expect(email).toEqual(email);
            })
    });
});
