import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { AuthorModule } from './author/author.module';
import { DatabaseModule } from './database/database.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    BooksModule,
    AuthorModule,
    DatabaseModule,
    MulterModule.register({
      dest: './files',
    }),
  ],

  providers: [],
})
export class AppModule {}
