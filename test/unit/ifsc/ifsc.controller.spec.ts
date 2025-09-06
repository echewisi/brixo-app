import { Test, TestingModule } from '@nestjs/testing';
import { IfscController } from '../../../src/modules/ifsc/ifsc.controller';
import { IfscService } from '../../../src/modules/ifsc/services/ifsc.service';

describe('IfscController', () => {
  let controller: IfscController;
  let service: IfscService;

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
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IfscController],
      providers: [
        {
          provide: IfscService,
          useValue: {
            getIfscDetails: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<IfscController>(IfscController);
    service = module.get<IfscService>(IfscService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getIfsc', () => {
    it('should return IFSC details', async () => {
      jest.spyOn(service, 'getIfscDetails').mockResolvedValue(mockIfscData);

      const result = await controller.getIfsc('HDFC0CAGSBK');

      expect(result).toEqual(mockIfscData);
      expect(service.getIfscDetails).toHaveBeenCalledWith('HDFC0CAGSBK');
    });
  });
});

