import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function start() {
    const PORT = process.env.PORT || 4000;

    const corsOptions = {
        origin: ['http://localhost:3011', 'http://192.168.2.90:3011', 'http://localhost:3000'],
        methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
        preflightContinue: false,
        optionsSuccessStatus: 204,
        credentials: true,
        allowedHeaders: ['Accept', 'Content-Type', 'Authorization'],
    };

    const app = await NestFactory.create(AppModule, { cors: corsOptions });

    const config = new DocumentBuilder()
        .setTitle('Поиск слов в видео')
        .setDescription('Документация REST API')
        .setVersion('1.0.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);

    await app.listen(PORT, () => console.log(`Server start on port = ${PORT}`));
}
start();
