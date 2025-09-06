import { IsString, Length } from 'class-validator';

export class IfscRequestDto {
  @IsString()
  @Length(11, 11)
  ifsc: string;
}
