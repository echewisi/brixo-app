import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class IfscValidationPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      throw new BadRequestException('IFSC code is required');
    }

    const ifsc = value.toUpperCase().trim();
    
    // IFSC code should be 11 characters long
    if (ifsc.length !== 11) {
      throw new BadRequestException('IFSC code must be exactly 11 characters long');
    }

    // IFSC format: 4 letters (bank code) + 7 alphanumeric characters
    const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    if (!ifscRegex.test(ifsc)) {
      throw new BadRequestException('Invalid IFSC code format. Expected format: XXXX0XXXXXX');
    }

    return ifsc;
  }
}

