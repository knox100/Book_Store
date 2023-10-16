export class CreateAuthorDto {
  firstName: string;
  lastName: string;
  about: string;
}

export class UpdateAuthorDto extends CreateAuthorDto {}
