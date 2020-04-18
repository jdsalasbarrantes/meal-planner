import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
    getVariable(key: string): string {
        return process.env[key];
    }
}
