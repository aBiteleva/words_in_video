import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { IVideoWords, LangType } from '../interfaces/videoWords.interfave';

@Schema({ collection: 'videoWords', timestamps: true })
export class VideoWordsModel extends Document implements IVideoWords {
    @ApiProperty({ example: '1', description: 'Id' })
    @Prop({ required: true })
    videoId: string;

    @ApiProperty({ example: 'https://youtube.com/', description: 'Ссылка на видео' })
    @Prop({ required: true })
    videoLink: string;

    @ApiProperty({ example: 'hello', description: 'Слово' })
    @Prop()
    word: string;

    @ApiProperty({ example: '3', description: 'Количество вхождений' })
    @Prop()
    countNumber: number;

    @ApiProperty({ example: '11:20 22-07-2023', description: 'Время запроса' })
    @Prop()
    requestDate: Date;

    @ApiProperty({ example: 'ru', description: 'Язык слова' })
    @Prop()
    lang: LangType;
}

export const VideoWordsSchema = SchemaFactory.createForClass(VideoWordsModel);
