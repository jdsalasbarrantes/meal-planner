import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmOptionsService } from '../../../config/typeorm.options.service';
import { ConfigModule } from '../../../config/config.module';
import { UsersModule } from '../../../users/users.module';
import { RecipesModule } from '../../recipes.module';

export const createRecipesApp = async () => {
    const module = await Test.createTestingModule({
        imports: [
            TypeOrmModule.forRootAsync({
                useClass: TypeOrmOptionsService,
            }),
            ConfigModule,
            UsersModule,
            RecipesModule,
        ],
    }).compile();

    const app = module.createNestApplication();
    await app.init();

    return {
        app,
        module,
    };
};
