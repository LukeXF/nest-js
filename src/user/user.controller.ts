import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    UseInterceptors,
} from '@nestjs/common';
import {UserService} from './user.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {Serialize, SerializeInterceptor} from '../interceptors/serialize.interceptor';
import {UserDto} from './dto/user.dto';

@Serialize(UserDto)
@Controller('auth')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Post('/signup')
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Get()
    findAllUsers(@Query('email') email: string) {
        return this.userService.find(email);
    }

    @Get('/:id')
    // @UseInterceptors(new SerializeInterceptor(UserDto))
    findUser(@Param('id') id: string) {
        return this.userService.findOne(parseInt(id));
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(+id, updateUserDto);
    }

    @Delete('/:id')
    remove(@Param('id') id: string) {
        return this.userService.remove(+id);
    }
}
