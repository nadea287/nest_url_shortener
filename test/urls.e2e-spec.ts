import {Test} from "@nestjs/testing";
import {INestApplication} from "@nestjs/common";
import {Connection} from "typeorm";
import * as request from 'supertest'
import {AppModule} from "../src/app.module";
import {UrlService} from "../src/services/url.service";
import {UserService} from "../src/services/user.service";
import {AuthService} from "../src/services/auth.service";
import {faker} from "@faker-js/faker";
import {setupApp} from "../src/setup-app";

describe('Urls', () => {
    let app: INestApplication
    let dbConnection: Connection
    let userService: UserService
    let authService: AuthService
    let urlService: UrlService
    const createAdmin = async () => {
        return userService.create({
            username: 'test',
            type: 'admin',
            password: '123456789',
            passwordConfirm: '123456789'
        })
    }

    const createUser = async () => {
        return userService.create({
            username: 'user',
            type: 'user',
            password: '123456',
            passwordConfirm: '123456'
        })
    }

    const admin = {
        username: 'test',
        password: '123456789'
    }

    const user = {
        username: 'user',
        password: '123456'
    }

    const createUrlRecord = async (user, urlCount) => {
        const promises = []
        for (let i = 0; i < urlCount; i++) {
            await urlService.create({url: `${faker.internet.avatar()}`}, user)
        }
        await Promise.all(promises)
    }

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule]
        }).compile()

        app = moduleRef.createNestApplication()

        //to test our validation
        // app.useGlobalPipes(new ValidationPipe())
        setupApp(app)

        dbConnection = moduleRef.get(Connection)
        userService = app.get<UserService>(UserService)
        authService = app.get<AuthService>(AuthService)
        urlService = app.get<UrlService>(UrlService)

        await app.init()
    })

    beforeEach(async () => {
        //clear database / repositories
        const entities = dbConnection.entityMetadatas
        const promises: Array<Promise<void>> = []

        for (const entity of entities) {
            const repository = dbConnection.getRepository(entity.name)
            await dbConnection.query('SET FOREIGN_KEY_CHECKS=0;')
            promises.push(repository.clear())
        }

        await Promise.all(promises)
    })

    it('should handle url without data', async () => {
        await createAdmin()
        const loginRequest = await request(app.getHttpServer())
            .post('/login')
            .send(admin)
        const token = loginRequest.body.access_token

        const response = await request(app.getHttpServer())
            .get('/urls')
            .set('Authorization', `Bearer ${token}`)
            .send(admin)

        expect(response.status).toBe(200)
        expect(response.body).toEqual([])
    });

    it('should return all urls for admin', async () => {
        const createdAdmin = await createAdmin()
        const loginRequest = await request(app.getHttpServer())
            .post('/login')
            .send(admin)
        const token = loginRequest.body.access_token
        const urlCount = 3
        await createUrlRecord(createdAdmin, urlCount)

        const response = await request(app.getHttpServer())
            .get('/urls')
            .set('Authorization', `Bearer ${token}`)
            .send(admin)
            .expect(200)

        const responseBody = response.body
        // expect(response.status).toBe(200)

        //the urls are returned along with the user
        expect(responseBody).toEqual(expect.arrayContaining(await urlService.index(createdAdmin)))
        expect(responseBody).toHaveLength(urlCount)
    });

    it('should return only user\'s urls for a simpke user', async () => {
        const createdAdmin = await createAdmin()
        const createdUser = await createUser()
        await request(app.getHttpServer())
            .post('/login')
            .send(admin)
            .expect(201)
        await createUrlRecord(createdAdmin, 4)
        const userLoginRequest = await request(app.getHttpServer())
            .post('/login')
            .send(user)
            .expect(201)
        const userToken = userLoginRequest.body.access_token

        const urlCount = 2
        await createUrlRecord(createdUser, urlCount)
        const response = await request(app.getHttpServer())
            .get('/urls')
            .set('Authorization', `Bearer ${userToken}`)
            .send(user)
            .expect(200)

        const responseBody = response.body
        expect(responseBody).toEqual(expect.arrayContaining(await urlService.index(createdUser)))
        expect(responseBody).toHaveLength(urlCount)
    });

    it('should create a new url record', async () => {
        await createUser()
        const userLoginRequest = await request(app.getHttpServer())
            .post('/login')
            .send(user)
            .expect(201)
        const userToken = userLoginRequest.body.access_token

        const response = await request(app.getHttpServer())
            .post('/urls')
            .set('Authorization', `Bearer ${userToken}`)
            // .send({url: 'here'})
            .send({url: faker.internet.url()})
            .expect(201)
        const responseBody = response.body

        await request(app.getHttpServer())
            .get(`/urls/${responseBody.urlCode}`)
            .set('Authorization', `Bearer ${userToken}`)
            .expect(301)
    });

    it('should return not found exception if url was not found by code', async () => {
        await createAdmin()
        const adminLoginRequest = await request(app.getHttpServer())
            .post('/login')
            .send(admin)
            .expect(201)
        const token = adminLoginRequest.body.access_token

        const response = await request(app.getHttpServer())
            .get(`/urls/${faker.random.word()}`)
            .set('Authorization', `Bearer ${token}`)
            .send(admin)
            .expect(404)

        const responseBody = response.body
        expect(responseBody.error).toEqual('Not Found')
    });
});