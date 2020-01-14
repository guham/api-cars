import {
    ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface
} from 'routing-controllers/node_modules/class-validator';
import {
    registerDecorator
} from 'routing-controllers/node_modules/class-validator/register-decorator';

@ValidatorConstraint({ name: 'StringNumberMaxValue' })
export class StringNumberMaxValueConstraint implements ValidatorConstraintInterface {
    public validate(numberString: string, args: ValidationArguments): boolean {
        const [maxValue] = args.constraints;
        return Number(numberString) <= maxValue;
    }

    public defaultMessage(args: ValidationArguments): string {
        const [maxValue] = args.constraints;
        return `${args.property} must be less than or equal to ${maxValue}`;
    }
}

export const StringNumberMaxValue = (maxValue: number, validationOptions?: ValidationOptions): any =>
    (object: object, propertyName: string): void => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [maxValue],
            validator: StringNumberMaxValueConstraint,
        });
    };
