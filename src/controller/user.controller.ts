import { BadRequestException, Body, Controller, Get, Logger, Post, Req } from "@nestjs/common";
import { MESSAGES } from "../constants/messages.constants";
import { UserService } from "../services/user.services";
import * as validator from 'validator';

@Controller('user')
export class UserController {
    private readonly logger = new Logger(UserController.name);
    constructor(private userService: UserService) {}

    @Post('register')
    public async registerUser( @Body('email') email: string, @Body('password') password: string, 
        @Body('userName') userName: string) {
        const traceId = `trace-${Date.now()}`;
        this.logger.log(`${traceId} - ${MESSAGES.TRACING.CONTROLLER.REGISTER_USER}`);
        if (!email || !validator.isEmail(email)) {
            this.logger.log(MESSAGES.ERROR_MESSAGES.INVALID_EMAIL_FORMAT);
            throw new BadRequestException(MESSAGES.ERROR_MESSAGES.INVALID_EMAIL_FORMAT);
        }
        if (!userName || userName.length < 3) {
            this.logger.log(MESSAGES.ERROR_MESSAGES.INVALID_USERNAME_FORMAT);
            throw new BadRequestException(MESSAGES.ERROR_MESSAGES.INVALID_USERNAME_FORMAT);
        }
        if (!password || !MESSAGES.REGEX.PASSWORD_REGEX.test(password)) {
            this.logger.log(MESSAGES.ERROR_MESSAGES.INVALID_PASSWORD_STANDARD);
            throw new BadRequestException(MESSAGES.ERROR_MESSAGES.INVALID_PASSWORD_STANDARD);
        }
        this.logger.log(`${traceId} - ${MESSAGES.TRACING.CONTROLLER.REGISTER_USER_EXIT}`);
        return this.userService.registerUser(email, password, userName, traceId);
    }

    @Post('login')
    public async loginUser(@Body('email') email: string, @Body('password') password: string) {
        const traceId = `trace-${Date.now()}`;
        if (!email || !password) {
            this.logger.log(MESSAGES.ERROR_MESSAGES.INVALID_REQUEST);
            throw new BadRequestException(MESSAGES.ERROR_MESSAGES.INVALID_REQUEST);
        }
        this.logger.log(`${traceId} - ${MESSAGES.TRACING.CONTROLLER.LOGIN_USER}`);
        return this.userService.loginUser(email, password, traceId);
    }

    @Get('getAllUsers')
    public async getUsers(@Req() req) {
        const traceId = `trace-${Date.now()}`;
        this.logger.log(`${traceId} - ${MESSAGES.TRACING.CONTROLLER.GET_ALL_USERS}`);
        return this.userService.getAllUsers(traceId);
    }
}