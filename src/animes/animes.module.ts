import { Module } from '@nestjs/common';
import { AnimesController } from './animes.controller';
import { AnimesService } from './animes.service';

@Module({
    imports: [],
    controllers: [AnimesController],
    providers: [AnimesService],
    exports: [AnimesService]
})
export class AnimesModule {}
