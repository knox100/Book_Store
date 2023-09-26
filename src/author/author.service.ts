import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Author } from './entities/author.entity';
import { Repository } from 'typeorm';
import { CreateAuthorDto } from './dto/create-author.dto';

@Injectable()
export class AuthorService {
  constructor(
    @Inject('AUTHOR_REPO')
    private authorRepository: Repository<Author>,
  ) {}

  async createAuthor(payload: CreateAuthorDto): Promise<Author> {
    const author = this.authorRepository.create(payload);
    const createdAuthor = await this.authorRepository.save(author);

    return createdAuthor;
  }

  async getAllAuthors(): Promise<Author[]> {
    return this.authorRepository.find();
  }

  async getAuhtorById(id: number): Promise<Author> {
    const author = this.authorRepository.findOne({
      where: {
        id,
      },
    });

    if (!author) {
      throw new HttpException(
        `Book with id ${id} was not found`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return author;
  }
}
