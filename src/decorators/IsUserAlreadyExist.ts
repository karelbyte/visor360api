import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsersService } from '../services/users.service';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUserAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly usersService: UsersService) {}
  async validate(email: string, args: ValidationArguments) {
    if (!email) return true;
    const [relatedPropertyName] = args.constraints;
    const relatedValue = (args.object as any)[relatedPropertyName];
    if (relatedValue) {
    }
    const user = relatedValue
      ? await this.usersService.findOneByEmailAndDifferentId(
          email,
          relatedValue,
        )
      : await this.usersService.findOneByEmail(email);
    return !user;
  }
}

export function IsUserAlreadyExist(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: NonNullable<unknown>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: IsUserAlreadyExistConstraint,
    });
  };
}
