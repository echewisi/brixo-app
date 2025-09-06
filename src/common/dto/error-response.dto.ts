import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty({
    description: 'Error status code',
    example: 400,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Error message',
    example: 'Invalid IFSC code format',
  })
  message: string;

  @ApiProperty({
    description: 'Error timestamp',
    example: '2024-01-15T10:30:00.000Z',
  })
  timestamp: string;

  @ApiProperty({
    description: 'Request path',
    example: '/ifsc/INVALID',
  })
  path: string;
}
