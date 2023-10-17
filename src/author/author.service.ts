import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Author } from './entities/author.entity';
import { Repository } from 'typeorm';
import { CreateAuthorDto, UpdateAuthorDto } from './dto/author.dto';
import { Book } from 'src/books/entities/book.entity';

@Injectable()
export class AuthorService {
  constructor(
    @Inject('AUTHOR_REPO')
    private authorRepository: Repository<Author>,
  ) {}

  // Create author
  async createAuthor(payload: CreateAuthorDto): Promise<Author> {
    const author = this.authorRepository.create(payload);
    const createdAuthor = await this.authorRepository.save(author);

    return createdAuthor;
  }

  // Get all author
  async authors(): Promise<Author[]> {
    return this.authorRepository.find();
  }

  // Get auhtor by id
  async getAuhtorById(id: number): Promise<Author> {
    const author = await this.authorRepository.findOne({
      where: {
        id,
      },
    });

    if (!author) {
      throw new HttpException(
        `Author with id ${id} was not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return author;
  }

  //Get all books under author
  async getAllAuthorBooks(id: number): Promise<Book[]> {
    const author = await this.authorRepository.findOne({
      where: {
        id: id,
      },
      relations: ['books'],
    });

    if (!author) {
      throw new HttpException(
        `Author with id ${id} was not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return author.books.map((book) => ({
      authorId: author.id,
      ...book,
    }));
  }

  // Update auhtor details
  async updateAuthorDetails(
    id: number,
    payload: UpdateAuthorDto,
  ): Promise<Author> {
    const author = await this.authorRepository.findOne({
      where: {
        id,
      },
    });

    if (!author) {
      throw new HttpException(
        `Author with id ${id} was not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    author.firstName = payload.firstName;
    author.lastName = payload.lastName;
    author.about = payload.about;

    const updatedAuthor = this.authorRepository.save(author);

    return updatedAuthor;
  }

  // Delete author
  async deleteAuthor(id: number): Promise<Author> {
    const author = await this.authorRepository.findOne({
      where: {
        id,
      },
    });

    const deletedAuthor = await this.authorRepository.remove(author);

    return deletedAuthor;
  }
}
