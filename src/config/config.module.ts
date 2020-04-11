import { Global, Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { TypeOrmOptionsService } from './typeorm.options.service';

@Global()
@Module({
    providers: [ConfigService, TypeOrmOptionsService],
    exports: [ConfigService],
})
export class ConfigModule {}
