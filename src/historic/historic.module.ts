import { Logger, Module } from '@nestjs/common';
import { HistoricService } from './historic.service';
import { HistoricController } from './historic.controller';
import { PrismaService } from 'src/prisma.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [HistoricController],
  providers: [HistoricService, PrismaService, Logger],
  imports: [HttpModule],
  exports: [HistoricService],
})
export class HistoricModule {}
