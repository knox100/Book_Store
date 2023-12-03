import { Inject, Injectable } from '@nestjs/common';
import { MinioClientService } from 'src/minio-client/minio-client.service';
import { BufferedFile } from 'src/minio-client/file.model';
import { Repository } from 'typeorm';
import { Book } from 'src/books/entities/book.entity';
import { Author } from 'src/author/entities/author.entity';
// import { HttpService } from '@nestjs/axios';

@Injectable()
export class ImageUploadService {
  constructor(
    @Inject('BOOK_REPO')
    private bookRepository: Repository<Book>,

    @Inject('AUTHOR_REPO')
    private authorRepository: Repository<Author>,

    private minioClientService: MinioClientService,

    // private httpService: HttpService,
  ) {}

  async uploadImage(image: BufferedFile) {
    // const author = await this.authorRepository.findOne({
    //   where: {
    //     id: authorId,
    //   },
    // });

    // if (!author) {
    //   throw new HttpException(
    //     `Author with id ${authorId} was not found`,
    //     HttpStatus.NOT_FOUND,
    //   );
    // }

    // const book = await this.bookRepository.findOne({
    //   where: {
    //     id: bookId,
    //   },
    // });

    // if (!book) {
    //   throw new HttpException(
    //     `Author with id ${bookId} was not found`,
    //     HttpStatus.NOT_FOUND,
    //   );
    // }

    // const data = new FormData();
    // data.append('BucketName', 'test-bucket');
    // data.append('Image', image.buffer);

    // const upload = await firstValueFrom(
    //   this.httpService.post(`http://192.168.0.101:9090/browser`, data, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   }),
    // );
    const uploaded_image = await this.minioClientService.upload(image);

    return {
      image_url: uploaded_image.url,
      message: 'Image upload successful',
    };
  }
}
