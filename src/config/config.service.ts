import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {

    getVariable(key: string) {
        return process.env[key];
    }

}
