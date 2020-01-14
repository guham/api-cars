import { ValidationError } from 'class-validator';
import { NextFunction, Request } from 'express';
import { isEmpty } from 'lodash/fp';
import { ExpressMiddlewareInterface, NotFoundError } from 'routing-controllers';
import { Validator } from 'routing-controllers/node_modules/class-validator';
import { Container } from 'typedi';

import { BadRequestError } from '../../errors';
import { ServiceInterface } from '../../interfaces';

interface IdToValidate {
    entity: string;
    value: string;
}

/**
 * The purpose of this middleware is to:
 * - validate (valid UUID) the ids present in the Query parameters to prevent errors when consulting the db
 * - validate that the entities exists and add them to the Request object
 */
export class ExistsMiddleware implements ExpressMiddlewareInterface {

    public async use(req: Request, res: Response, next: NextFunction): Promise<void> {

        const idsToValidate: IdToValidate[] = [];
        const pathWithoutSlashes: string[] = req.route.path.split('/');
        const validator = new Validator();

        const toEntity = (str: string): string => `${str[0].toUpperCase()}${str.slice(1, -1)}`;

        const validUuid = async (id: IdToValidate): Promise<void> => {
            if (!validator.isUUID(id.value, '4')) {
                const invalidUuidError: ValidationError[] = [{
                    property: 'id',
                    value: id.value,
                    constraints: { isUuid: `${id.value} must be a valid UUID` },
                    children: [],
                }];
                throw new BadRequestError(invalidUuidError);
            }
        };

        const entityExists = async (id: IdToValidate): Promise<void> => {
            const { entity: entityName } = id;
            const service = Container.get(entityName);

            const entity = await (service as ServiceInterface<any>).findOne(id.value);
            if (isEmpty(entity)) {
                throw new NotFoundError(`${entityName} not found.`);
            }

            req.entities = {
                ...req.entities,
                [entityName]: entity,
            };
        };

        pathWithoutSlashes.forEach((element: string, index: number) => {
            if (element.startsWith(':') && req.params[element.substring(1)]) {
                const value = req.params[element.substring(1)];
                const entity = toEntity(pathWithoutSlashes[index - 1]);
                idsToValidate.push({
                    entity,
                    value,
                });
            }
        });

        await Promise.all(idsToValidate.map(validUuid));
        await Promise.all(idsToValidate.map(entityExists));

        next();
    }
}
