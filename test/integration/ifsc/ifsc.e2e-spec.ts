import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule } from '@nestjs/cache-manager';
import * as request from 'supertest';
import { AppModule } from '../../../src/app.module';
import { mockIfscData } from '../../fixtures/ifsc-data.fixture';

describe('IFSC (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/brixo-ifsc-test'),
        CacheModule.register({
          store: 'memory',
          ttl: 60,
        }),
        AppModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('/ifsc/:ifsc (GET)', () => {
    it('should return IFSC details for valid code', () => {
      return request(app.getHttpServer())
        .get('/ifsc/HDFC0CAGSBK')
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('ifsc');
          expect(res.body).toHaveProperty('bank');
          expect(res.body).toHaveProperty('branch');
          expect(res.body).toHaveProperty('address');
          expect(res.body).toHaveProperty('contact');
          expect(res.body).toHaveProperty('city');
          expect(res.body).toHaveProperty('district');
          expect(res.body).toHaveProperty('state');
          expect(res.body).toHaveProperty('updatedAt');
        });
    });

    it('should return 400 for invalid IFSC format', () => {
      return request(app.getHttpServer())
        .get('/ifsc/INVALID')
        .expect(400);
    });

    it('should return 400 for IFSC with wrong length', () => {
      return request(app.getHttpServer())
        .get('/ifsc/HDFC')
        .expect(400);
    });

    it('should return 404 for non-existent IFSC', () => {
      return request(app.getHttpServer())
        .get('/ifsc/INVALID00001')
        .expect(404);
    });
  });
});

