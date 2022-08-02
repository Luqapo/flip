import { OrderWorkerModule } from './order-worker.module';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

const logger = new Logger('Order-worker');

async function bootstrap() {
  const port = 3001;
  const app = await NestFactory.create<NestFastifyApplication>(
    OrderWorkerModule,
    new FastifyAdapter(),
  );
  await app.listen(port);
  logger.log(`Order Worker listen on: ${port}`);
}
bootstrap();

// async function bootstrap() {
//   const port = 3001;
//   const app = await NestFactory.createMicroservice(OrderWorkerModule, {
//     transport: Transport.TCP,
//     options: {
//       port,
//     },
//   });
//   await app.listen();
//   logger.log(`Order Worker listen on: ${port}`);
// }
// bootstrap();
