import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { Author } from './entities/author.entity';

@Controller('author')
export class AuthorController {
  constructor(private authorService: AuthorService) {}

  @Post()
  async createAuthor(@Body() payload: CreateAuthorDto): Promise<Author> {
    return this.authorService.createAuthor(payload);
  }

  @Get()
  async getAllAuthors(): Promise<Author[]> {
    return this.authorService.getAllAuthors();
  }

  @Get(':id')
  async getAuthorbyId(@Param('id') id: number): Promise<Author> {
    return this.authorService.getAuhtorById(id);
  }
}
