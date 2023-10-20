import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { AuthorModule } from './author/author.module';
import { DatabaseModule } from './database/database.module';
import { MinioClientModule } from './minio-client/minio-client.module';
import { ConfigModule } from '@nestjs/config';
import { ImageUploadModule } from './image-upload/image-upload.module';

@Module({
  imports: [
    BooksModule,
    AuthorModule,
    DatabaseModule,
    MinioClientModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ImageUploadModule,
  ],
  providers: [],
})
export class AppModule {}
