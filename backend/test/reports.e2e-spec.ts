import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { join } from 'path';

describe('ReportsController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        errorHttpStatusCode: 422,
        transform: true,
      }),
    );
    app.enableShutdownHooks();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('port /reports', () => {
    it('should return 200 and create a report when valid CSV file and data is provided', async () => {
      const response = await request(app.getHttpServer())
        .post('/reports')
        .attach('file', getFilePath('validReport.csv'))
        .field('name', 'Jakub')
        .field('surname', 'Surdej');

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
      expect(response.type).toBe('text/html');
      expect(response.text).toMatchSnapshot();
    });

    it('should return 422 when invalid data is provided', async () => {
      const response = await request(app.getHttpServer())
        .post('/reports')
        .attach('file', getFilePath('invalidReport.csv'))
        .field('name', 'Jakub')
        .field('surname', 'Surdej');

      expect(response.status).toBe(422);
      expect(response.body).toBeDefined();
      // todo: check if the error message is correct
    });

    it('should return 422 when no CSV file is provided', async () => {
      const response = await request(app.getHttpServer())
        .post('/reports')
        .field('name', 'Jakub')
        .field('surname', 'Surdej');

      expect(response.status).toBe(422);
      expect(response.body).toBeDefined();
      expect(response.body).toHaveProperty(
        'message',
        'You must provide a valid file',
      );
    });
  });
});

const getFilePath = (fileName: string) => join(__dirname, 'fixtures', fileName);
