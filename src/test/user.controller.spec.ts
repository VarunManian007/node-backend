import { BadRequestException, Logger } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { UserController } from "../controller/user.controller";
import { UserService } from "../services/user.services";
import { MESSAGES } from "../constants/messages.constants";

describe('UserController', () => {
    let userController: UserController;
    let userService: UserService;
    let logger: Logger

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                {
                    provide: UserService,
                    useValue: {
                        registerUser: jest.fn().mockResolvedValue({ success: true }),
                        loginUser: jest.fn().mockResolvedValue({ token: 'test-token' }),
                        getAllUsers: jest.fn().mockResolvedValue([{ id: 1, email: 'user1@example.com' }, { id: 2, email: 'user2@example.com' }]),
                    },
                },
            ],
        }).compile();

        userController = module.get<UserController>(UserController);
        userService = module.get<UserService>(UserService);
        logger = new Logger();
    });

    it('should register a user successfully', async () => {
        const email = 'test@example.com';
        const password = 'Password@123';
        const userName = 'TestUser';

        const result = await userController.registerUser(email, password, userName);
        expect(result).toEqual({ success: true });
        expect(userService.registerUser).toHaveBeenCalledWith(email, password, userName, expect.any(String));
    });

    it('should throw BadRequestException for invalid email', async () => {
        const email = 'invalid-email';
        const password = 'Password@123';
        const userName = 'TestUser';

        await expect(userController.registerUser(email, password, userName)).rejects.toThrow(BadRequestException);
        await expect(userController.registerUser(email, password, userName)).rejects.toThrow(MESSAGES.ERROR_MESSAGES.INVALID_EMAIL_FORMAT);
    });

    it('should throw BadRequestException for short username', async () => {
        const email = 'test@example.com';
        const password = 'Password@123';
        const userName = 'Te';

        await expect(userController.registerUser(email, password, userName)).rejects.toThrow(BadRequestException);
        await expect(userController.registerUser(email, password, userName)).rejects.toThrow(MESSAGES.ERROR_MESSAGES.INVALID_USERNAME_FORMAT);
    });

    it('should throw BadRequestException for weak password', async () => {
        const email = 'test@example.com';
        const password = 'weak';
        const userName = 'TestUser';

        await expect(userController.registerUser(email, password, userName)).rejects.toThrow(BadRequestException);
        await expect(userController.registerUser(email, password, userName)).rejects.toThrow(MESSAGES.ERROR_MESSAGES.INVALID_PASSWORD_STANDARD);
    });

    it('should login a user successfully', async () => {
        const email = 'test@example.com';
        const password = 'Password@123';

        const result = await userController.loginUser(email, password);
        expect(result).toEqual({ token: 'test-token' });
        expect(userService.loginUser).toHaveBeenCalledWith(email, password, expect.any(String));
    });

    it('should throw BadRequestException for missing email or password', async () => {
        await expect(userController.loginUser('', 'Password@123')).rejects.toThrow(BadRequestException);
        await expect(userController.loginUser('', 'Password@123')).rejects.toThrow(MESSAGES.ERROR_MESSAGES.INVALID_REQUEST);

        await expect(userController.loginUser('test@example.com', '')).rejects.toThrow(BadRequestException);
        await expect(userController.loginUser('test@example.com', '')).rejects.toThrow(MESSAGES.ERROR_MESSAGES.INVALID_REQUEST);
    });

    it('should fetch all users successfully', async () => {
        const result = await userController.getUsers({});
        expect(result).toEqual([
            { id: 1, email: 'user1@example.com' },
            { id: 2, email: 'user2@example.com' }
        ]);
        expect(userService.getAllUsers).toHaveBeenCalledWith(expect.any(String));
    });
});