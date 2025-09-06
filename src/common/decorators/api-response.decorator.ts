import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export function ApiSuccessResponse(description: string, type?: any) {
  return applyDecorators(
    ApiResponse({
      status: 200,
      description,
      type,
    })
  );
}

export function ApiErrorResponse(status: number, description: string) {
  return applyDecorators(
    ApiResponse({
      status,
      description,
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: status },
          message: { type: 'string', example: description },
          timestamp: { type: 'string', example: '2024-01-15T10:30:00.000Z' },
          path: { type: 'string', example: '/ifsc/HDFC0CAGSBK' },
        },
      },
    })
  );
}
