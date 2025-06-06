import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DbConnection extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      log: ['query'],
    });
  }
  async onModuleInit() {
    await this.$connect();
  }
}
