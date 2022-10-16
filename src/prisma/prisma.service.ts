import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor(config: ConfigService){ // As ConfigModule is imported at appModule, it gets available as ConfigService here
        super({
            datasources: {
                db: {
                    url: config.get('DATABASE_URL') // 'DATABASE_URL' corresponds to env file
                }
            }
        })
    }

    cleanDb(){
        return this.$transaction([ // Sequencial operation and if fail revert
            this.bookmark.deleteMany(),
            this.user.deleteMany(),
        ])
    }
}
