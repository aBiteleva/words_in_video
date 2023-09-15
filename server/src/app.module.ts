import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoConfig } from '../config/db-connect.config';
import { VideoWordsModule } from './videoWords/videoWords.module';

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            isGlobal: true, // Позволяет обратиться к env во всем приложении
            envFilePath: `.env`, // Указываем путь до env файла
        }),
        MongooseModule.forRootAsync({
            // Модуль для работы с mongo
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getMongoConfig, // добавляем созданную ранее функцию подключения к БД
        }),
        VideoWordsModule,
    ],
})
export class AppModule {}
