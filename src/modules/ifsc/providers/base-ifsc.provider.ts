import { Injectable } from '@nestjs/common';
import { IfscProvider } from '../../../common/interfaces/ifsc-provider.interface';

@Injectable()
export abstract class BaseIfscProvider implements IfscProvider {
  abstract fetchIfscDetails(ifsc: string): Promise<any>;

  protected validateIfsc(ifsc: string): void {
    if (!ifsc || ifsc.length !== 11) {
      throw new Error('Invalid IFSC code length');
    }

    const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    if (!ifscRegex.test(ifsc)) {
      throw new Error('Invalid IFSC code format');
    }
  }

  protected transformResponse(data: any): any {
    return {
      ifsc: data.IFSC || data.ifsc,
      bank: data.BANK || data.bank,
      branch: data.BRANCH || data.branch,
      address: data.ADDRESS || data.address,
      contact: data.CONTACT || data.contact,
      city: data.CITY || data.city,
      district: data.DISTRICT || data.district,
      state: data.STATE || data.state,
      updatedAt: new Date(),
    };
  }
}
