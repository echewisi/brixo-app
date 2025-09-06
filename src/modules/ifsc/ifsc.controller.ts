import { Controller, Get, Param, UsePipes, UseFilters } from '@nestjs/common';
import { IfscService } from './services/ifsc.service';
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import { IfscResponseDto } from './dto/ifsc-response.dto';
import { IfscValidationPipe } from '../../common/pipes/ifsc-validation.pipe';
import { ValidationExceptionFilter } from '../../common/exceptions/validation-exception.filter';
import { BusinessExceptionFilter } from '../../common/exceptions/business-exception.filter';

@ApiTags('IFSC')
@Controller('ifsc')
@UseFilters(ValidationExceptionFilter, BusinessExceptionFilter)
export class IfscController {
  constructor(private readonly ifscService: IfscService) {}

  @Get(':ifsc')
  @UsePipes(new IfscValidationPipe())
  @ApiOperation({ 
    summary: 'Get IFSC details',
    description: 'Retrieves IFSC (Indian Financial System Code) details from cache, database, or external API'
  })
  @ApiParam({ 
    name: 'ifsc', 
    description: '11-character IFSC code (e.g., HDFC0CAGSBK)',
    example: 'HDFC0CAGSBK'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'IFSC details retrieved successfully',
    type: IfscResponseDto 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Invalid IFSC code format' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'IFSC code not found' 
  })
  @ApiResponse({ 
    status: 503, 
    description: 'External API service unavailable' 
  })
  async getIfsc(@Param('ifsc') ifsc: string): Promise<IfscResponseDto> {
    return await this.ifscService.getIfscDetails(ifsc);
  }
}
