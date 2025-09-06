import { ApiProperty } from '@nestjs/swagger';

export class BaseResponseDto {
  @ApiProperty({
    description: 'Response status code',
    example: 200,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Response message',
    example: 'Success',
  })
  message: string;

  @ApiProperty({
    description: 'Response timestamp',
    example: '2024-01-15T10:30:00.000Z',
  })
  timestamp: string;
}
