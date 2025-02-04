import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Error, Model } from "mongoose";
import { User } from "../Schema/user.schema";
import * as bcrypt from 'bcrypt';
import { MESSAGES } from "../constants/messages.constants";
import { ApiResponse } from "../model/api-response.model";

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name);

    constructor(@InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService
    ) { }


    public async registerUser(email: string, password: string, userName: string, traceId: string) {
        this.logger.log(`${traceId} - ${MESSAGES.TRACING.SERVICE.REGISTER_USER}`);
        try {
            const existingUser = await this.userModel.findOne({ email });
            if (existingUser) {
                this.logger.error(`${traceId} - ${MESSAGES.ERROR_MESSAGES.EMAIL_ALREADY_EXIST}`);
                return new ApiResponse(false, MESSAGES.ERROR_MESSAGES.EMAIL_ALREADY_EXIST);
            }
            const user = new this.userModel({ email, password, userName });
            await user.save();
            this.logger.log(`${traceId} - ${MESSAGES.TRACING.SERVICE.REGISTER_USER_EXIT}`)
            return new ApiResponse(true, MESSAGES.SUCCESS_MESSAGES.REGISTER_USER, {});
        } catch(error) {
            this.logger.error(`${traceId} - ${MESSAGES.ERROR_MESSAGES.REGISTER_USER_ERROR}`);
            return new ApiResponse(false, MESSAGES.ERROR_MESSAGES.REGISTER_USER_ERROR);
        }
    }

    public async loginUser(email: string, password: string, traceId: string) {
        this.logger.log(`${traceId} - ${MESSAGES.TRACING.SERVICE.LOGIN_USER}`);
        try {
            const user = await this.userModel.findOne({ email });
            if (!user || !(await bcrypt.compare(password, user.password))) {
                console.log("here")
                throw new BadRequestException(MESSAGES.ERROR_MESSAGES.INVALID_LOGIN_CREDENTIALS);
            }
            const token = this.jwtService.sign({ id: user.id, email: user.email, username: user.userName, isAdmin: user.isAdmin ? user.isAdmin : false }, { secret: process.env.TOKEN_SECRET });
            this.logger.log(`${traceId} - ${MESSAGES.TRACING.SERVICE.LOGIN_USER_EXIT}`);
            return new ApiResponse(true, MESSAGES.SUCCESS_MESSAGES.LOGIN_USER, {access_token: token});
        } catch(error) {
            this.logger.error(`${traceId} - ${MESSAGES.ERROR_MESSAGES.LOGIN_USER_ERROR}`);
            return new ApiResponse(false, MESSAGES.ERROR_MESSAGES.LOGIN_USER_ERROR);
        }
    }

    async getAllUsers(traceId: string) {
        this.logger.log(`${traceId} - ${MESSAGES.TRACING.SERVICE.GET_ALL_USERS}`);
        try {
            const users = await this.userModel.find().select('-password');
            this.logger.log(`[${traceId}]  - ${MESSAGES.TRACING.SERVICE.GET_ALL_USERS_EXIT}`);
            return new ApiResponse(true, MESSAGES.SUCCESS_MESSAGES.GET_ALL_USERS, users); 
        } catch(error) {
            this.logger.error(`${traceId} - ${MESSAGES.ERROR_MESSAGES.FETCH_USER_ERROR}`);
            return new ApiResponse(false, MESSAGES.ERROR_MESSAGES.FETCH_USER_ERROR);;
        }
        
    }
}