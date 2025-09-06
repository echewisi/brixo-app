import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IfscRepository } from '../repositories/ifsc.repository';
import { IfscProviderFactory } from '../providers/ifsc-provider.factory';
import { IfscCacheService } from './ifsc-cache.service';
import { IfscResponseDto } from '../dto/ifsc-response.dto';
import { DateUtil } from '../../../common/utils/date.util';

@Injectable()
export class IfscService {
  constructor(
    private readonly ifscRepository: IfscRepository,
    private readonly providerFactory: IfscProviderFactory,
    private readonly cacheService: IfscCacheService,
    private readonly configService: ConfigService,
  ) {}

  async getIfscDetails(ifsc: string): Promise<IfscResponseDto> {
    const normalizedIfsc = ifsc.toUpperCase();

    // 1. Check cache first
    const cachedData = await this.cacheService.getIfscDetails(normalizedIfsc);
    if (cachedData) {
      return cachedData;
    }

    // 2. Check database for existing data
    const existingData = await this.ifscRepository.findByIfsc(normalizedIfsc);
    
    const freshnessDays = this.configService.get<number>('freshnessDays', 7);
    if (existingData && DateUtil.isDateFresh(existingData.updatedAt, freshnessDays)) {
      // Data is fresh, cache it and return
      const cacheTtl = this.configService.get<number>('cacheTtl', 60);
      await this.cacheService.setIfscDetails(normalizedIfsc, existingData, cacheTtl);
      return existingData;
    }

    // 3. Fetch from external API
    const provider = this.providerFactory.getDefaultProvider();
    const freshData = await provider.fetchIfscDetails(normalizedIfsc);
    
    // 4. Update database
    const updatedData = await this.ifscRepository.upsert(freshData);
    
    // 5. Cache the fresh data
    const cacheTtl = this.configService.get<number>('cacheTtl', 60);
    await this.cacheService.setIfscDetails(normalizedIfsc, updatedData, cacheTtl);
    
    return updatedData;
  }
}

