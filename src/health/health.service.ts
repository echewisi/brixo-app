import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class HealthService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    private readonly cacheService: CacheService,
  ) {}

  async check() {
    const startTime = Date.now();
    
    const services = {
      database: await this.checkDatabase(),
      cache: await this.checkCache(),
      externalApi: await this.checkExternalApi(),
    };

    const isHealthy = Object.values(services).every(status => status === 'connected' || status === 'available');

    return {
      status: isHealthy ? 'ok' : 'error',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      services,
      responseTime: Date.now() - startTime,
    };
  }

  private async checkDatabase(): Promise<string> {
    try {
      const state = this.connection.readyState;
      return state === 1 ? 'connected' : 'disconnected';
    } catch (error) {
      return 'error';
    }
  }

  private async checkCache(): Promise<string> {
    try {
      await this.cacheService.set('health-check', 'test', 1);
      await this.cacheService.del('health-check');
      return 'connected';
    } catch (error) {
      return 'error';
    }
  }

  private async checkExternalApi(): Promise<string> {
    try {
      // Simple check - in a real scenario, you might want to ping the external API
      return 'available';
    } catch (error) {
      return 'unavailable';
    }
  }
}
