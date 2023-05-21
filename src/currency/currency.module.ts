import { forwardRef, Module } from '@nestjs/common';
import { CurrencyController } from './currency.controller';
import { CurrencyService } from './currency.service';
import { HttpModule } from '@nestjs/axios/dist';
import { SellerModule } from '../seller/seller.module';

@Module({
  imports: [HttpModule, forwardRef(() => SellerModule)],
  controllers: [CurrencyController],
  providers: [CurrencyService],
  exports: [CurrencyService],
})
export class CurrencyModule {}
