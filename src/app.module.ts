import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { BookmarkModule } from './bookmark/bookmark.module';
@Module({
  controllers: [],
  providers: [],
  imports: [AuthModule, UserModule, PrismaModule, BookmarkModule,]
})
export class AppModule {}
