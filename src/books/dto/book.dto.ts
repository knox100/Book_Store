export class CreateBookDto {
  title: string;
  genre: string;
  description: string;
  publicationDate: string;
}

export class UpdateBookDto extends CreateBookDto {}
