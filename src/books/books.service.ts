import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Book } from './entities/book.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { Author } from 'src/author/entities/author.entity';

@Injectable()
export class BooksService {
  constructor(
    @Inject('BOOK_REPO')
    private bookRepository: Repository<Book>,

    @Inject('AUTHOR_REPO')
    private authorRepository: Repository<Author>,
  ) {}

  // Create a book under an author
  async createBook(
    authorId: number,
    createBookDto: CreateBookDto,
  ): Promise<Book> {
    const author = await this.authorRepository.findOne({
      where: {
        id: authorId,
      },
    });

    const newBook = new Book();
    newBook.author = author;
    newBook.title = createBookDto.title;
    newBook.genre = createBookDto.genre;
    newBook.description = createBookDto.description;

    const book = this.bookRepository.create(newBook);
    const createdBook = await this.bookRepository.save(book);

    return createdBook;
  }

  // Get all books
  async getAllBook(): Promise<Book[]> {
    return this.bookRepository.find({
      relations: {
        author: true,
      },
    });
  }

  //Get books by author id
  async getAuthorBookById(id: number): Promise<Book[]> {
    const book = this.bookRepository.find({
      where: {
        id,
      },
    });

    if (!book) {
      throw new HttpException(
        `Book with id ${id} was not found`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return book;
  }

  // // Update book details
  // async updateBookDetails(id: number, payload: CreateBookDto): Promise<Book> {
  //   const book = await this.bookRepository.findOne({
  //     where: {
  //       id,
  //     },
  //   });

  //   if (!book) {
  //     throw new HttpException(
  //       `Book with id ${id} was not found`,
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }

  //   book.genre = payload.genre;
  //   book.title = payload.title;

  //   const updatedBookDetails = await this.bookRepository.save(book);

  //   return updatedBookDetails;
  // }
}
