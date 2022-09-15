import { ArgumentMetadata, HttpException, Injectable, PipeTransform } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';

@Injectable()
export class ValidateCreateUserPipe implements PipeTransform {
  transform(value: CreateUserDto, metadata: ArgumentMetadata) {
    const parseAgeToInt = parseInt(value.age)

    if(isNaN(parseAgeToInt)) {
      throw new HttpException('Age is not a number', 400);
    }
    return {...value, age: parseAgeToInt}
  }
}
