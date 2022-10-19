import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { CreateBookmarkDto } from './dto';

@Controller('bookmarks')
@UseGuards(JwtGuard)
export class BookmarkController {
    @Get()
    getBookmarks(@GetUser('id') id: number){}

    @Post()
    createBookmark(@GetUser('id') id: number, @Body() dto: CreateBookmarkDto){}

    @Get(':id')
    getBookmarkById(@GetUser('id') id: number, @Param('id', ParseIntPipe) bookmarkId : number){}

    @Delete(':id')
    deleteBookmarkById(@GetUser('id') id: number){}
}
