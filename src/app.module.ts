import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmOptionsService } from "./config/typeorm.options.service";
import { ConfigModule } from "./config/config.module";
import { UsersModule } from './users/users.module';
import { RecipesModule } from './recipes/recipes.module';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useClass: TypeOrmOptionsService
        }),
        ConfigModule,
        UsersModule,
        RecipesModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
