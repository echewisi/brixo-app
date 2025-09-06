import { ApiProperty } from '@nestjs/swagger';

export class IfscResponseDto {
  @ApiProperty({ example: 'YESB0DNB002' })
  ifsc: string;

  @ApiProperty({ example: 'Delhi Nagrik Sehkari Bank' })
  bank: string;

  @ApiProperty({ example: 'DENS' })
  bankCode: string;

  @ApiProperty({ example: 'Delhi Nagrik Sehkari Bank IMPS' })
  branch: string;

  @ApiProperty({ example: 'DELHI' })
  centre: string;

  @ApiProperty({ example: 'DELHI' })
  district: string;

  @ApiProperty({ example: 'MAHARASHTRA' })
  state: string;

  @ApiProperty({ example: '720, NEAR GHANTAGHAR, SUBZI MANDI, DELHI - 110007' })
  address: string;

  @ApiProperty({ example: '+919560344685' })
  contact: string;

  @ApiProperty({ example: 'MUMBAI' })
  city: string;

  @ApiProperty({ example: '110196002' })
  micr: string;

  @ApiProperty({ example: true })
  imps: boolean;

  @ApiProperty({ example: true })
  upi: boolean;

  @ApiProperty({ example: true })
  rtgs: boolean;

  @ApiProperty({ example: true })
  neft: boolean;

  @ApiProperty({ example: '' })
  swift: string;

  @ApiProperty({ example: 'IN-MH' })
  iso3166: string;

  @ApiProperty({ example: '2024-01-15T10:30:00.000Z' })
  updatedAt: Date;
}
