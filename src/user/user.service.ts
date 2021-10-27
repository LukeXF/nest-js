import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {Repository} from 'typeorm';
import {User} from './entities/user.entity';
import {InjectRepository} from '@nestjs/typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private repo: Repository<User>) {
    }

    create({email, password}: CreateUserDto) {
        const user = this.repo.create({email, password});
        return this.repo.save(user);
    }

    findAll() {
        return this.repo.find();
    }

    async findOne(id: number) {
        if (!id) throw new NotFoundException('ID not found');
        const user = await this.repo.findOne({id});
        console.log({2: user})
        if (!user) throw new NotFoundException('user not found');
        return user;
    }

    find(email: string) {
        return this.repo.find({email});
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        const user = await this.findOne(id);
        if (!user) throw new NotFoundException('user not found');

        Object.assign(user, updateUserDto);
        return this.repo.save(user);
    }

    async remove(id: number) {
        const user = await this.findOne(id);
        if (!user) throw new NotFoundException('user not found');
        return this.repo.remove(user);
    }
}
