import { Module, Logger } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DogsModule } from './dogs/dogs.module';
import { HistoricModule } from './historic/historic.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ConfigModule.forRoot(),
    DogsModule,
    HistoricModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [Logger],
})
export class AppModule {}
