import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ifsc } from '../../../database/schemas/ifsc.schema';

@Injectable()
export class IfscRepository {
  constructor(@InjectModel(Ifsc.name) private readonly ifscModel: Model<Ifsc>) {}

  async findByIfsc(ifsc: string) {
    return this.ifscModel.findOne({ ifsc });
  }

  async upsert(ifscData: Partial<Ifsc>) {
    return this.ifscModel.findOneAndUpdate(
      { ifsc: ifscData.ifsc },
      { $set: ifscData },
      { upsert: true, new: true }
    );
  }
}
