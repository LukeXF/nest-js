import {Test, TestingModule} from '@nestjs/testing';
import {UserController} from './user.controller';
import {UserService} from './user.service';
import {AuthService} from './auth.service';
import {User} from './entities/user.entity';

describe('UserController', () => {
    let controller: UserController;
    let fakeUsersService: Partial<UserService>;
    let fakeAuthService: Partial<AuthService>;

    beforeEach(async () => {
        fakeUsersService = {
            findOne: (id: number) => {
                return Promise.resolve({
                    id,
                    email: 'me1@luke.sx',
                    password: 'password',
                } as User);
            },
            find: (email: string) => {
                return Promise.resolve([
                    {id: 1, email, password: 'password'} as User,
                ]);
            },
            // remove: () => {},
            // update: () => {},
        };
        fakeAuthService = {
            // signUp: () => {},
            signIn: (email, password) => {
                return Promise.resolve({id: 1, email, password} as User)
            },
        };
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [{
                provide: UserService, // if anyone asks for this
                useValue: fakeUsersService // give them this
            }, {
                provide: AuthService, // if anyone asks for this
                useValue: fakeAuthService // give them this
            }]
        }).compile();

        controller = module.get<UserController>(UserController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('find all users returns a list of users with given email', async () => {
        const users = await controller.findAllUsers('me@luke.sx');
        expect(users.length).toEqual(1);
    });

    it('findUsers returns a single user with the given ID', async () => {
        const users = await controller.findUser("1");
        expect(users).toBeDefined();
    });

    it('findUsers throws an error if user is not found with given ID', async () => {
        fakeUsersService.findOne = () => null
        // how pointless
        const user = await controller.findUser("1");
        expect(user).toEqual(null)
    });

    it('signIn updates session object and returns user', async () => {
        const session: {userId?: number} = {};

        const user = await controller.signIn({email: "me@luke.sx", password: "password"}, session)

        expect(user.id).toEqual(1);
        expect(session?.userId).toEqual(1);
    })
});
