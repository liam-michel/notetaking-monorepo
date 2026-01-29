// src/prisma/prisma.service.ts
import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../../prisma/generated/prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  enableShutdownHooks(app: INestApplication) {
    // Use a non-async callback. Cast `this` to a type that exposes $on
    // to satisfy the generated Prisma client's typings without using `any`.
    const clientWithOn = this as unknown as PrismaClient & {
      $on: (event: 'beforeExit', callback: () => void) => void;
    };

    clientWithOn.$on('beforeExit', () => {
      void app.close();
    });
  }
}
