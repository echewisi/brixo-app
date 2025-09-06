import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { IfscProvider } from '../../../common/interfaces/ifsc-provider.interface';
import { BaseIfscProvider } from './base-ifsc.provider';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class RazorpayIfscProvider extends BaseIfscProvider implements IfscProvider {
  private readonly baseUrl = 'https://ifsc.razorpay.com';

  constructor(private readonly httpService: HttpService) {
    super();
  }

  async fetchIfscDetails(ifsc: string): Promise<any> {
    try {
      this.validateIfsc(ifsc);
      
      const response = await firstValueFrom(
        this.httpService.get(`${this.baseUrl}/${ifsc.toUpperCase()}`)
      );

      if (!response.data || response.data === 'Not Found') {
        throw new HttpException('IFSC code not found', HttpStatus.NOT_FOUND);
      }

      return this.transformResponse(response.data);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to fetch IFSC details from external API',
        HttpStatus.SERVICE_UNAVAILABLE
      );
    }
  }
}