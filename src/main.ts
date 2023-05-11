import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('mscustomer');
  const configService = app.get(ConfigService);

  await app.listen(Number(configService.get('APP_PORT')));
}
bootstrap();
