import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
  constructor() // private bookRepository: Repository<Book>, // @InjectRepository(Book)
  {}

  // Create a book
  // async createBook(createBookDto: CreateBookDto): Promise<Book> {
  //   const book = this.bookRepository.create(createBookDto);
  //   const createdBook = await this.bookRepository.save(book);

  //   return createdBook;
  // }

  //Get all books
  // async getAllBook(): Promise<Book[]> {
  //   return this.bookRepository.find();
  // }

  // //Get book by id
  // async getBookById(id: number): Promise<Book> {
  //   const book = this.bookRepository.findOne({
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

  //   return book;
  // }

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
