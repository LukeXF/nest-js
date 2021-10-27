import {AuthService} from "./auth.service";
import {Test} from "@nestjs/testing";
import {UserService} from "./user.service";

it('can create of instance of auth service', async () => {
    // create fake copy
    const fakeUsersService = {
        find: () => Promise.resolve([]),
        create: (email: string, password: string) =>
            Promise.resolve({id: 1, email, password})
    };
    const module = await Test.createTestingModule({
        providers: [AuthService, {
            provide: UserService,
            useValue: fakeUsersService
        }]
    }).compile();

    const service = module.get(AuthService);

    expect(service).toBeDefined();
})
