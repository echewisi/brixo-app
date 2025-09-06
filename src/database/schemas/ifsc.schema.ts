import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type IfscDocument = Ifsc & Document;

@Schema({ timestamps: true })
export class Ifsc {
  @Prop({ required: true, unique: true, uppercase: true })
  ifsc: string;

  @Prop({ required: true })
  bank: string;

  @Prop({ required: true })
  bankCode: string;

  @Prop({ required: true })
  branch: string;

  @Prop({ required: true })
  centre: string;

  @Prop({ required: true })
  district: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  contact: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  micr: string;

  @Prop({ default: false })
  imps: boolean;

  @Prop({ default: false })
  upi: boolean;

  @Prop({ default: false })
  rtgs: boolean;

  @Prop({ default: false })
  neft: boolean;

  @Prop({ default: '' })
  swift: string;

  @Prop({ required: true })
  iso3166: string;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const IfscSchema = SchemaFactory.createForClass(Ifsc);

