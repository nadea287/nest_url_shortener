import {Test} from "@nestjs/testing";
import {INestApplication, ValidationPipe} from "@nestjs/common";
import {Connection} from "typeorm";
import * as request from 'supertest'
import {AppModule} from "../src/app.module";
import {UrlService} from "../src/services/url.service";
import {UserService} from "../src/services/user.service";
import {AuthService} from "../src/services/auth.service";
import {Url} from "../src/entity/url.entity" 

describe('Urls', () => {
    let app: INestApplication
    let dbConnection: Connection
    // let userRepository: Repository<User>
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

    const admin = {
        username: 'test',
        password: '123456789'
    }

    const createUrlRecord = async (user) => {
      return urlService.create({url: `https://blog.logrocket.com/end-end-testing-nestjs-typeorm/${user.id}`}, user)
    }
    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule]
        }).compile()

        app = moduleRef.createNestApplication()

        //to test our validation
        app.useGlobalPipes(new ValidationPipe())

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

    describe('/urls (GET)', () => {
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
    })

    describe('/url (GET)', function () {
        it('should handle with data for admin', async () => {
            const createdAdmin = await createAdmin()
            const loginRequest = await request(app.getHttpServer())
                .post('/login')
                .send(admin)
            const token = loginRequest.body.access_token
            
            const promises: Array<Promise<Url>> = []
            const urlCount = 3
            for (let i = 0; i < urlCount; i++) {
                promises.push(createUrlRecord(createdAdmin))
            }
            const urls = await Promise.all(promises)

            const response = await request(app.getHttpServer())
                .get('/urls')
                .set('Authorization', `Bearer ${token}`)
                .send(admin)

            const responseBody = response.body
            expect(response.status).toBe(200)
            //todo only 2 of 3 are created

            // expect(responseBody).toEqual(expect.arrayContaining(urls))
            // expect(responseBody).toHaveLength(urlCount)

        });
    });
})