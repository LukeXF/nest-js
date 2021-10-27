import {AuthService} from "./auth.service";
import {Test} from "@nestjs/testing";
import {UserService} from "./user.service";
import {User} from "./entities/user.entity";

describe('AuthService', () => {
    let service: AuthService;
    let fakeUsersService: Partial<UserService>;
    const users: User[] = [];
    beforeEach(async () => {
        // create fake copy
        // partial only requires if something is present that it's correct
        fakeUsersService = {
            find: (email: string) => {
                const filteredUsers = users?.filter(user=> user.email === email)
                return Promise.resolve(filteredUsers);
            },
            create: ({email, password}) => {
                const user = {id: Math.floor(Math.random() * 9999), email, password} as User;
                users.push(user);
                return Promise.resolve(user);
            }
        };
        const module = await Test.createTestingModule({
            providers: [AuthService, {
                provide: UserService, // if anyone asks for this
                useValue: fakeUsersService // give them this
            }]
        }).compile();

        service = module.get(AuthService);
    })

    it('can create of instance of auth service', async () => {
        expect(service).toBeDefined();
    })

    it('creates a new users with salted and hashed password', async () => {
        const user = await service.signUp('me1@luke.sx', 'password')
        expect(user.password).not.toEqual('password');
        const [salt, hash] = user.password.split(".");
        expect(salt).toBeDefined()
        expect(hash).toBeDefined()
    })

    it('throws an error if user signs up with email that is in user', async () => {
        await service.signUp('me2@luke.sx', 'password')
        try {
            await service.signUp('me2@luke.sx', 'password')
        } catch (err) {
            expect(err.toString()).toMatch("BadRequestException: Email in use.");
        }
    })

    it('throws if sign-in is called with an unused email', async () => {
        try {
            await service.signIn('me3@luke.sx', 'password')
        } catch (err) {
            expect(err.toString()).toMatch("NotFoundException: user not found.");
        }
    })

    it('throws if invalid password is provided', async () => {
        await service.signUp('me4@luke.sx', 'password')
        try {
            await service.signIn('me4@luke.sx', 'mypassword2')
        } catch (err) {
            expect(err.toString()).toMatch("BadRequestException: bad password");
        }
    })

    it('returns a user if correct password is provided', async () => {
        await service.signUp('me5@luke.sx', 'mypassword')
        const user = await service.signIn('me5@luke.sx', 'mypassword')
        expect(user).toBeDefined()
    })
})
