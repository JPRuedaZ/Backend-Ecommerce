import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiTags('Initial Entrypoint')
  @Get()
  getHello(): Promise<void> {
    return this.appService.preLoadData();
  }

  @Get('reset')
  reset(): Promise<void> {
   return this.appService.reset();
  
  }
}
