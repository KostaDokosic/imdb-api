import * as request from 'supertest';
import createApp from '@app/app';

const app = createApp();

describe('Health Check tests', () => {
  it('should get valid health response from api.', async () => {
    const response = await request(app).get('/api/monitor/health');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('OK');
  });
});
