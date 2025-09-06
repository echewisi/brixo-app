import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HealthService } from '../health/health.service';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @ApiOperation({ summary: 'Health check endpoint' })
  @ApiResponse({ 
    status: 200, 
    description: 'Service is healthy',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'ok' },
        timestamp: { type: 'string', example: '2024-01-15T10:30:00.000Z' },
        uptime: { type: 'number', example: 123.456 },
        services: {
          type: 'object',
          properties: {
            database: { type: 'string', example: 'connected' },
            cache: { type: 'string', example: 'connected' },
            externalApi: { type: 'string', example: 'available' }
          }
        }
      }
    }
  })
  async check() {
    return this.healthService.check();
  }
}
