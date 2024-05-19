import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /*app.useGlobalPipes(new ValidationPipe({ //Validacion que se aplica a todas las 
      whitelist: true,                    //operaciones siempre y cuando tengan DTO
  }));*/
  await app.listen(3000);
}
bootstrap();
