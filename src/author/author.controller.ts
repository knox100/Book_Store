import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto, UpdateAuthorDto } from './dto/author.dto';
import { Author } from './entities/author.entity';
import { ApiOperation } from '@nestjs/swagger';
import { Book } from 'src/books/entities/book.entity';

@Controller('author')
export class AuthorController {
  constructor(private authorService: AuthorService) {}

  // Create anuthor
  @Post()
  @ApiOperation({ summary: 'Create a author' })
  async createAuthor(@Body() payload: CreateAuthorDto): Promise<Author> {
    return this.authorService.createAuthor(payload);
  }

  // Get all auhtors
  @Get()
  @ApiOperation({ summary: 'Get all auhtors' })
  async getAllAuthors(): Promise<Author[]> {
    return this.authorService.authors();
  }

  // Get author by id
  @Get(':id')
  @ApiOperation({ summary: 'Get author by id' })
  async getAuthorbyId(@Param('id') id: number): Promise<Author> {
    return this.authorService.getAuhtorById(id);
  }

  // Get all books under a author
  @Get(':authorId/books')
  @ApiOperation({ summary: 'Get all books under a author' })
  async getAllAuthorBooks(@Param('authorId') id: number): Promise<Book[]> {
    const books = await this.authorService.getAllAuthorBooks(id);

    if (books.length === 0) {
      throw new NotFoundException('Author has no books!');
    } else {
      return books;
    }
  }

  // Update author details
  @Patch(':id')
  @ApiOperation({ summary: 'Update author details' })
  async updateAuthorDetails(
    @Param('id') id: number,
    @Body() payload: UpdateAuthorDto,
  ): Promise<Author> {
    return await this.authorService.updateAuthorDetails(id, payload);
  }

  // Delete author
  @Delete(':id')
  @ApiOperation({ summary: 'delete author ' })
  async deleteAuthor(@Param('id') id: number): Promise<Author> {
    return await this.authorService.deleteAuthor(id);
  }
}
