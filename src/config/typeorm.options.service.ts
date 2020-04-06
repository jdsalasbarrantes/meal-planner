import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from './config.service';

@Injectable()
export class TypeOrmOptionsService implements TypeOrmOptionsFactory {
    constructor(private configService: ConfigService) {}

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: this.configService.getVariable('POSTGRES_HOST'),
            username: this.configService.getVariable('POSTGRES_USER'),
            password: this.configService.getVariable('POSTGRES_PASSWORD'),
            database: this.configService.getVariable('POSTGRES_DB'),
            port: 5432,
            entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
            synchronize: true,
        };
    }
}
