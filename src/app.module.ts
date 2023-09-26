import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './books/entities/book.entity';
import { Author } from './author/entities/author.entity';
import { AuthorService } from './author/author.service';
import { AuthorModule } from './author/author.module';
import { DataSource } from 'typeorm';
import { DatabaseModule } from './database/database.module';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [BooksModule, AuthorModule, DatabaseModule, CustomerModule],
  providers: [],
})
export class AppModule {}
