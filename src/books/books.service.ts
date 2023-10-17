import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { CreateBookDto, UpdateBookDto } from './dto/book.dto';
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
    newBook.publicationDate = createBookDto.publicationDate;

    const book = this.bookRepository.create(newBook);
    const createdBook = await this.bookRepository.save(book);

    return createdBook;
  }

  // Get all books
  async books(): Promise<Book[]> {
    return this.bookRepository.find({
      relations: {
        author: true,
      },
    });
  }

  // Get book by id
  async getBookById(id: number): Promise<Book> {
    const book = await this.bookRepository.findOne({
      where: {
        id,
      },
      relations: {
        author: true,
      },
    });

    if (!book) {
      throw new HttpException(
        `Book with id ${id} was not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return book;
  }

  // Update book details
  async updateBookDetails(id: number, payload: UpdateBookDto): Promise<Book> {
    const book = await this.bookRepository.findOne({
      where: {
        id,
      },
    });

    if (!book) {
      throw new HttpException(
        `Book with id ${id} was not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    book.genre = payload.genre;
    book.title = payload.title;
    book.description = payload.description;
    book.publicationDate = payload.publicationDate;

    const updatedBookDetails = await this.bookRepository.save(book);

    return updatedBookDetails;
  }

  // Delet book
  async deleteBook(id: number): Promise<Book> {
    const book = await this.bookRepository.findOne({
      where: {
        id,
      },
    });

    const deletedBook = await this.bookRepository.remove(book);

    if (deletedBook) {
      throw new HttpException(
        `Book with id ${id} has been deleted`,
        HttpStatus.NOT_FOUND,
      );
    }

    return deletedBook;
  }
}
