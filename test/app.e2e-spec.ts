import { Test } from '@nestjs/testing'; // May not import automatically
import { AppModule } from '../src/app.module';
describe('App e2e', () => {
    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();
    })
    it.todo('should pass')
})