import {INestApplication} from "@nestjs/common";
import {Connection} from "typeorm";
import {Test} from "@nestjs/testing";
import {AppModule} from "../src/app.module";
import {setupApp} from "../src/setup-app";
import * as request from 'supertest'

describe('Auth', () => {
    let app: INestApplication
    let dbConnection: Connection

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule]
        }).compile()

        app = moduleRef.createNestApplication()
        setupApp(app)
        dbConnection = moduleRef.get(Connection)

        await app.init()
    })

    beforeEach(async () => {
        const entities = dbConnection.entityMetadatas
        const promises: Array<Promise<void>> = []

        for (const entity of entities) {
            const repository = dbConnection.getRepository(entity.name)
            await dbConnection.query('SET FOREIGN_KEY_CHECKS=0;')
            promises.push(repository.clear())
        }

        await Promise.all(promises)
    })

    it('should return unauthorized exception if user provided invalid credentials', async () => {
        await request(app.getHttpServer())
            .post('/login')
            .send({
                username: '123',
                password: '123'
            })
            .expect(401)
    });

})