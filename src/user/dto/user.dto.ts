import {PartialType} from '@nestjs/mapped-types';
import {CreateUserDto} from './create-user.dto';
import {IsEmail, IsOptional, IsString} from 'class-validator';
import {Expose} from 'class-transformer';

export class UserDto extends PartialType(CreateUserDto) {
    @Expose()
    id: number;

    @Expose()
    email: string;
}
