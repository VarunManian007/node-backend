import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3000;
  app.use(cors(
    { 
      origin: process.env.CORS_ORIGIN 
    }));
  await app.listen(port);
  console.log(`Application successfully started at Port ${port}`)
}
bootstrap();
