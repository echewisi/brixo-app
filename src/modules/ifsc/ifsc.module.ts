import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IfscController } from './ifsc.controller';
import { IfscService } from './services/ifsc.service';
import { IfscCacheService } from './services/ifsc-cache.service';
import { RazorpayIfscProvider } from './providers/razorpay-ifsc.provider';
import { BaseIfscProvider } from './providers/base-ifsc.provider';
import { IfscProviderFactory } from './providers/ifsc-provider.factory';
import { IfscRepository } from './repositories/ifsc.repository';
import { CacheService } from '../../cache/cache.service';
import { Ifsc, IfscSchema } from '../../database/schemas/ifsc.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Ifsc.name, schema: IfscSchema }]),
  ],
  controllers: [IfscController],
  providers: [
    IfscService,
    IfscCacheService,
    RazorpayIfscProvider,
    IfscProviderFactory,
    IfscRepository,
    CacheService,
  ],
  exports: [IfscService, IfscCacheService],
})
export class IfscModule {}
