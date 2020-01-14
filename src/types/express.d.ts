declare namespace Express {
    export interface Request {
        entities: {
            [entity: string]: object
        };
    }
}
