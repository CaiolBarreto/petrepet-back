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

  async findOne(id: string) {
    return await this.prisma.dog.findUnique({ where: { id } });
  }

  async findByTutor(tutor_id: string) {
    return await this.prisma.dog.findMany({ where: { tutor_id: tutor_id } });
  }

  async update(id: string, updateDogDto: UpdateDogDto) {
    return await this.prisma.dog.update({
      where: { id },
      data: updateDogDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.dog.delete({ where: { id } });
  }
}
