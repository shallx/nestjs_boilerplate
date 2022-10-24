import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
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
        return this.prisma.bookmark.create({
            data: {
                userId,
                ...dto
            }
        })
    }

    async getBookmark(userId: number, bookmarkId : number){
        
        const bookmark = await this.prisma.bookmark.findFirst({
            where: {
                id: bookmarkId,
                userId: userId,
            }
        })
        if(!bookmark) throw new NotFoundException()
        if(bookmark.userId != userId) throw new ForbiddenException()
        return bookmark;
    }

    async editBookmark(userId: number, bookmarkId : number, dto: EditBookmarkDto){
        const bookmark = await this.prisma.bookmark.findUnique({
            where: {
                id: bookmarkId
            }
        })

        // If no bookmark or if bookmark does't belongs to user, throw exception
        if(!bookmark || bookmark.userId != userId){
            throw new ForbiddenException();
        }

        return this.prisma.bookmark.update({
            where: {
                id: bookmarkId
            },
            data: {
                ...dto,
            }
        })
    }

    async deleteBookmark(userId: number, bookmarkId : number){
        const bookmark = await this.prisma.bookmark.findUnique({
            where: {
                id: bookmarkId
            }
        })

        // If no bookmark or if bookmark does't belongs to user, throw exception
        if(!bookmark || bookmark.userId != userId){
            throw new ForbiddenException();
        }

        return this.prisma.bookmark.delete({
            where: {
                id: bookmarkId,
            }
        })
    }
}
