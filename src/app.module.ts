import { Module } from '@nestjs/common';

import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmOptionsService } from "./config/typeorm.options.service";
import { ConfigModule } from "./config/config.module";
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useClass: TypeOrmOptionsService
        }),
        ConfigModule,
        AuthModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
