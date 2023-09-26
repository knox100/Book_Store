import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from 'src/author/entities/author.entity';
import { DataSource, Repository } from 'typeorm';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: 'AUTHOR_REPO',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Author),
      inject: ['DATA_SOURCE'],
    },
    AuthorService,
  ],
  controllers: [AuthorController],
})
export class AuthorModule {}
