import { createClient } from 'redis';
import Logger from './logger';

class RedisCache {
  private client = createClient({ legacyMode: true });

  constructor() {
    this.startClient();
  }

  public getClient() {
    return this.client;
  }

  private calcJitter() {
    return Math.ceil(Math.random() * 100);
  }

  private async startClient() {
    await this.client.connect();
    this.client.on('error', (err) => Logger.error('Redis Client Error', err));
  }

  public async setObject(key: string, data: object): Promise<void> {
    await this.client.setEx(
      key,
      60 * 5 + this.calcJitter(),
      JSON.stringify(data)
    );
  }

  public async getObject(key: string): Promise<string> {
    return await this.client.get(key);
  }

  public async exists(key: string): Promise<boolean> {
    return (await this.client.exists(key)) == 1;
  }
}

const redisClient = new RedisCache();
export default redisClient;
