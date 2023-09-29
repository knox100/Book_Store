import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { AuthorModule } from './author/author.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [BooksModule, AuthorModule, DatabaseModule],
  providers: [],
})
export class AppModule {}
