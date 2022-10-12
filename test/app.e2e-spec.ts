import { Test } from '@nestjs/testing'; // May not import automatically
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
describe('App e2e', () => {
    let app: INestApplication;
    beforeAll(async () => {
        // Imports module, good for unit testing
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();

        // Created a testing application
        app = moduleRef.createNestApplication();

        // Enabled Global Validation
        app.useGlobalPipes(
            new ValidationPipe({
                whitelist: true,
            })
        )
        
        // Started application testing
        await app.init();
    })

    afterAll(() => {
        app.close(); // Every started application needs to close
    })
    it.todo('should pass')
})