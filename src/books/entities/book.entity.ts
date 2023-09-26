import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Author } from '../../author/entities/author.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  genre: string;

  @Column()
  about: string;

  // @ManyToOne(() => Author, (author) => author.books)
  // @JoinColumn({ name: 'authorId' })
  // author: Author;
}
