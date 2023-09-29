import { ApiHideProperty } from '@nestjs/swagger';
import { Book } from 'src/books/entities/book.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  about: string;

  @ApiHideProperty()
  @OneToMany(() => Book, (book) => book.author)
  books: Book[];
}
