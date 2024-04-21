import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from './decorators/roles.decorator';
import { AuthGuard } from './guards/auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Role } from './utils/roles.enum';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiTags('Initial Entrypoint')
  @Get()
  getHello(): Promise<void> {
    return this.appService.preLoadData();
  }
  @ApiBearerAuth()
  @ApiTags('Reset Data')
  @Get('reset')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard,RolesGuard)
  reset(): Promise<void> {
   return this.appService.reset();
  
  }
}
