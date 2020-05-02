import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UserRepository } from './repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './config/jwt-strategy';
import { MealPlannerModule } from "../meal-planner/meal-planner.module";

@Module({
    imports: [
        PassportModule.register({
            defaultStrategy: 'jwt',
        }),
        JwtModule.register({
            secret: 'hr124jv98124hbuf9sa7yh18hnoaisdj9018',
            signOptions: {
                expiresIn: 3600,
            },
        }),
        TypeOrmModule.forFeature([UserRepository]),
        MealPlannerModule
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [JwtStrategy, PassportModule],
})
export class UsersModule {}
