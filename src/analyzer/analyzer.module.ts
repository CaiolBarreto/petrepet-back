import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { DogsService } from 'src/dogs/dogs.service';
import { HistoricService } from 'src/historic/historic.service';
import { PrismaService } from 'src/prisma.service';
import { AnalyzerController } from './analyzer.controller';

@Module({
  controllers: [AnalyzerController],
  providers: [DogsService, PrismaService, HistoricService],
  imports: [HttpModule],
})
export class AnalyzerModule {}
