import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { IfscService } from '../../../src/modules/ifsc/services/ifsc.service';
import { IfscRepository } from '../../../src/modules/ifsc/repositories/ifsc.repository';
import { IfscProviderFactory } from '../../../src/modules/ifsc/providers/ifsc-provider.factory';
import { IfscCacheService } from '../../../src/modules/ifsc/services/ifsc-cache.service';

describe('IfscService', () => {
  let service: IfscService;
  let repository: IfscRepository;
  let providerFactory: IfscProviderFactory;
  let cacheService: IfscCacheService;

  const mockIfscData = {
    ifsc: 'HDFC0CAGSBK',
    bank: 'HDFC Bank',
    branch: 'CAGSBK',
    address: '123 Main St',
    contact: '1234567890',
    city: 'Mumbai',
    district: 'Mumbai',
    state: 'Maharashtra',
    updatedAt: new Date(),
    _id: 'mock-id',
    __v: 0,
  } as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IfscService,
        {
          provide: IfscRepository,
          useValue: {
            findByIfsc: jest.fn(),
            upsert: jest.fn(),
          },
        },
        {
          provide: IfscProviderFactory,
          useValue: {
            getDefaultProvider: jest.fn(),
          },
        },
        {
          provide: IfscCacheService,
          useValue: {
            getIfscDetails: jest.fn(),
            setIfscDetails: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              const config = {
                freshnessDays: 7,
                cacheTtl: 60,
              };
              return config[key];
            }),
          },
        },
      ],
    }).compile();

    service = module.get<IfscService>(IfscService);
    repository = module.get<IfscRepository>(IfscRepository);
    providerFactory = module.get<IfscProviderFactory>(IfscProviderFactory);
    cacheService = module.get<IfscCacheService>(IfscCacheService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getIfscDetails', () => {
    it('should return cached data if available', async () => {
      jest.spyOn(cacheService, 'getIfscDetails').mockResolvedValue(mockIfscData);

      const result = await service.getIfscDetails('HDFC0CAGSBK');

      expect(result).toEqual(mockIfscData);
      expect(cacheService.getIfscDetails).toHaveBeenCalledWith('HDFC0CAGSBK');
    });

    it('should return fresh data from database if cache miss but data is fresh', async () => {
      const freshDate = new Date();
      freshDate.setDate(freshDate.getDate() - 1); // 1 day ago
      const freshData = { ...mockIfscData, updatedAt: freshDate };

      jest.spyOn(cacheService, 'getIfscDetails').mockResolvedValue(undefined);
      jest.spyOn(repository, 'findByIfsc').mockResolvedValue(freshData);
      jest.spyOn(cacheService, 'setIfscDetails').mockResolvedValue();

      const result = await service.getIfscDetails('HDFC0CAGSBK');

      expect(result).toEqual(freshData);
      expect(cacheService.setIfscDetails).toHaveBeenCalledWith('HDFC0CAGSBK', freshData, 60);
    });

    it('should fetch from external API if data is stale', async () => {
      const staleDate = new Date();
      staleDate.setDate(staleDate.getDate() - 10); // 10 days ago
      const staleData = { ...mockIfscData, updatedAt: staleDate };
      const mockProvider = { fetchIfscDetails: jest.fn() };

      jest.spyOn(cacheService, 'getIfscDetails').mockResolvedValue(undefined);
      jest.spyOn(repository, 'findByIfsc').mockResolvedValue(staleData);
      jest.spyOn(providerFactory, 'getDefaultProvider').mockReturnValue(mockProvider);
      jest.spyOn(mockProvider, 'fetchIfscDetails').mockResolvedValue(mockIfscData);
      jest.spyOn(repository, 'upsert').mockResolvedValue(mockIfscData);
      jest.spyOn(cacheService, 'setIfscDetails').mockResolvedValue();

      const result = await service.getIfscDetails('HDFC0CAGSBK');

      expect(result).toEqual(mockIfscData);
      expect(mockProvider.fetchIfscDetails).toHaveBeenCalledWith('HDFC0CAGSBK');
      expect(repository.upsert).toHaveBeenCalledWith(mockIfscData);
    });
  });
});

