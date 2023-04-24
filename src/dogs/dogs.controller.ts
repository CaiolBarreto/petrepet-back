import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { DogsService } from './dogs.service';
import { CreateDogDto } from './dto/create-dog.dto';

@Controller('dogs')
export class DogsController {
  constructor(private readonly dogsService: DogsService) {}

  // @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createDogDto: CreateDogDto, @Request() req) {
    return await this.dogsService.create({
      ...createDogDto,
      // tutor_id: req.user.id,
    });
  }

  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') tutor_id: string) {
    const dog = await this.dogsService.findByTutor(tutor_id);

    if (!dog) {
      throw new HttpException('Dog not found', HttpStatus.NOT_FOUND);
    }

    return dog;
  }
}
