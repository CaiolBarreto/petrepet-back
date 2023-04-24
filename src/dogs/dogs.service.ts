import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';

@Injectable()
export class DogsService {
  constructor(private prisma: PrismaService) {}

  async create(createDogDto: CreateDogDto) {
    return await this.prisma.dog.create({
      data: createDogDto,
    });
  }

  async find(tutor_id: number) {
    return await this.prisma.dog.findMany({ where: { tutor_id: tutor_id } });
  }

  async update(id: number, updateDogDto: UpdateDogDto) {
    return await this.prisma.dog.update({
      where: { id },
      data: updateDogDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.dog.delete({ where: { id } });
  }
}
