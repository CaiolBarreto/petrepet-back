import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DogsModule } from './dogs/dogs.module';

@Module({
  imports: [UsersModule, AuthModule, ConfigModule.forRoot(), DogsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
