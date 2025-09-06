import { Injectable } from '@nestjs/common';
import { RazorpayIfscProvider } from './razorpay-ifsc.provider';
import { IfscProvider } from '../../../common/interfaces/ifsc-provider.interface';

export enum IfscProviderType {
  RAZORPAY = 'razorpay',
}

@Injectable()
export class IfscProviderFactory {
  constructor(private readonly razorpayProvider: RazorpayIfscProvider) {}

  getProvider(type: IfscProviderType = IfscProviderType.RAZORPAY): IfscProvider {
    switch (type) {
      case IfscProviderType.RAZORPAY:
        return this.razorpayProvider;
      default:
        throw new Error(`Unsupported IFSC provider type: ${type}`);
    }
  }

  getDefaultProvider(): IfscProvider {
    return this.getProvider(IfscProviderType.RAZORPAY);
  }
}
