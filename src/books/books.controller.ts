import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateBookDto, UpdateBookDto } from './dto/book.dto';
import { Book } from './entities/book.entity';
import { BooksService } from './books.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('books')
export class BooksController {
  constructor(private bookService: BooksService) {}

  //Create a book under a author
  @Post(':authorId')
  @ApiOperation({ summary: 'Create a book under a author' })
  async createBook(
    @Param('authorId') authorId: number,
    @Body() createBook: CreateBookDto,
  ): Promise<Book> {
    return await this.bookService.createBook(authorId, createBook);
  }

  //Get all books
  @Get()
  @ApiOperation({ summary: 'Get all books' })
  async getAllBooks(): Promise<Book[]> {
    return await this.bookService.books();
  }

  // Get book by id
  @Get(':id')
  @ApiOperation({ summary: 'Get book by id' })
  async getBookById(@Param('id') id: number): Promise<Book> {
    return this.bookService.getBookById(id);
  }

  // Update book details
  @Patch(':id')
  @ApiOperation({ summary: 'Update book details' })
  async updateBookDetails(
    @Param('id') id: number,
    @Body() payload: UpdateBookDto,
  ): Promise<Book> {
    return await this.bookService.updateBookDetails(id, payload);
  }

  // Delete Book
  @Delete(':id')
  @ApiOperation({ summary: 'Delete book ' })
  async deleteBook(@Param('id') id: number): Promise<Book> {
    return await this.bookService.deleteBook(id);
  }
}
