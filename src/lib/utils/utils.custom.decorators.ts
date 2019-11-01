import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';
import { User } from '../../modules/user/user.model.pg';

@ValidatorConstraint({ async: true })
export class IsEmailAlreadyExistConstraint
  implements ValidatorConstraintInterface {
  async validate(email: string): Promise<boolean> {
    const user = await User.findOne({ where: { email } });
    return user ? false : true;
  }
}

export function IsEmailAlreadyExist(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: Object.assign(
        {},
        {
          message:
            'Email $value already exists. Register with a new Email or use the Forgot password option.'
        },
        validationOptions
      ),
      constraints: [],
      validator: IsEmailAlreadyExistConstraint
    });
  };
}

@ValidatorConstraint({ async: true })
export class IsIdBelongingToUserConstraint
  implements ValidatorConstraintInterface {
  async validate(createdBy: string): Promise<boolean> {
    const user = await User.findOne({ where: { _id: createdBy } });
    return user ? true : false;
  }
}

export function IsIdBelongingToUser(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: Object.assign(
        {},
        {
          message:
            'ID $value does not belong to any user. Please use a valid user ID.'
        },
        validationOptions
      ),
      constraints: [],
      validator: IsIdBelongingToUserConstraint
    });
  };
}
