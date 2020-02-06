import { Module } from '@nestjs/common';
import { AnimesController } from './animes.controller';
import { AnimesService } from './animes.service';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [UsersModule],
    controllers: [AnimesController],
    providers: [AnimesService],
    exports: [AnimesService]
})
export class AnimesModule {}
