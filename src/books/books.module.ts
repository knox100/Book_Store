import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { DatabaseModule } from 'src/database/database.module';
import { DataSource } from 'typeorm';
import { Book } from './entities/book.entity';
import { Author } from 'src/author/entities/author.entity';
import { MinioClientModule } from 'src/minio-client/minio-client.module';

@Module({
  imports: [DatabaseModule, MinioClientModule],
  providers: [
    {
      provide: 'BOOK_REPO',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Book),
      inject: ['DATA_SOURCE'],
    },
    {
      provide: 'AUTHOR_REPO',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Author),
      inject: ['DATA_SOURCE'],
    },
    BooksService,
  ],
  controllers: [BooksController],
})
export class BooksModule {}
