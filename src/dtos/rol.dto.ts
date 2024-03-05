interface IRolDto {
  id: string;
  code: string;
  description: string;
}
export class RolDto {
  id: string;
  code: string;
  description: string;
  constructor({ id, code, description }: IRolDto) {
    this.id = id;
    this.code = code;
    this.description = description;
  }
}
