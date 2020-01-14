import { Request } from 'express';

import { Mapper } from '../mappers/Mapper';
import { PaginatedData } from './PaginatedData';

export interface ServiceInterface<Entity> {

    find(params: Mapper, req: Request): Promise<PaginatedData<Entity>>;

    findOne(id: string): Promise<Entity>;

    create(entity: Entity): Promise<Entity>;

    update(currentEntity: Entity, entity: Entity): Promise<Entity>;

    delete(id: string): Promise<void>;
}
