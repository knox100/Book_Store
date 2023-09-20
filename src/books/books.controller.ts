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

  @Post()
  async createBook(@Body() createBook: CreateBookDto): Promise<Book> {
    return await this.bookService.createBook(createBook);
  }

  @Get()
  async getAllBooks(): Promise<Book[]> {
    return await this.bookService.getAllBook();
  }

  @Get(':id')
  async getBookById(@Param('id') id: number): Promise<Book> {
    const book = await this.bookService.getBookById(id);

    if (!book) {
      throw new NotFoundException('User does not exist!');
    } else {
      return book;
    }
  }

  @Patch(':id')
  async updateBookDetails(
    @Param('id') id: number,
    @Body() payload: CreateBookDto,
  ) {
    return await this.bookService.updateBookDetails(id, payload);
  }
}
