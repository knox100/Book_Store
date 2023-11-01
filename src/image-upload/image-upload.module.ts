import { Module } from '@nestjs/common';
import { ImageUploadService } from './image-upload.service';
import { ImageUploadController } from './image-upload.controller';
import { MinioClientModule } from 'src/minio-client/minio-client.module';
import { DataSource } from 'typeorm';
import { Book } from 'src/books/entities/book.entity';
import { Author } from 'src/author/entities/author.entity';
import { DatabaseModule } from 'src/database/database.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [MinioClientModule, DatabaseModule, HttpModule],
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
    ImageUploadService,
  ],
  controllers: [ImageUploadController],
})
export class ImageUploadModule {}
