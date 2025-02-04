import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { UserController } from "src/controller/user.controller";
import { User, UserSchema } from "src/Schema/user.schema";
import { UserService } from "src/services/user.services";

@Module({
    imports: [
      MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      JwtModule.register({ secret: process.env.TOKEN_SECRET ?? '', signOptions: { expiresIn: '1h' } }),
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})


export class UserModule {}