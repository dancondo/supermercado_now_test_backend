import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AnimesController } from './animes/animes.controller';
import { AnimesService } from './animes/animes.service';
import { AnimesModule } from './animes/animes.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost/supermercado-now'),
    AuthModule,
    UsersModule,
    AnimesModule
  ],
  controllers: [AnimesController],
  providers: [AnimesService],
})
export class AppModule { }
