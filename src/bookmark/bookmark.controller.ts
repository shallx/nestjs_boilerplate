import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common"
import { GetUser } from "src/auth/decorator"
import { JwtGuard } from "src/auth/guard"
import { CreateBookmarkDto } from "./dto"
import { EditBookmarkDto } from "./dto/edit-bookmark.dto"
import { BookmarkService } from "./bookmark.service"

@Controller("bookmarks")
@UseGuards(JwtGuard)
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService){}

  @Get()
  getBookmarks(@GetUser("id") userId: number) {
    return this.bookmarkService.getBookmarks(userId);
  }

  @Post()
  createBookmark(@GetUser("id") userId: number, @Body() dto: CreateBookmarkDto) {
    return this.bookmarkService.createBookmark(userId, dto);
  }

  @Get(":id")
  getBookmark(
    @GetUser("id") userId: number,
    @Param("id", ParseIntPipe) bookmarkId: number,
  ) {
    return this.bookmarkService.getBookmark(userId, bookmarkId);
  }

  @Patch()
  editBookmark(
    @GetUser("id") userId: number,
    @Param("id", ParseIntPipe) bookmarkId: number,
    @Body() dto: EditBookmarkDto,
  ) {
    return this.bookmarkService.editBookmark(userId, bookmarkId, dto);
  }


  @Delete(":id")
  deleteBookmark(
    @GetUser("id") userId: number,
    @Param("id", ParseIntPipe) bookmarkId: number,
  ) {
    return this.bookmarkService.deleteBookmark(userId, bookmarkId);
  }
}
