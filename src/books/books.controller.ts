import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './entities/book.entity';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private bookService: BooksService) {}

  @Post(':authorId')
  async createBook(
    @Param('authorId') authorId: number,
    @Body() createBook: CreateBookDto,
  ): Promise<Book> {
    return await this.bookService.createBook(authorId, createBook);
  }

  @Get()
  async getAllBooks(): Promise<Book[]> {
    return await this.bookService.getAllBook();
  }

  @Get(':authorId')
  async getBookById(@Param('id') id: number): Promise<Book[]> {
    const book = await this.bookService.getAuthorBookById(id);

    if (!book) {
      throw new NotFoundException('Author does not exist!');
    } else {
      return book;
    }
  }
}
