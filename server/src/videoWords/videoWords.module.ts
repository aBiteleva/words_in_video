import { Module } from '@nestjs/common';
import { VideoWordsController } from './videoWords.controller';
import { VideoWordsService } from './videoWords.service';
import { MongooseModule } from '@nestjs/mongoose';
import { VideoWordsModel, VideoWordsSchema } from './models/videoWordsModel';

@Module({
    controllers: [VideoWordsController],
    providers: [VideoWordsService],
    imports: [
        MongooseModule.forFeature([
            {
                name: VideoWordsModel.name,
                schema: VideoWordsSchema,
            },
        ]),
    ],
})
export class VideoWordsModule {}
