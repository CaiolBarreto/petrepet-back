import { Logger, Module } from '@nestjs/common';
import { HistoricService } from './historic.service';
import { HistoricController } from './historic.controller';
import { PrismaService } from 'src/prisma.service';
import { HttpModule } from '@nestjs/axios';
import { DogsService } from 'src/dogs/dogs.service';

@Module({
  controllers: [HistoricController],
  providers: [HistoricService, PrismaService, Logger, DogsService],
  imports: [HttpModule],
  exports: [HistoricService],
})
export class HistoricModule {}
