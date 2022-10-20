import { Injectable } from '@nestjs/common';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookmarkService {
    constructor(private prisma : PrismaService){}

    getBookmarks(userId: number){
        return this.prisma.bookmark.findMany({
            where: {
                userId,
            }
        })
    }

    createBookmark(userId: number, dto: CreateBookmarkDto){
        console.log(dto);
        return this.prisma.bookmark.create({
            data: {
                userId,
                ...dto
            }
        })
    }

    getBookmark(userId: number, bookmarkId : number){}

    editBookmark(userId: number, bookmarkId : number, dto: EditBookmarkDto){}

    deleteBookmark(userId: number, bookmarkId : number){}
}
