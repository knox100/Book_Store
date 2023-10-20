export class CreateBookDto {
  title: string;
  genre: string;
  description: string;
  publicationDate: string;
  image_url: string;
}

export class UpdateBookDto extends CreateBookDto {}
