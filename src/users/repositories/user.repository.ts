import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { AuthCredentialsDto } from '../dtos/auth-credentials.dto';
import {
    ConflictException,
    InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async singUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto;
        const user = new User();
        user.username = username;
        user.salt = await this.generateSalt();
        user.password = await this.hashPassword(password, user.salt);
        try {
            await user.save();
        } catch (err) {
            if (err.code === '23505') {
                throw new ConflictException('Username already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async validateUserPassword(
        authCredentialsDto: AuthCredentialsDto,
    ): Promise<string> {
        const { username, password } = authCredentialsDto;
        const user = await this.findOne({ username });
        if (user && user.validatePassword(password)) {
            return user.username;
        } else {
            return null;
        }
    }

    private async hashPassword(
        password: string,
        salt: string,
    ): Promise<string> {
        return bcrypt.hash(password, salt);
    }

    private async generateSalt(): Promise<string> {
        return bcrypt.genSalt();
    }
}
