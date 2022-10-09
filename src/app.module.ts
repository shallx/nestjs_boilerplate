import { Module } from "@nestjs/common"
import { AuthModule } from "./auth/auth.module"
import { UserModule } from "./user/user.module"
import { PrismaModule } from "./prisma/prisma.module"
import { BookmarkModule } from "./bookmark/bookmark.module"
import { ConfigModule } from "@nestjs/config"
@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true // Makes it available to other modules
    }),
    AuthModule,
    UserModule,
    PrismaModule,
    BookmarkModule,
  ],
})
export class AppModule {}
