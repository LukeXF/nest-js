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
    Session,
} from '@nestjs/common';
import {UserService} from './user.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {
    Serialize,
    SerializeInterceptor,
} from '../interceptors/serialize.interceptor';
import {UserDto} from './dto/user.dto';
import {AuthService} from './auth.service';
import {CurrentUser} from "./decorators/current-user.decorator";
import {CurrentUserInterceptor} from "./interceptors/current-user.interceptor";
import {User} from "./entities/user.entity";

@Controller('auth')
@Serialize(UserDto)
@UseInterceptors(CurrentUserInterceptor)
export class UserController {
    constructor(
        private readonly userService: UserService,
        private authService: AuthService,
    ) {
    }

    // @Post('/colours/:colour')
    // setColour(@Param('colour') colour: string, @Session() session: any) {
    //     session.colour = colour;
    // }
    //
    // @Get('/colours')
    // getColour(@Session() session: any) {
    //     return session.colour;
    // }

    @Get('/me')
    async myUser(@CurrentUser() user: User) {
        // const user = await this.userService.findOne(session.userId);
        // session.userId = user.id;
        return user;
    }

    @Post('/signup')
    async createUser(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signUp(body.email, body.password);
        session.userId = user.id;
        return user;
    }

    @Post('/signout')
    async signOut(@Session() session: any) {
        session.userId = null;
    }

    @Post('/signin')
    async signIn(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signIn(body.email, body.password);
        session.userId = user.id;
        return user;
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
