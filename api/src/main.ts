import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { AppModule } from './app.module';

const PORT = process.env.PORT ?? 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.use(helmet());
  const config = new DocumentBuilder()
    .setTitle('Quick-Talk APIs.')
    .setDescription('Quick-Talk APIs.')
    .setVersion('1.0')
    .addTag('real-time chat')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);
  app.setGlobalPrefix('api');
  await app.listen(PORT);
}

bootstrap()
  .then(() => console.log(`Server is listening on port ${PORT}`))
  .catch(console.error);
