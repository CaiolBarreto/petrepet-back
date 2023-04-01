import { Module } from '@nestjs/common';
import { HistoricService } from './historic.service';
import { HistoricController } from './historic.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [HistoricController],
  providers: [HistoricService, PrismaService],
  exports: [HistoricService],
})
export class HistoricModule {}
