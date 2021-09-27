import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { checkToken } from './utils/sig-utils';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  checkSig(
    @Query('signature') signature: string,
    @Query('timestamp') timestamp: string,
    @Query('nonce') nonce: string,
    @Query('echostr') echostr: string,
  ): string {
    if (checkToken(signature, timestamp, nonce)) {
      return echostr;
    }
    return '';
  }
}
