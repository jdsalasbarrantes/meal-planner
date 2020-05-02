import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from '../dtos/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { MealPlannerService } from "../../meal-planner/services/meal-planner.service";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
        private mealPlannerService: MealPlannerService,
    ) {}

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const user = await this.userRepository.singUp(authCredentialsDto);
        await this.mealPlannerService.createMealPlanner(user.id);
    }

    async signIn(
        authCredentialsDto: AuthCredentialsDto,
    ): Promise<{ accessToken: string }> {
        const user = await this.userRepository.validateUserPassword(
            authCredentialsDto,
        );
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const accessToken = await this.jwtService.sign(user);
        return { accessToken };
    }
}
