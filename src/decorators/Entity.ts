import { Logger as WinstonLogger } from '../lib/logger';

export function Entity(model: any, scope: string): any {
    return <T extends new (...args: any[]) => {}>(constructor: T) => {
        return class extends constructor {
            public entity = model.name;
            public log = new WinstonLogger(scope);
        };
    };
}
