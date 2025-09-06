import { Injectable } from '@nestjs/common';
import { CacheService } from '../../../cache/cache.service';
import { CacheKeyUtil } from '../../../common/utils/cache-key.util';

@Injectable()
export class IfscCacheService {
  constructor(private readonly cacheService: CacheService) {}

  async getIfscDetails(ifsc: string): Promise<any> {
    const key = CacheKeyUtil.getIfscKey(ifsc);
    return this.cacheService.get(key);
  }

  async setIfscDetails(ifsc: string, data: any, ttl?: number): Promise<void> {
    const key = CacheKeyUtil.getIfscKey(ifsc);
    await this.cacheService.set(key, data, ttl);
  }

  async deleteIfscDetails(ifsc: string): Promise<void> {
    const key = CacheKeyUtil.getIfscKey(ifsc);
    await this.cacheService.del(key);
  }

  async clearAllIfscCache(): Promise<void> {
    await this.cacheService.reset();
  }
}
