import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { RazorpayIfscProvider } from '../../../src/modules/ifsc/providers/razorpay-ifsc.provider';
import { of } from 'rxjs';

describe('RazorpayIfscProvider', () => {
  let provider: RazorpayIfscProvider;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RazorpayIfscProvider,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    provider = module.get<RazorpayIfscProvider>(RazorpayIfscProvider);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  describe('fetchIfscDetails', () => {
    it('should fetch and transform IFSC details', async () => {
      const mockResponse = {
        data: {
          IFSC: 'HDFC0CAGSBK',
          BANK: 'HDFC Bank',
          BANKCODE: 'HDFC',
          BRANCH: 'CAGSBK',
          CENTRE: 'MUMBAI',
          DISTRICT: 'Mumbai',
          STATE: 'Maharashtra',
          ADDRESS: '123 Main St',
          CONTACT: '1234567890',
          CITY: 'Mumbai',
          MICR: '400240002',
          IMPS: true,
          UPI: true,
          RTGS: true,
          NEFT: true,
          SWIFT: 'HDFCINBB',
          ISO3166: 'IN-MH',
        },
      };

      jest.spyOn(httpService, 'get').mockReturnValue(of(mockResponse) as any);

      const result = await provider.fetchIfscDetails('HDFC0CAGSBK');

      expect(result).toEqual({
        ifsc: 'HDFC0CAGSBK',
        bank: 'HDFC Bank',
        bankCode: 'HDFC',
        branch: 'CAGSBK',
        centre: 'MUMBAI',
        district: 'Mumbai',
        state: 'Maharashtra',
        address: '123 Main St',
        contact: '1234567890',
        city: 'Mumbai',
        micr: '400240002',
        imps: true,
        upi: true,
        rtgs: true,
        neft: true,
        swift: 'HDFCINBB',
        iso3166: 'IN-MH',
        updatedAt: expect.any(Date),
      });
    });

    it('should throw error for invalid IFSC', async () => {
      const mockResponse = {
        data: 'Not Found',
      };

      jest.spyOn(httpService, 'get').mockReturnValue(of(mockResponse) as any);

      await expect(provider.fetchIfscDetails('INVALID')).rejects.toThrow('Failed to fetch IFSC details from external API');
    });
  });
});

